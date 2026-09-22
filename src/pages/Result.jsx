import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowRight, XCircle, Camera } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Result.css';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get dynamic AI result from router state, or fallback to mock
  const aiResult = location.state?.aiResult || {
    status: 'genuine',
    confidence: 94,
    desc: 'Strong agreement detected across the available verification signals.',
    signals: {
      logo: "96% MATCH",
      packaging: "94% MATCH",
      ocr: "98% MATCH",
      barcode: "100% MATCH",
      qr: "UNVERIFIED",
      manufacturer: "95% MATCH"
    }
  };
  
  const getResultConfig = () => {
    switch (aiResult.status) {
      case 'genuine':
        return {
          icon: <CheckCircle2 size={48} className="text-success" />,
          title: 'LIKELY GENUINE',
          colorClass: 'text-success'
        };
      case 'suspicious':
        return {
          icon: <AlertTriangle size={48} className="text-warning" />,
          title: 'SUSPICIOUS',
          colorClass: 'text-warning'
        };
      case 'invalid':
        return {
          icon: <XCircle size={48} className="text-danger" />,
          title: 'INVALID SCAN',
          colorClass: 'text-danger'
        };
      default:
        return {
          icon: <AlertTriangle size={48} className="text-secondary" />,
          title: 'UNABLE TO VERIFY',
          colorClass: 'text-secondary'
        };
    }
  };

  const config = getResultConfig();

  if (aiResult.status === 'invalid') {
    return (
      <div className="result-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
        <div style={{textAlign: 'center', maxWidth: '400px', padding: '20px'}}>
          <XCircle size={64} className="text-danger" style={{margin: '0 auto 20px'}} />
          <h2 className="text-danger" style={{fontSize: '1.5rem', marginBottom: '16px'}}>NOT A PRODUCT</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>{aiResult.description || "The AI could not detect a recognizable consumer product in the image."}</p>
          <Button variant="primary" fullWidth onClick={() => navigate('/scanner')}>
            <Camera size={20} /> TRY AGAIN
          </Button>
          <Button variant="tertiary" fullWidth onClick={() => navigate('/home')} style={{marginTop: '12px'}}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container animate-fade-in">
      <header className="result-header">
        <h2>PRODUCT VERIFICATION</h2>
      </header>

      <main className="result-main">
        <section className="result-hero">
          <div className="result-status">
            {config.icon}
            <h1 className={`result-title \${config.colorClass}`}>{config.title}</h1>
            <p className="result-desc">{aiResult.description}</p>
          </div>
          
          <div className="confidence-meter-container" style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${aiResult.confidence}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="confidence-value" style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
              <span className="number" style={{ display: 'block', fontSize: '2.5rem', fontWeight: 800 }}>{aiResult.confidence}%</span>
              <span className="label" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>CONFIDENCE</span>
            </div>
          </div>
        </section>

        <section className="signals-section">
          <h3>Verification Signals</h3>
          <div className="signals-grid">
            <Card className="signal-card" hover={false}>
              <span className="signal-label">LOGO</span>
              <span className="signal-value text-success">{aiResult.signals?.logo || 'N/A'}</span>
            </Card>
            <Card className="signal-card" hover={false}>
              <span className="signal-label">PACKAGING</span>
              <span className="signal-value text-success">{aiResult.signals?.packaging || 'N/A'}</span>
            </Card>
            <Card className="signal-card" hover={false}>
              <span className="signal-label">OCR</span>
              <span className="signal-value text-success">{aiResult.signals?.ocr || 'N/A'}</span>
            </Card>
            <Card className="signal-card" hover={false}>
              <span className="signal-label">BARCODE</span>
              <span className="signal-value text-success">{aiResult.signals?.barcode || 'N/A'}</span>
            </Card>
            <Card className="signal-card" hover={false}>
              <span className="signal-label">QR</span>
              <span className="signal-value text-secondary">{aiResult.signals?.qr || 'N/A'}</span>
            </Card>
            <Card className="signal-card" hover={false}>
              <span className="signal-label">MANUFACTURER</span>
              <span className="signal-value text-success">{aiResult.signals?.manufacturer || 'N/A'}</span>
            </Card>
          </div>
        </section>

        <section className="result-actions">
          <Button variant="primary" fullWidth onClick={() => navigate('/comparison')}>
            VIEW COMPARISON <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/details')}>
            FULL PRODUCT DETAILS
          </Button>
          <Button variant="tertiary" fullWidth onClick={() => navigate('/home')}>
            Back to Dashboard
          </Button>
        </section>
        
        <p className="disclaimer-text">
          AI-assisted assessment based on available reference data. Not a definitive legal guarantee.
        </p>
      </main>
    </div>
  );
};

export default Result;
