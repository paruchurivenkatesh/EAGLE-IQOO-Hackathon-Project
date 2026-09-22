import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, QrCode, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        navigate('/analysis', { state: { source: 'upload', image: reader.result } });
      };
    }
  };

  return (
    <div className="home-container animate-fade-in">
      <header className="home-header">
        <p className="greeting">Namasthe 🙏</p>
        <h1 className="brand-title">EAGLE AI</h1>
        <p className="tagline">"Know Before You Buy."</p>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-headline">VERIFY<br />WHAT YOU<br />BUY.</h2>
          <p className="hero-subtext">
            Analyze packaging, logos, QR codes and barcodes with AI-powered visual verification.
          </p>
          <div className="hero-actions">
            <Button variant="primary" fullWidth onClick={() => navigate('/scanner')}>
              <Camera size={20} /> SCAN PRODUCT
            </Button>
            <Button variant="secondary" fullWidth onClick={() => fileInputRef.current?.click()}>
              <Upload size={20} /> UPLOAD IMAGE
            </Button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{display: 'none'}} />
          </div>
        </div>
        <div className="hero-visual">
          <div className="scanning-frame">
            <div className="mock-product"></div>
            <div className="scan-line"></div>
            <div className="floating-badge badge-1">LOGO</div>
            <div className="floating-badge badge-2">OCR</div>
            <div className="floating-badge badge-3">QR</div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <Card className="stat-card">
          <p className="stat-label">TOTAL SCANS</p>
          <h3 className="stat-value">128</h3>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">PRODUCTS VERIFIED</p>
          <h3 className="stat-value text-success">94</h3>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">SUSPICIOUS DETECTED</p>
          <h3 className="stat-value text-warning">17</h3>
        </Card>
        <Card className="stat-card">
          <p className="stat-label">ANALYSIS ACCURACY*</p>
          <h3 className="stat-value text-accent">94.2%</h3>
        </Card>
        <p className="stat-disclaimer">*Prototype verification confidence based on available reference data.</p>
      </section>

      <section className="quick-actions">
        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-grid">
          <Card className="action-card" onClick={() => navigate('/scanner')}>
            <Camera size={24} className="text-accent" />
            <div className="action-text">
              <h4>Scan Product</h4>
              <p>Scan using camera</p>
            </div>
            <ArrowRight size={20} className="text-secondary" />
          </Card>
          <Card className="action-card" onClick={() => fileInputRef.current?.click()}>
            <Upload size={24} className="text-accent" />
            <div className="action-text">
              <h4>Upload Product</h4>
              <p>Upload an image</p>
            </div>
            <ArrowRight size={20} className="text-secondary" />
          </Card>
          <Card className="action-card" onClick={() => navigate('/scanner')}>
            <QrCode size={24} className="text-accent" />
            <div className="action-text">
              <h4>Scan QR / Barcode</h4>
              <p>Direct code scanner</p>
            </div>
            <ArrowRight size={20} className="text-secondary" />
          </Card>
        </div>
      </section>

      <section className="how-it-works">
        <h3 className="section-title">How EAGLE Works</h3>
        <div className="steps-container">
          {[
            { num: '01', title: 'CAPTURE', desc: 'Capture the product using your phone camera.' },
            { num: '02', title: 'UNDERSTAND', desc: 'AI extracts packaging, logo and text information.' },
            { num: '03', title: 'VERIFY', desc: 'QR/barcode and product features are compared with reference data.' },
            { num: '04', title: 'ANALYZE', desc: 'EAGLE generates a confidence-based authenticity assessment.' }
          ].map((step, idx) => (
            <div className="step-card" key={idx}>
              <div className="step-number">{step.num}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
