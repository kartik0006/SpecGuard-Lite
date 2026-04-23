import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title fade-up">
          Ensure Your Code Matches<br/>
          <span className="typewriter-text">Your Requirements</span>
        </h1>
        <h2 className="hero-subtitle fade-up delay-1">
          AI-powered PRD vs Code verification
        </h2>
        <p className="hero-description fade-up delay-2">
          Paste your PRD and code. Get instant audit of what's implemented, 
          what's missing, and what's partial. Save hours of manual review.
        </p>
        <div className="hero-actions fade-up delay-3">
          <button className="btn-primary">Try Demo &rarr;</button>
          <button className="btn-secondary">
            <span className="play-icon">▶</span> Watch Video
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;