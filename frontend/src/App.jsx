import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import NewAudit from "./components/Dashboard/NewAudit";
import History from "./components/Dashboard/History";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/new-audit" element={ <ProtectedRoute><NewAudit /></ProtectedRoute> } />
        <Route path="/history" element={ <ProtectedRoute><History /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
}

export default App;