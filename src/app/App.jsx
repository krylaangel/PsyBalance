import "./App.css";
import { BrowserRouter } from "react-router";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";

import { TotalProvider } from "@/context/TotalContext.jsx";

import RoutesApp from "@/app/RoutesApp.jsx";

function App() {
  return (
    <div className="app">
      <TotalProvider>
        <BrowserRouter>
          <Header />
          <main className="flex-grow clamp">
            <RoutesApp />
          </main>
          <Footer />
        </BrowserRouter>
      </TotalProvider>
    </div>
  );
}

export default App;
