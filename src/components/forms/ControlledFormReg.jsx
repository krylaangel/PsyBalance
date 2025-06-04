import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateForm } from "@/utils/validateForm.js";
import Button from "@/components/ui/buttons/Button.jsx";
import InputField from "@/components/ui/inputFields/InputField.jsx";
import { useAuthStore } from "@/store/useAuthStore.js";

const ControlledFormReg = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitForm, setSubmitForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitForm(null);
    const errors = validateForm({ firstName, lastName, email, password });
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      try {
        register({ firstName, lastName, email, year, password });
        alert("Реєстрація успішна!");
        setSubmitForm({ firstName, lastName, year, email, password });
        navigate("/");
        setFirstName("");
        setLastName("");
        setYear("");
        setEmail("");
        setPassword("");
      } catch (error) {
        setErrorMessage({ global: error.message });
      }
    }
  };

  const toggleAuth = () => {
    navigate("/ControlledFormAuth");
  };

  useEffect(() => {
    setErrorMessage(validateForm({ firstName, lastName, email, password }));
  }, [firstName, lastName, email, password]);

  return (
    <div className="user-survey-form mb-5 card">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Ім'я"
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          placeholder="Ім'я"
          errorMessage={errorMessage.firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          label="Прізвище"
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          placeholder="Прізвище"
          errorMessage={errorMessage.lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          label="Рік народження"
          type="number"
          name="year"
          id="year"
          value={year}
          min="1900"
          max="2025"
          placeholder="Рік народження"
          errorMessage={errorMessage.year}
          onChange={(e) => setYear(e.target.value)}
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
        <Button type="submit" text={BUTTONS_TEXT.Save}></Button>
        <Button
          type="button"
          onClick={toggleAuth}
          text={BUTTONS_TEXT.Auth}
        ></Button>
      </form>
      {errorMessage.global && (
        <p className="text-red-500 font-medium">{errorMessage.global}</p>
      )}
      {submitForm && (
        <div className="mt-3">
          <p>{submitForm.firstName}</p>
          <p>{submitForm.lastName}</p>
          <p>{submitForm.year}</p>
          <p>{submitForm.email}</p>
          <p>{submitForm.password}</p>
        </div>
      )}
    </div>
  );
};
export default ControlledFormReg;
