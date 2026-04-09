import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// A simple, code-based logo icon (a magnifying glass with a shield/star)
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 7.5L8.5 10M11 7.5L13.5 10M11 7.5V13" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21l-4.35-4.35" stroke="var(--action-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* logo links to "/" home */}
        <Link to="/" className="navbar-logo-container">
          <LogoIcon />
          <div className="navbar-logo">
            SpecGuard <span>Lite</span>
          </div>
        </Link>
        <ul className="navbar-links">
          <li><a href="#about" className="nav-link">About Us</a></li>
          <li><a href="#contact" className="nav-link">Contact Us</a></li>
          <li><Link to="/login" className="nav-link login-btn">Login</Link></li>
          <li><Link to="/signup" className="nav-link signup-btn">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;