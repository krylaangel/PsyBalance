import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Sections from "@/components/pages/HomePage.jsx";
import Header from "@/components/layout/Header.jsx";
import ControlledFormAuth from "@/components/forms/ControlledFormAuth.jsx";
import ControlledFormReg from "@/components/forms/ControlledFormReg.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Test from "@/components/pages/Test.jsx";
import UncontrolledFormFeedback from "@/components/forms/UncontrolledFormFeedback.jsx";
import PostPageContainer from "@/components/Sections/containers/PostPageContainer.jsx";

import { TotalProvider } from "@/context/TotalContext.jsx";

function App() {
  return (
    <div className="app">
      <TotalProvider>
        <BrowserRouter>
          <Header />
          <main className="flex-grow clamp">
            <Routes>
              <Route path="/" element={<Sections />} />
              <Route
                path="/ControlledFormAuth"
                element={<ControlledFormAuth />}
              />
              <Route
                path="/ControlledFormReg"
                element={<ControlledFormReg />}
              />
              <Route
                path="/UncontrolledFormFeedback"
                element={<UncontrolledFormFeedback />}
              />
              <Route path="/Test" element={<Test />} />
              <Route path="/post/:id" element={<PostPageContainer />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </TotalProvider>
    </div>
  );
}

export default App;
