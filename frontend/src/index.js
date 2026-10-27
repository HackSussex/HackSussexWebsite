import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SiteDataProvider } from "./contexts/siteContext";
import { ThemeProvider } from "./contexts/themeContext";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteDataProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SiteDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
