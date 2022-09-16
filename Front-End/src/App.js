import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PagesRouter from "./PagesRouter.js/PagesRouter";

function App() {
  return (
    <div>
      <Router>
        <PagesRouter />
      </Router>
    </div>
  );
}

export default App;
