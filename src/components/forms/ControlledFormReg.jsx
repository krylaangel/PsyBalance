import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateForm } from "@/utils/validateForm.js";
import Button from "@/components/ui/Button.jsx";
import InputField from "@/components/ui/InputField.jsx";

const ControlledFormReg = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitForm, setSubmitForm] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitForm({ firstName, lastName, year, email, password });
    setFirstName("");
    setLastName("");
    setYear("");
    setEmail("");
    setPassword("");
  };
  const toggleAuth = () => {
    navigate("/ControlledFormAuth");
  };
  useEffect(() => {
    setErrorMessage(validateForm({ firstName, lastName, email, password }));
  }, [firstName, lastName, email, password]);

  return (
    <div className="user-survey-form mb-5">
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
          id="emyearail"
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
