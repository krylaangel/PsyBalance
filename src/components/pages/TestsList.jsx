import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import QuestionsListContainer from "@/components/containers/QuestionsListContainer.jsx";
import { QuestionsPHQ9 } from "@/constants/questionsPHQ9.js";
import { AnswersPHQ9 } from "@/constants/answersPHQ9.js";
import { ResultsPHQ9 } from "@/constants/resultsPHQ9.js";
import { useState } from "react";

const TestsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="max-w-xl mx-auto p-6 card">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Список тестів</h1>
      <div className="card p-10 page">
        <h2 className="page__title">Тест на депресію</h2>
        <p className="page__description">
          PHQ-9 – це не діагностичний тест, а скринінговий інструмент. Його
          результати можуть вказувати на можливі ознаки депресії, але лише
          фахівець може провести точну діагностику.
        </p>
        <QuestionsListContainer
          onClick={() => setIsModalOpen(true)}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={QuestionsPHQ9}
          results={ResultsPHQ9}
          answers={AnswersPHQ9}
        />
        <Button
          className="w-full"
          onClick={() => setIsModalOpen(true)}
          text={BUTTONS_TEXT.Test}
        ></Button>
      </div>
    </div>
  );
};
export default TestsList;
