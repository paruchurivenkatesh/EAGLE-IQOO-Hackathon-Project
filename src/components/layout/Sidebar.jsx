import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ScanLine, History, FileText, Database, Info, Settings, Menu } from 'lucide-react';
import Logo from '../shared/Logo';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Handle window resize to auto-collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/home', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/scanner', icon: <ScanLine size={20} />, label: 'Scan Product' },
    { path: '/history', icon: <History size={20} />, label: 'Scan History' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Reports' },
    { path: '/database', icon: <Database size={20} />, label: 'Product Database' },
    { path: '/about', icon: <Info size={20} />, label: 'About EAGLE' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Logo size="small" iconOnly={collapsed} />
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-dot active animate-pulse-glow" />
          {!collapsed && <span>AI Engine Online</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
