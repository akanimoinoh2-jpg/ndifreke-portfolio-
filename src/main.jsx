import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

class RootErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio render failed", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-screen" role="alert">
          <p className="eyebrow">Something went wrong</p>
          <h1>This page could not be displayed.</h1>
          <p>Please refresh the page or return to the home page.</p>
          <a className="button button-dark" href="/">
            Return home
          </a>
        </main>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootErrorBoundary>
  </React.StrictMode>,
);
