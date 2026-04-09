import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css'; // Reusing the perfect CSS

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 7.5L8.5 10M11 7.5L13.5 10M11 7.5V13" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21l-4.35-4.35" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NewAudit = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLogout = () => {
    navigate('/'); 
    setTimeout(() => { signOut(auth); }, 100);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-top-navbar">
        <Link to="/" className="navbar-logo-container" style={{ textDecoration: 'none' }}>
          <LogoIcon />
          <div className="navbar-logo">SpecGuard <span>Lite</span></div>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="dashboard-body">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item">
              <span className="icon">📊</span>
              {!isSidebarCollapsed && <span className="text">Dashboard</span>}
            </Link>
            {/* MARKED ACTIVE */}
            <Link to="/new-audit" className="nav-item active">
              <span className="icon">⚡</span>
              {!isSidebarCollapsed && <span className="text">New Audit</span>}
            </Link>
            <Link to="/history" className="nav-item">
              <span className="icon">📁</span>
              {!isSidebarCollapsed && <span className="text">History</span>}
            </Link>
          </nav>
          <button className="toggle-btn" onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}>
            {isSidebarCollapsed ? '→' : '← Collapse'}
          </button>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* DEDICATED AUDIT VIEW */}
            <div className="quick-audit fade-up-scale" style={{ minHeight: '600px' }}>
              <h2>Run a New AI Audit</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Paste your Product Requirements Document (PRD) and Source Code below to generate an instant verification report.
              </p>
              <form onSubmit={handleAnalyze} className="audit-form">
                <div className="input-group" style={{ flexDirection: 'column', gap: '2rem' }}>
                  <div className="textarea-wrapper">
                    <label>Product Requirements (PRD)</label>
                    <textarea placeholder="e.g., User must be able to login with email and password..." style={{ minHeight: '150px' }} required></textarea>
                  </div>
                  <div className="textarea-wrapper">
                    <label>Source Code</label>
                    <textarea placeholder="Paste your React components or Node.js endpoints here..." style={{ minHeight: '200px' }} required></textarea>
                  </div>
                </div>
                <button type="submit" className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`} style={{ marginTop: '2rem' }}>
                  {isAnalyzing ? <span className="spinner"></span> : 'Analyze with Gemini ✨'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewAudit;