// Landing.js
import React from 'react';
import { Link } from 'react-router-dom';
import { GiSwimmer, FaCoach, FaBuilding } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';


import { GiSwimmer, GiCoach, GiBuilding } from 'react-icons/gi';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <GiSwimmer size={50} color="#0097A7" className="landing-logo" />
        <nav className="landing-nav">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/coaches">Meet the Coaches</Link></li>
            <li><Link to="/join">Join the Team</Link></li>
          </ul>
        </nav>
      </header>
      <section className="landing-hero">
        <div className="landing-hero-background" />
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">Dive into the Fun with Cumming Waves Swim Team!</h1>
          <p className="landing-hero-subtitle">Join our community of passionate swimmers and coaches, and take your skills to the next level.</p>
          <Link to="/join" className="landing-hero-cta">Learn More</Link>
        </div>
      </section>
      <section className="landing-features">
        <h2 className="landing-features-title">What Sets Us Apart</h2>
        <div className="landing-features-grid">
          <div className="landing-feature">
            <GiCoach size={50} color="#0097A7" className="landing-feature-icon" />
            <h3 className="landing-feature-title">Expert Coaches</h3>
            <p className="landing-feature-text">Our experienced coaches will help you improve your technique and reach your goals.</p>
          </div>
          <div className="landing-feature">
            <GiBuilding size={50} color="#0097A7" className="landing-feature-icon" />
            <h3 className="landing-feature-title">State-of-the-Art Facilities</h3>
            <p className="landing-feature-text">We train in top-notch facilities with the latest equipment and technology.</p>
          </div>
          <div className="landing-feature">
            <GiSwimmer size={50} color="#0097A7" className="landing-feature-icon" />
            <h3 className="landing-feature-title">Community Focus</h3>
            <p className="landing-feature-text">At Cumming Waves, we believe that swimming is about more than just competition - it's about building relationships and having fun.</p>
          </div>
        </div>
      </section>
      <section className="landing-call-to-action">
        <h2 className="landing-call-to-action-title">Ready to Join the Fun?</h2>
        <p className="landing-call-to-action-text">Whether you're a seasoned swimmer or just starting out, we invite you to join our community of passionate swimmers and coaches.</p>
        <Link to="/join" className="landing-call-to-action-cta">Join the Team</Link>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2023 Cumming Waves Swim Team</p>
      </footer>
    </div>
  );
};

export default Landing;