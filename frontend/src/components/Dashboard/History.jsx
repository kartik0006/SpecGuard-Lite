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

const History = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    navigate('/'); 
    setTimeout(() => { signOut(auth); }, 100);
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
            <Link to="/new-audit" className="nav-item">
              <span className="icon">⚡</span>
              {!isSidebarCollapsed && <span className="text">New Audit</span>}
            </Link>
            {/* MARKED ACTIVE */}
            <Link to="/history" className="nav-item active">
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
            {/* DEDICATED HISTORY VIEW */}
            <div className="recent-history fade-up-scale" style={{ minHeight: '600px' }}>
              <h2>Audit History</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Review all your past code verifications.</p>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>PRD Title</th>
                      <th>Coverage</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="row-stagger-1">
                      <td>Today, 10:45 AM</td>
                      <td>Auth Module Integration</td>
                      <td>100%</td>
                      <td><span className="badge badge-success">Implemented</span></td>
                      <td><button style={{ background:'transparent', border:'1px solid var(--action-primary)', color:'var(--action-primary)', padding:'5px 10px', borderRadius:'5px', cursor:'pointer' }}>View</button></td>
                    </tr>
                    <tr className="row-stagger-2">
                      <td>Yesterday, 4:20 PM</td>
                      <td>Payment Gateway Setup</td>
                      <td>85%</td>
                      <td><span className="badge badge-partial">Partial</span></td>
                      <td><button style={{ background:'transparent', border:'1px solid var(--action-primary)', color:'var(--action-primary)', padding:'5px 10px', borderRadius:'5px', cursor:'pointer' }}>View</button></td>
                    </tr>
                    <tr className="row-stagger-3">
                      <td>Apr 02, 2026</td>
                      <td>User Profile API Endpoints</td>
                      <td>40%</td>
                      <td><span className="badge badge-missing">Missing</span></td>
                      <td><button style={{ background:'transparent', border:'1px solid var(--action-primary)', color:'var(--action-primary)', padding:'5px 10px', borderRadius:'5px', cursor:'pointer' }}>View</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;