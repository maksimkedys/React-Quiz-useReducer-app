function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {

  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question
        <strong> {index + 1}/{numQuestions}</strong>
      </p>
      <p><strong>{points}/{maxPossiblePoints}</strong></p>
    </div>
  )
}

export default Progress
