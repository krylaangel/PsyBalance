import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { removeResult } from "@/temp/redux/slices/testResultsSlice.js";
import { useEffect } from "react";
import { thunkResults } from "@/temp/redux/thunks/thunkResults.js";

const UserProfile = () => {
  const navigate = useNavigate();

  const testResults = useSelector((state) => state.testResults.results);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(removeResult(index));
  };

  useEffect(() => {
    dispatch(thunkResults());
  }, [dispatch]);

  return (
    <div className="clamp">
      <div className="card p-10">
        <h1 className="page__title uppercase mb-6">Результати тестів</h1>
        {testResults.map((result, index) => (
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
        ))}
      </div>
    </div>
  );
};
export default UserProfile;
