import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@/components/ui/buttons/Button.jsx";
import Question from "@/components/survey/Question.jsx";
import Result from "@/components/survey/Result.jsx";

import { addResult } from "@/temp/redux/slices/testResultsSlice.js";
import { BUTTONS_TEXT } from "@/constants/buttons.js";

const QuestionsListContainer = ({ questions, results, answers }) => {
  const [questionResponses, setQuestionResponses] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered =
    questionResponses[currentQuestion.id] !== undefined;

  const dispatch = useDispatch();

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
    console.log("useEffect triggered:", { showResult, matchedResult });

    if (showResult && matchedResult) {
      const testResult = {
        testName: "PHQ9",
        result: matchedResult.result,
        date: new Date().toLocaleDateString("uk-UA"),
      };
      dispatch(addResult(testResult));
      console.log(testResult);
    }
  }, [dispatch, matchedResult, showResult]);

  return (
    <div className="user-survey-form mt-10 card">
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
  );
};
export default QuestionsListContainer;
