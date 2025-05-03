import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EyeControl from "../components/EyeControl";

const App: React.FC = () => (
  <Router>
    <EyeControl />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
