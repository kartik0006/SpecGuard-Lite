import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css'; // Uses your perfect CSS

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 7.5L8.5 10M11 7.5L13.5 10M11 7.5V13" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21l-4.35-4.35" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const userName = auth.currentUser?.displayName || "Bhavya";

  const handleLogout = () => {
    navigate('/'); 
    setTimeout(() => {
      signOut(auth).catch((error) => console.error("Logout failed", error));
    }, 100);
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
          <div className="navbar-logo">
            SpecGuard <span>Lite</span>
          </div>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="dashboard-body">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            {/* FIXED: Using Link and marking Dashboard as active */}
            <Link to="/dashboard" className="nav-item active">
              <span className="icon">📊</span>
              {!isSidebarCollapsed && <span className="text">Dashboard</span>}
            </Link>
            <Link to="/new-audit" className="nav-item">
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
            
            <div className="welcome-banner fade-up-scale delay-1">
              <div className="banner-content">
                <h1>Welcome back, {userName}! <span className="wave">👋</span></h1>
                <p>Ready to verify some code?</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card stagger-1">
                <h3>Total Audits</h3>
                <div className="stat-value">24</div>
              </div>
              <div className="stat-card stagger-2">
                <h3>Coverage Avg</h3>
                <div className="stat-value text-success">92%</div>
              </div>
              <div className="stat-card stagger-3">
                <h3>Missing Items</h3>
                <div className="stat-value text-danger">3</div>
              </div>
            </div>

            <div className="quick-audit slide-up-bottom delay-4">
              <h2>Quick Audit</h2>
              <form onSubmit={handleAnalyze} className="audit-form">
                <div className="input-group">
                  <div className="textarea-wrapper">
                    <label>Product Requirements (PRD)</label>
                    <textarea placeholder="Paste your requirements here..." required></textarea>
                  </div>
                  <div className="textarea-wrapper">
                    <label>Source Code</label>
                    <textarea placeholder="Paste your Code here..." required></textarea>
                  </div>
                </div>
                <button type="submit" className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`}>
                  {isAnalyzing ? <span className="spinner"></span> : 'Analyze with Gemini'}
                </button>
              </form>
            </div>

            <div className="bottom-grid">
              <div className="recent-history fade-in delay-5">
                <h2>Recent History</h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>PRD Title</th>
                        <th>Coverage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="row-stagger-1">
                        <td>Today</td>
                        <td>Auth Module</td>
                        <td>100%</td>
                        <td><span className="badge badge-success">Implemented</span></td>
                      </tr>
                      <tr className="row-stagger-2">
                        <td>Yesterday</td>
                        <td>Payment Gateway</td>
                        <td>85%</td>
                        <td><span className="badge badge-partial">Partial</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="trend-chart fade-in delay-6">
                <h2>Coverage Trend</h2>
                <div className="chart-container">
                  <svg viewBox="0 0 400 150" className="animated-svg-chart">
                    <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" />
                    <path className="chart-line" d="M 0 100 Q 50 110, 100 80 T 200 60 T 300 40 T 400 20" fill="none" stroke="var(--action-primary)" strokeWidth="3" />
                    <circle cx="100" cy="80" r="4" fill="var(--action-primary)" className="data-point point-1"/>
                    <circle cx="200" cy="60" r="4" fill="var(--action-primary)" className="data-point point-2"/>
                  </svg>
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;