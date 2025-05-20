import Button from "../ui/Button.jsx";
import { BUTTONS_TEXT } from "../../constants/buttons.js";
import { useRef } from "react";
import InputField from "../ui/InputField.jsx";

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
    <form className="flex flex-col gap-y-4 my-10 p-6 rounded-xl shadow-md">
      <InputField
        label="Ваш відгук:"
        type="text"
        id="feedback"
        ref={feedbackRef}
        placeholder="Ваш відгук:"
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
  );
};
export default UncontrolledFormFeedback;
