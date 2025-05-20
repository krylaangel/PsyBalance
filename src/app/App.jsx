import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Sections from "../components/Sections/HomePage.jsx";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Test from "../components/Sections/Test.jsx";
import ControlledFormAuth from "../components/forms/ControlledFormAuth.jsx";
import ControlledFormReg from "../components/forms/ControlledFormReg.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="flex-grow clamp">
          <Routes>
            <Route path="/" element={<Sections />} />
            <Route
              path="/ControlledFormAuth"
              element={<ControlledFormAuth />}
            />
            <Route path="/ControlledFormReg" element={<ControlledFormReg />} />
            <Route path="/Test" element={<Test />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
