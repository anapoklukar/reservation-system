import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CalendarPage from "./pages/calendar-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
