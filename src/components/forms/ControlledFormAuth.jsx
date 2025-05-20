import InputField from "../ui/InputField.jsx";
import { useEffect, useState } from "react";
import { validateForm } from "../../utils/validateForm.js";
import Button from "../ui/Button.jsx";
import { BUTTONS_TEXT } from "../../constants/buttons.js";
import { useNavigate } from "react-router";

const ControlledFormAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitForm, setSubmitForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitForm({ email, password });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setErrorMessage(validateForm({ email, password }));
  }, [email, password]);

  const toggleReg = () => {
    navigate("/ControlledFormReg");
  };
  return (
    <div className="user-survey-form">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          errorMessage={errorMessage.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Пароль"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Пароль"
          errorMessage={errorMessage.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" text={BUTTONS_TEXT.Submit}></Button>
        <Button
          type="button"
          onClick={toggleReg}
          text={BUTTONS_TEXT.Reg}
        ></Button>
      </form>
      {submitForm && (
        <div className="mt-3">
          <p>{submitForm.email}</p>
          <p>{submitForm.password}</p>
        </div>
      )}
    </div>
  );
};
export default ControlledFormAuth;
