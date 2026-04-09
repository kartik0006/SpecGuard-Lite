import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: "✓",
      title: "Requirement Extraction",
      description: "Automatically parses PRD into structured requirements using Gemini AI. Handles any format - bullet points, paragraphs, or numbered lists.",
      tag: "AI-Powered"
    },
    {
      icon: "🔍",
      title: "Smart Code Analysis",
      description: "Reads your functions, APIs, and endpoints. Matches each requirement against actual implementation with confidence scoring.",
      tag: "Real-time"
    },
    {
      icon: "📊",
      title: "Instant Audit Report",
      description: "Get color-coded results: ✅ Implemented, ❌ Missing, ⚠️ Partial. Export as JSON or shareable link.",
      tag: "Export Ready"
    },
    {
      icon: "⚡",
      title: "Framework Agnostic",
      description: "Works beautifully whether you are using React, Node.js, Python, or raw vanilla JS for your hackathon stack.",
      tag: "Flexible"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your code stays yours. Code snippets are analyzed strictly in memory and never stored in our databases.",
      tag: "Secure"
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        {features.map((feat, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feat.icon}</div>
            <span className="feature-tag">{feat.tag}</span>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-description">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;