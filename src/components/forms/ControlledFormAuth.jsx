import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button from "@/components/ui/buttons/Button.jsx";
import InputField from "@/components/ui/inputFields/InputField.jsx";

import { validateForm } from "@/utils/validateForm.js";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useAuthStore } from "@/store/useAuthStore.js";

const ControlledFormAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitForm, setSubmitForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setSubmitForm(null);
    const errors = validateForm({ email, password });
    console.log("validateForm errors:", errors);

    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await login({ email, password });
        setSubmitForm({ email, password });
        alert("Успішний вхід!");
        navigate("/");
      } catch (error) {
        setErrorMessage({ global: error.message });
      }
    }
  };

  useEffect(() => {
    setErrorMessage(validateForm({ email, password }));
  }, [email, password]);

  const toggleReg = () => {
    navigate("/ControlledFormReg");
  };

  return (
    <div className="user-survey-form card">
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full"
          type="submit"
          text={BUTTONS_TEXT.Auth}
        ></Button>
        <Button
          className="w-full ml-auto text-[var(--clr-secondary)] hover:text-[var(--clr-layout)] hover:border-b-2 cursor-pointer"
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
