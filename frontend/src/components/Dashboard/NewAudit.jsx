import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css';

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="var(--action-primary)" strokeWidth="2"/>
  </svg>
);

const NewAudit = () => {
  const navigate = useNavigate();

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ✅ NEW STATES
  const [prd, setPrd] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleLogout = () => {
    navigate('/');
    setTimeout(() => signOut(auth), 100);
  };

  // ✅ REAL BACKEND CALL
  const handleAnalyze = async (e) => {
    e.preventDefault();

    console.log("CLICKED");

    setIsAnalyzing(true);

    try {
      const res = await fetch("http://localhost:5001/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prd,
          code
        })
      });

      const data = await res.json();

      console.log("RESULT:", data);

      setResult(data);

    } catch (err) {
      console.error("ERROR:", err);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="dashboard-container">
      {/* TOP NAV */}
      <nav className="dashboard-top-navbar">
        <Link to="/" className="navbar-logo-container" style={{ textDecoration: 'none' }}>
          <LogoIcon />
          <div className="navbar-logo">SpecGuard <span>Lite</span></div>
        </Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="dashboard-body">

        {/* SIDEBAR */}
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item">
              <span className="icon">📊</span>
              {!isSidebarCollapsed && <span className="text">Dashboard</span>}
            </Link>

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

        {/* MAIN */}
        <main className="dashboard-main">
          <div className="dashboard-content">

            <div className="quick-audit" style={{ minHeight: '600px' }}>
              <h2>Run a New AI Audit</h2>

              <form onSubmit={handleAnalyze} className="audit-form">

                {/* PRD */}
                <div className="textarea-wrapper">
                  <label>Product Requirements (PRD)</label>
                  <textarea
                    value={prd}
                    onChange={(e) => setPrd(e.target.value)}
                    placeholder="User can login, logout, reset password"
                    style={{ minHeight: '150px' }}
                    required
                  />
                </div>

                {/* CODE */}
                <div className="textarea-wrapper">
                  <label>Source Code</label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="function login() {} function logout() {}"
                    style={{ minHeight: '200px' }}
                    required
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className={`analyze-btn ${isAnalyzing ? 'loading' : ''}`}
                  style={{ marginTop: '2rem' }}
                >
                  {isAnalyzing ? "Analyzing..." : "Run AI Audit 🚀"}
                </button>

              </form>

              {/* ✅ RESULT SECTION */}
              {result && (
                <div style={{ marginTop: "2rem" }}>
                  <h3>Coverage: {result.coverage}%</h3>

                  <h4 style={{ color: "lightgreen" }}>✅ Implemented</h4>
                  {result.implemented.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}

                  <h4 style={{ color: "orange" }}>⚠️ Partial</h4>
                  {result.partial.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}

                  <h4 style={{ color: "red" }}>❌ Missing</h4>
                  {result.missing.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              )}

            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default NewAudit;