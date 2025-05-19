import React, { useState } from "react";
import Button from "../ui/Button.jsx";
import Result from "../ui/Result.jsx";
import { BUTTONS_TEXT } from "../../../constants/buttons.js";
import Question from "../ui/Question.jsx";

const QuestionsListContainer = ({ questions, results, answers }) => {
  const [questionResponses, setQuestionResponses] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered =
    questionResponses[currentQuestion.id] !== undefined;
  const handleChange = (questionId, value) => {
    setQuestionResponses({ ...questionResponses, [questionId]: value });
  };
  const calculateAnswers = Object.values(questionResponses).reduce(
    (accum, answer) => {
      return accum + answer;
    },
    0,
  );
  const matchedResult = results.find((item) => {
    const [min, max] = item.range;
    return calculateAnswers >= min && calculateAnswers <= max;
  });
  const handleButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="">
      <Question
        currentQuestion={currentQuestion}
        questionResponses={questionResponses}
        handleChange={handleChange}
        answers={answers}
      />
      <Button
        disabled={!isCurrentQuestionAnswered}
        text={
          currentQuestionIndex < questions.length - 1
            ? BUTTONS_TEXT.Next
            : BUTTONS_TEXT.ClickUp
        }
        onClick={handleButtonClick}
      />
      {showResult && matchedResult && (
        <Result matchedResult={matchedResult.result} />
      )}
    </div>
  );
};
export default QuestionsListContainer;
