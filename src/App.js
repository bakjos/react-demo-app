import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import ToastProvider from "./components/toast";
import Routes from "./routes";

const theme = {
  default: {
    primaryColor: "#66615B",
    secondaryColor: "#9A9A9A",
    lightColor: "#F2F2F2",
    buttonBackgroud: "#7AC29A",
    titleSize: "20px",
    subtitleSize: "14px",
  },
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme.default}>
        <Router>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
