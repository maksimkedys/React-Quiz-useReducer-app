import { createContext, useContext, useReducer, useEffect } from "react";
import data from "../data/questions.json"

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // "loading", "error", "ready" "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)
  const isLast = index + 1 === numQuestions;
  const question = questions[index];

  useEffect(function () {
    const questions = data.questions;

    questions ?
      dispatch({ type: "dataReceived", payload: questions }) :
      dispatch({ type: "dataFailed" });
  }, [])

  return <QuizContext.Provider
    value={{
      questions,
      question,
      numQuestions,
      maxPossiblePoints,
      isLast,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      dispatch
    }}>
    {children}
  </QuizContext.Provider>
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { QuizProvider, useQuiz }