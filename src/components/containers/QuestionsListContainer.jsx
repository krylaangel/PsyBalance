import React, { useState } from "react";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import Button from "@/components/ui/buttons/Button.jsx";
import Question from "@/components/survey/Question.jsx";
import Result from "@/components/survey/Result.jsx";

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
    <div className="user-survey-form mt-10">
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
            ? BUTTONS_TEXT.NextQuestion
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
