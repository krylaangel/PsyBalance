import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import RoutesApp from "@/app/RoutesApp.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <RoutesApp />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
