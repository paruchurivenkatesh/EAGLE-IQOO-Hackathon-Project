import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';

const Comparison = () => {
  const navigate = useNavigate();

  return (
    <div className="comparison-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <header className="page-header" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', color: 'var(--text-primary)'}}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="page-title">SCAN vs REFERENCE</h2>
      </header>

      <div className="comparison-view" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
        
        {/* Scanned */}
        <div className="compare-side">
          <h3 style={{color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '0.1em'}}>SCANNED PRODUCT</h3>
          <div style={{height: '300px', background: 'url(https://images.unsplash.com/photo-1621551122354-e96737d6eba3?auto=format&fit=crop&w=400&q=80) center/cover', borderRadius: '12px', border: '2px solid var(--warning)'}}></div>
        </div>

        {/* Reference */}
        <div className="compare-side">
          <h3 style={{color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.9rem', letterSpacing: '0.1em'}}>REFERENCE PRODUCT</h3>
          <div style={{height: '300px', background: 'url(https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80) center/cover', borderRadius: '12px', border: '1px solid var(--border-color)'}}></div>
        </div>

      </div>

      <Card>
        <h3 style={{marginBottom: '16px', color: 'var(--warning)'}}>Detected Differences</h3>
        <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <li style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '8px'}}>
            <span style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>LOGO GEOMETRY</span>
            <p>Scanned logo aspect ratio differs by 4% from reference.</p>
          </li>
          <li>
            <span style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>PACKAGING COLOR</span>
            <p>Slight hue shift detected in the primary background color.</p>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Comparison;
