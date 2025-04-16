import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import RootRoutes from "./routes/index";
import "./App.scss";
import { useEffect } from "react";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop>
        <RootRoutes />
      </ScrollToTop>
    </Router>
  );
}

export default App;
