import React from "react";
import QuestionsListContainer from "./containers/QuestionsListContainer.jsx";
import { QuestionsPHQ9 } from "../../constants/questionsPHQ9.js";
import { ResultsPHQ9 } from "../../constants/resultsPHQ9.js";
import { AnswersPHQ9 } from "../../constants/answersPHQ9.js";
import UserSurveyForm from "./UserSurveyForm.jsx";
const Test = () => {
  return (
    <div>
      <UserSurveyForm />
      <QuestionsListContainer
        questions={QuestionsPHQ9}
        results={ResultsPHQ9}
        answers={AnswersPHQ9}
      />
    </div>
  );
};
export default Test;
