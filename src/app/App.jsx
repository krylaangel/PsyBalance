import "./App.css";
import { BrowserRouter } from "react-router";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import RoutesApp from "@/app/RoutesApp.jsx";
import { AuthProvider } from "@/temp/context/AuthContext.jsx";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main className="flex-grow">
            <RoutesApp />
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
