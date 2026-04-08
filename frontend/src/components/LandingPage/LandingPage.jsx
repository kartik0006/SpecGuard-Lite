import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import HowItWorks from '../HowItWorks/HowItWorks';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;