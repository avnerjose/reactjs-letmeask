import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./services/firebase";
import { GlobalStyle } from "./styles/global";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
