import UserInfo from "@/components/pages/userProfile/components/UserInfo.jsx";
import ResultsTests from "@/components/pages/userProfile/components/ResultsTests.jsx";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useState } from "react";
import { animated } from "react-spring";
import { useFadeSpring } from "@/animations/useFadeSpring.js";

const UserProfile = () => {
  const [info, setInfo] = useState(true);
  const [result, setResult] = useState(false);

  return (
    <div className="clamp grid md:grid-cols-[1fr_2fr]">
      <div className="flex flex-col py-10 pr-3 gap-5">
        <Button
          className="h-15"
          text={BUTTONS_TEXT.UsersInfo}
          onClick={() => {
            setInfo(true);
            setResult(false);
          }}
        ></Button>
        <Button
          className="h-15"
          text={BUTTONS_TEXT.ResultsTests}
          onClick={() => {
            setResult(true);
            setInfo(false);
          }}
        ></Button>
      </div>
      <div className="relative overflow-hidden overflow-y-none">
        <animated.div
          style={useFadeSpring(info, "soft")}
          className={`${info ? "flex" : "hidden"}`}
        >
          <UserInfo />
        </animated.div>
        <animated.div
          style={useFadeSpring(result, "soft")}
          className={`${result ? "flex" : "hidden"}`}
        >
          <ResultsTests />
        </animated.div>
      </div>
    </div>
  );
};
export default UserProfile;
