function NextButton({ dispatch, answer, isLast }) {

  if (answer === null) return null;

  if (isLast) return (
    <button
      className="btn btn-ui"
      type="button"
      onClick={() => dispatch({ type: "finished" })}
    >
      Finish
    </button>
  );

  return (
    <button
      className="btn btn-ui"
      type="button"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton
