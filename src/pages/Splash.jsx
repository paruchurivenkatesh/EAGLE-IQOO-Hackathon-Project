import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content animate-fade-in">
        <div className="splash-logo-wrapper">
          <Logo size="large" />
        </div>
        <div className="splash-text">
          <h2 className="splash-tagline">"Know Before You Buy."</h2>
          <p className="splash-subtext">AI PRODUCT AUTHENTICITY</p>
        </div>
      </div>
      
      <div className="splash-footer">
        <div className="splash-loading-bar">
          <div className="splash-progress"></div>
        </div>
        <p className="splash-loading-text">INITIALIZING AI VISION...</p>
      </div>
    </div>
  );
};

export default Splash;
