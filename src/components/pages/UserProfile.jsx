import { useNavigate } from "react-router";

import Button from "@/components/ui/buttons/Button.jsx";
import PostSkeletonForList from "@/components/ui/skeletons/PostSkeletonForList.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useTestResultsStore } from "@/store/useTestResultsStore.js";
import { ERRORS_STYLES } from "@/constants/errorStyle.js";

const UserProfile = () => {
  const navigate = useNavigate();
  const results = useTestResultsStore((state) => state.results);
  const loading = useTestResultsStore((state) => state.loading);
  const error = useTestResultsStore((state) => state.error);
  const removeResult = useTestResultsStore((state) => state.removeResult);

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
