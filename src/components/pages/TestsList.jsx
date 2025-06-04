import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useNavigate } from "react-router";

const TestsList = () => {
  const navigate = useNavigate();
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
        <Button
          onClick={() => navigate("/TestPage")}
          text={BUTTONS_TEXT.Test}
        ></Button>
      </div>
    </div>
  );
};
export default TestsList;
