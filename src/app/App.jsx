import "./App.css";
import { BrowserRouter } from "react-router";
import Sections from "../components/Sections/HomePage.jsx";
import Header from "../components/Sections/ui/Header.jsx";
import Footer from "../components/Sections/ui/Footer.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Sections />;
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
