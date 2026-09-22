import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ScanLine, History, FileText } from 'lucide-react';
import Logo from '../shared/Logo';
import './MobileNav.css';

export const MobileHeader = () => {
  return (
    <header className="mobile-header">
      <Logo size="small" />
    </header>
  );
};

export const MobileBottomNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/home" className={({ isActive }) => `m-nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
        <span>HOME</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `m-nav-item ${isActive ? 'active' : ''}`}>
        <History size={24} />
        <span>HISTORY</span>
      </NavLink>
      <NavLink to="/scanner" className="m-nav-item m-scan-btn">
        <div className="scan-btn-inner">
          <ScanLine size={28} color="#000" />
        </div>
        <span>SCAN</span>
      </NavLink>
      <NavLink to="/reports" className={({ isActive }) => `m-nav-item ${isActive ? 'active' : ''}`}>
        <FileText size={24} />
        <span>REPORTS</span>
      </NavLink>
    </nav>
  );
};
