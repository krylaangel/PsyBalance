import Button from "./ui/Button.jsx";
import { BUTTONS_TEXT } from "../../constants/buttons.js";

const UserSurveyForm = () => {
  return (
    <div className="user-survey-form">
      <form className="flex flex-col gap-y-4">
        <label className="user-survey-form__label">
          Ім'я
          <input
            className="user-survey-form__input"
            type="text"
            name="name"
            id="name"
            placeholder="Ім'я"
          />
        </label>
        <label className="user-survey-form__label">
          Прізвище
          <input
            className="user-survey-form__input"
            type="text"
            name="name"
            id="name"
            placeholder="Прізвище"
          />
        </label>
        <label className="w-full">
          Рік народження
          <input
            className="user-survey-form__input w-full"
            type="number"
            name="year"
            id="year"
            min="1900"
            max="2025"
            placeholder="Рік народження"
          ></input>
        </label>
        <Button text={BUTTONS_TEXT.Save}></Button>
      </form>
    </div>
  );
};
export default UserSurveyForm;
