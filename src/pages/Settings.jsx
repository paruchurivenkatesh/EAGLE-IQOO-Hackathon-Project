import React, { useState } from 'react';
import Card from '../components/ui/Card';

const Settings = () => {
  const [autoScan, setAutoScan] = useState(false);
  const [haptic, setHaptic] = useState(true);
  const [sound, setSound] = useState(false);

  return (
    <div className="settings-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <header className="page-header">
        <h2 className="page-title">SETTINGS</h2>
      </header>

      <Card style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        
        {/* Toggle Item */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h4>Auto Scan</h4>
            <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Automatically capture when product is ready</p>
          </div>
          <div 
            onClick={() => setAutoScan(!autoScan)}
            style={{
              width: '40px', height: '24px', 
              background: autoScan ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
              borderRadius: '12px', 
              position: 'relative', 
              cursor: 'pointer',
              border: autoScan ? 'none' : '1px solid var(--border-color)',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{
              width: '20px', height: '20px', 
              background: autoScan ? '#000' : 'var(--text-secondary)', 
              borderRadius: '50%', 
              position: 'absolute', 
              top: autoScan ? '2px' : '1px',
              left: autoScan ? '18px' : '2px',
              transition: 'left 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Toggle Item */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h4>Haptic Feedback</h4>
            <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Vibrate on successful scan</p>
          </div>
          <div 
            onClick={() => setHaptic(!haptic)}
            style={{
              width: '40px', height: '24px', 
              background: haptic ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
              borderRadius: '12px', 
              position: 'relative', 
              cursor: 'pointer',
              border: haptic ? 'none' : '1px solid var(--border-color)',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{
              width: '20px', height: '20px', 
              background: haptic ? '#000' : 'var(--text-secondary)', 
              borderRadius: '50%', 
              position: 'absolute', 
              top: haptic ? '2px' : '1px',
              left: haptic ? '18px' : '2px',
              transition: 'left 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Toggle Item */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h4>Sound</h4>
            <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Play sound on capture</p>
          </div>
          <div 
            onClick={() => setSound(!sound)}
            style={{
              width: '40px', height: '24px', 
              background: sound ? 'var(--accent-primary)' : 'var(--bg-tertiary)', 
              borderRadius: '12px', 
              position: 'relative', 
              cursor: 'pointer',
              border: sound ? 'none' : '1px solid var(--border-color)',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{
              width: '20px', height: '20px', 
              background: sound ? '#000' : 'var(--text-secondary)', 
              borderRadius: '50%', 
              position: 'absolute', 
              top: sound ? '2px' : '1px',
              left: sound ? '18px' : '2px',
              transition: 'left 0.3s ease'
            }}></div>
          </div>
        </div>

      </Card>

      <Card>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <h4>About Application</h4>
          <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Version: 1.0.0 (Hackathon Build)</p>
          <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Developed for: iQOO Smartphone Demo</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
