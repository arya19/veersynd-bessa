import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobDescriptionPage from "./Pages/JobDescriptionPage";
import GeneratedDataPage from "./Pages/GeneratedDataPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobDescriptionPage />} />
        <Route path="/generated-data" element={<GeneratedDataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
