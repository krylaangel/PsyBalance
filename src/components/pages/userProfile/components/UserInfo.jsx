import InputField from "@/components/ui/inputFields/InputField.jsx";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { validateForm } from "@/utils/validateForm.js";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore.js";

const UserInfo = () => {
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const user = useAuthStore((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validateForm({ firstName, lastName });
      setErrorMessage(errors);

      await updateProfile({
        name: firstName,
        surname: lastName,
        birthYear: Number(year),
      });
      alert("Профіль оновлено успішно");
    } catch (err) {
      console.error(err);
      alert("Помилка оновлення профілю");
    }
  };
  useEffect(() => {
    if (user) {
      setFirstName(user.name || "");
      setLastName(user.surname || "");
      setYear(user.birthYear || "");
    }
  }, [user]);
  return (
    <div className="card p-10">
      <h1 className="page__title uppercase mb-6">
        Вітаємо, шановний(а) {user.surname}
      </h1>
      <form className="user-survey-form card" onSubmit={handleSubmit}>
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

        <Button
          className="w-full mt-10"
          type="submit"
          text={BUTTONS_TEXT.Change}
        ></Button>
      </form>
    </div>
  );
};
export default UserInfo;
