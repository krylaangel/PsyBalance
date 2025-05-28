import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useRef } from "react";
import InputField from "@/components/ui/inputFields/InputField.jsx";
import Button from "@/components/ui/buttons/Button.jsx";

const UncontrolledFormFeedback = () => {
  const feedbackRef = useRef(null);
  const mailRef = useRef(null);
  const handleSubmit = (e) => {
    const feedback = feedbackRef.current.value;
    const email = mailRef.current.value;
    alert(`Ваш відгук: ${feedback}\nВаша пошта: ${email}`);
    e.preventDefault();
    feedbackRef.current.value = "";
    mailRef.current.value = "";
  };

  return (
    <div className="user-survey-form">
      <form className="flex flex-col gap-y-4 my-10 p-6 rounded-xl shadow-md">
        <InputField
          label="Ваш відгук:"
          type="text"
          id="feedback"
          ref={feedbackRef}
          placeholder="Ваш відгук:"
          className="w-full h-40"
        />
        <InputField
          label="Ваша пошта:"
          type="email"
          id="email"
          ref={mailRef}
          placeholder="Ваша пошта:"
        />
        <Button onClick={handleSubmit} text={BUTTONS_TEXT.Submit}></Button>
      </form>
    </div>
  );
};
export default UncontrolledFormFeedback;
