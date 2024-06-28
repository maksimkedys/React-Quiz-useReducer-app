import { useQuiz } from "../contexts/QuizContext"
import Options from "./Options"

function Question() {
  const { question } = useQuiz();
  return (
    <>
      <h4>{question.question}</h4>
      <Options />
    </>
  )
}

export default Question
