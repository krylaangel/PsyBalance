import { useNavigate } from "react-router";

import Button from "@/components/ui/buttons/Button.jsx";
import PostSkeletonForList from "@/components/ui/skeletons/PostSkeletonForList.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useTestResultsStore } from "@/store/useTestResultsStore.js";
import { ERRORS_STYLES } from "@/constants/errorStyle.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import InputField from "@/components/ui/inputFields/InputField.jsx";
import { useEffect, useState } from "react";
import { validateForm } from "@/utils/validateForm.js";

const UserProfile = () => {
  const navigate = useNavigate();
  const results = useTestResultsStore((state) => state.results);
  const loading = useTestResultsStore((state) => state.loading);
  const error = useTestResultsStore((state) => state.error);
  const removeResult = useTestResultsStore((state) => state.removeResult);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const user = useAuthStore((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    if (user) {
      setFirstName(user.name || "");
      setLastName(user.surname || "");
      setYear(user.birthYear || "");
    }
  }, [user]);
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
  const handleDelete = (index) => {
    removeResult(index);
  };

  if (loading) {
    return <PostSkeletonForList />;
  }

  if (error) {
    return (
      <p className={ERRORS_STYLES.warningClasses}>
        Помилка завантаження результатів: {error}
      </p>
    );
  }

  return (
    <div className="clamp">
      <div className="card p-10">
        <h1 className="page__title uppercase mb-6">
          Вітаємо, шановний(а) {user.surname}
        </h1>
        <form className="user-survey-form" onSubmit={handleSubmit}>
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
      <div className="card p-10">
        <h1 className="page__title uppercase mb-6">Результати тестів</h1>
        {!results || results.length === 0 ? (
          <p className="bg-[var(--clr-focus) result-container page__titletext-lg font-semibold text-gray-400">
            Схоже, ви ще не пройшли жодного тестування.
          </p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="card p-6">
              <h2 className="text-lg font-semibold uppercase">
                {result.testName}
              </h2>
              <p className="text-[var(--clr-text)]">{result.result}</p>
              <p className="text-[var(--clr-text)]">{result.date}</p>
              <div className="flex gap-x-4 mt-6">
                <Button
                  className="w-full"
                  text={BUTTONS_TEXT.Delete}
                  onClick={() => handleDelete(index)}
                ></Button>
                <Button
                  className="w-full"
                  text={BUTTONS_TEXT.Refresh}
                  onClick={() => navigate("/TestPage")}
                ></Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default UserProfile;
