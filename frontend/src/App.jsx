import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

// Temporary placeholders so your app doesn't crash when clicking Navbar links.
// You will replace these with real components (e.g., import Login from './components/Login/Login')
const LoginPlaceholder = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ color: 'var(--action-primary)' }}>Login Page (Building Next)</h1>
  </div>
);

const SignupPlaceholder = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ color: 'var(--status-success)' }}>Signup Page (Building Next)</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPlaceholder />} />
        <Route path="/signup" element={<SignupPlaceholder />} />
        
        {/* Future Route: The actual AI Audit Dashboard */}
        {/* <Route path="/audit" element={<AuditDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;