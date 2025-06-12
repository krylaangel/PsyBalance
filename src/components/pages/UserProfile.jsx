import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { removeResult } from "@/temp/redux/slices/testResultsSlice.js";
import { useEffect } from "react";
import { thunkResults } from "@/temp/redux/thunks/thunkResults.js";
import PostSkeletonForList from "@/components/ui/skeletons/PostSkeletonForList.jsx";
import { ERRORS_STYLES } from "@/constants/errorStyle.js";

const UserProfile = () => {
  const navigate = useNavigate();

  const { results, loading, error } = useSelector((state) => state.testResults);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(removeResult(index));
  };

  useEffect(() => {
    dispatch(thunkResults());
  }, [dispatch]);

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
                  text={BUTTONS_TEXT.Delete}
                  onClick={() => handleDelete(index)}
                ></Button>
                <Button
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
