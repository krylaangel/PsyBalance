import React from "react";

import QuestionsListContainer from "@/components/containers/QuestionsListContainer.jsx";

import { QuestionsPHQ9 } from "@/constants/questionsPHQ9.js";
import { ResultsPHQ9 } from "@/constants/resultsPHQ9.js";
import { AnswersPHQ9 } from "@/constants/answersPHQ9.js";

const TestPage = () => {
  return (
    <div className="flex flex-col items-start">
      <QuestionsListContainer
        questions={QuestionsPHQ9}
        results={ResultsPHQ9}
        answers={AnswersPHQ9}
      />
    </div>
  );
};
export default TestPage;
