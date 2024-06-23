function Options({ question, dispatch, answer }) {
  const isAnswered = answer !== null;

  return (
    <ul className="options">
      {question.options.map((option, index) =>
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} 
            ${isAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''}`}
          type="button"
          key={option}
          disabled={isAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>)
      }
    </ul>
  )
}

export default Options;