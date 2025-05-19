import React from "react";

const Question = ({
  currentQuestion,
  questionResponses,
  handleChange,
  answers,
}) => {
  return (
    <>
      <p className="question">{currentQuestion.questionValue}</p>
      <div className="answer">
        {answers.map((answer) => (
          <label
            key={answer.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              className="input-style"
              checked={
                questionResponses[currentQuestion.id] === answer.answersPoints
              }
              type="radio"
              name={`question${currentQuestion.id}`}
              value={answer.answersPoints}
              onChange={() =>
                handleChange(currentQuestion.id, answer.answersPoints)
              }
            ></input>
            {answer.answersValue}
          </label>
        ))}
      </div>
    </>
  );
};
export default Question;
