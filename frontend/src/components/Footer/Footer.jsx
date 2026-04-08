import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          SpecGuard <span>Lite</span>
        </div>
        <p className="footer-tagline">Built for hackathons. Built for speed.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} SpecGuard Lite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;