// src/components/LoadingScreen.jsx
import React from "react";
import { TailSpin } from "react-loader-spinner";
import "../styles/loading.css";

const LoadingScreen = ({ message = "Loading...", padding = "2rem", textMargin = ""}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container" style={{padding: padding}}>
        <TailSpin
          height={60}
          width={60}
          color="var(--text-colour)"
          ariaLabel="loading"
        />
        {message != "" &&
        <p  style={textMargin ? { marginTop: textMargin } : {}} className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingScreen;
