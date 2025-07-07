import React, { useEffect, useState } from "react";

import Button from "@/components/ui/buttons/Button.jsx";
import Question from "@/components/survey/Question.jsx";
import Result from "@/components/survey/Result.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useTestResultsStore } from "@/store/useTestResultsStore.js";

const QuestionsListContainer = ({
  questions,
  results,
  answers,
  isOpen,
  onClose,
}) => {
  const [questionResponses, setQuestionResponses] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const addResult = useTestResultsStore((state) => state.addResult);

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered =
    questionResponses[currentQuestion.id] !== undefined;

  const handleChange = (questionId, value) => {
    setQuestionResponses({ ...questionResponses, [questionId]: Number(value) });
  };
  const handleButtonClick = () => {
    if (showResult) {
      setQuestionResponses({});
      setCurrentQuestionIndex(0);
      setShowResult(false);
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
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

  useEffect(() => {
    if (showResult && matchedResult) {
      const testResult = {
        testName: "PHQ9",
        result: matchedResult.result,
        date: new Date().toLocaleDateString("uk-UA"),
      };
      addResult(testResult);
    }
  }, [addResult, matchedResult, showResult]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-10">
      <div className="user-survey-form mt-10 card">
        <div className="flex justify-end mb-3">
          <Button
            className="w-1/3"
            text={BUTTONS_TEXT.Exit}
            onClick={onClose}
          ></Button>
        </div>
        {!showResult && (
          <>
            <p className="question-number">
              Питання {currentQuestionIndex + 1} з {questions.length}
            </p>

            <Question
              currentQuestion={currentQuestion}
              questionResponses={questionResponses}
              handleChange={handleChange}
              answers={answers}
            />

            <Button
              className="w-full"
              disabled={!isCurrentQuestionAnswered}
              text={
                currentQuestionIndex < questions.length - 1
                  ? BUTTONS_TEXT.NextQuestion
                  : BUTTONS_TEXT.Result
              }
              onClick={handleButtonClick}
            />
          </>
        )}

        {showResult && matchedResult && (
          <Result matchedResult={matchedResult.result} />
        )}
      </div>
    </div>
  );
};
export default QuestionsListContainer;
