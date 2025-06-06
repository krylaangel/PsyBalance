import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App.jsx";
import { Provider } from "react-redux";
import store from "@/temp/redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
