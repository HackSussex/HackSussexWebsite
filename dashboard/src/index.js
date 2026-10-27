import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

async function prepare() {
  if (process.env.REACT_APP_DEV_MODE === "true") {
    const { worker } = require("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "warn",
    });
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

prepare();
