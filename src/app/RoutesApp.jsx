import { useRoutes } from "react-router";
import HomePage from "@/components/pages/HomePage.jsx";
import ControlledFormAuth from "@/components/forms/ControlledFormAuth.jsx";
import UncontrolledFormFeedback from "@/components/forms/UncontrolledFormFeedback.jsx";
import ControlledFormReg from "@/components/forms/ControlledFormReg.jsx";
import PostsList from "@/components/pages/PostsList.jsx";
import PostPageContainer from "@/components/containers/PostPageContainer.jsx";
import UserProfile from "@/components/pages/UserProfile.jsx";
import TestsList from "@/components/pages/TestsList.jsx";

const RoutesApp = () => {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    { path: "/ControlledFormAuth", element: <ControlledFormAuth /> },
    { path: "/ControlledFormReg", element: <ControlledFormReg /> },
    {
      path: "/UncontrolledFormFeedback",
      element: <UncontrolledFormFeedback />,
    },
    { path: "/profile", element: <UserProfile /> },

    { path: "/post/:id", element: <PostPageContainer /> },
    { path: "/posts", element: <PostsList /> },
    { path: "/tests", element: <TestsList /> },
  ]);
};
export default RoutesApp;
