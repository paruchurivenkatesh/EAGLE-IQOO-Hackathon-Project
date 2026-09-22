import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MobileHeader, MobileBottomNav } from './MobileNav';
import './Layout.css';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide nav on splash screen, scanner, analysis, and result if needed
  const isFullScreenPage = ['/', '/scanner', '/analysis', '/result'].includes(location.pathname);

  if (isFullScreenPage) {
    return <Outlet />;
  }

  return (
    <div className="layout-container animate-fade-in">
      {isMobile ? (
        <div className="mobile-layout">
          <MobileHeader />
          <main className="mobile-main">
            <Outlet />
          </main>
          <MobileBottomNav />
        </div>
      ) : (
        <div className="desktop-layout">
          <Sidebar />
          <main className="desktop-main">
            <div className="max-w-container">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Layout;
