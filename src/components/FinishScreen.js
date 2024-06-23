function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = points / maxPossiblePoints * 100

  return (
    <>
      <p className="result">
        You scored <strong>{points} </strong>
        out of {maxPossiblePoints} points ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">
        (Highscore: {highscore} points)
      </p>
      <button
        className="btn btn-ui"
        type="button"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  )
}

export default FinishScreen
