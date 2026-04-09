import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="about" className="how-it-works">
      <h2 className="section-title">From PRD to Audit in 3 Simple Steps</h2>
      
      <div className="steps-container">
        {/* Card 1: Slides in from the left */}
        <div className="step-card slide-left">
          <div className="step-number">1</div>
          <h3>📄 Paste Your PRD</h3>
          <p>Copy your Product Requirements Document - any format works</p>
        </div>

        <div className="step-connector"></div>

        {/* Card 2: Fades up from the bottom */}
        <div className="step-card fade-up">
          <div className="step-number">2</div>
          <h3>💻 Add Your Code</h3>
          <p>Paste functions, API endpoints, or entire modules</p>
        </div>

        <div className="step-connector"></div>

        {/* Card 3: Slides in from the right */}
        <div className="step-card slide-right">
          <div className="step-number">3</div>
          <h3>🤖 Get Instant Analysis</h3>
          <p>Gemini AI compares both and generates a detailed report</p>
        </div>
      </div>

      <div className="bonus-feature">
        <p>✨ <strong>No signup required for demo</strong> • Results in under 10 seconds</p>
      </div>
    </section>
  );
};

export default HowItWorks;