// hooks/useOverlay.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import "../styles/overlay.css";
import { TailSpin } from "react-loader-spinner";

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [overlayState, setOverlayState] = useState({
    visible: false,
    component: null,
    data: null,
  });

  const [loading, setLoading] = useState(false); 
  const [loadingMessage, setLoadingMessage] = useState(""); 

  const openOverlay = (component, data = null) => {
    if (typeof component === "function") {
      console.warn("openOverlay expects a JSX element, not a component function.");
      component = React.createElement(component);
    }
    setOverlayState({ visible: true, component, data });
  };

  const closeOverlay = () => {
    setOverlayState({ visible: false, component: null, data: null });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && overlayState.visible) {
        closeOverlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [overlayState.visible]);

  const startLoading = (message = "") => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const endLoading = () => {
    setLoading(false);
    setLoadingMessage("");
  };

  return (
    <OverlayContext.Provider
      value={{ ...overlayState, openOverlay, closeOverlay, startLoading, endLoading }}
    >
      {children}

      {/* Overlay content */}
      {overlayState.visible && overlayState.component && (
        <div className="overlay-backdrop" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            {React.cloneElement(overlayState.component, {
              formData: overlayState.data,
              closeOverlay,
            })}
          </div>
        </div>
      )}

      {/* Loading animation with message */}
      {loading && (
        <div className="overlay-backdrop" >
          <div className="overlay-loading">
            <TailSpin
              height={60}
              width={60}
              color="white"
              ariaLabel="loading"
            />
            {loadingMessage && (
              <p style={{ marginTop: 20, color: "white", fontSize: "1rem", textAlign: "center"}}>
                {loadingMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
