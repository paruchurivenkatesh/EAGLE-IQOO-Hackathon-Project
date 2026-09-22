import React from 'react';
import Card from '../components/ui/Card';

const About = () => {
  return (
    <div className="about-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto'}}>
      <header style={{textAlign: 'center', marginBottom: '20px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)'}}>WHY EAGLE?</h1>
        <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '16px', lineHeight: '1.6'}}>
          Counterfeit products can look remarkably similar to genuine products. EAGLE uses multiple signals to help consumers identify suspicious inconsistencies before they buy.
        </p>
      </header>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <Card>
          <h3 style={{color: 'var(--accent-primary)', marginBottom: '8px'}}>AI VISION</h3>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem'}}>Advanced computer vision models analyze the physical characteristics of the product packaging.</p>
        </Card>
        
        <Card>
          <h3 style={{color: 'var(--accent-primary)', marginBottom: '8px'}}>LOGO & PACKAGING ANALYSIS</h3>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem'}}>Detects minute geometric anomalies and color shifts in brand logos and packaging layouts.</p>
        </Card>

        <Card>
          <h3 style={{color: 'var(--accent-primary)', marginBottom: '8px'}}>OCR & BARCODE</h3>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem'}}>Extracts text and scans barcodes to verify batch data and product legitimacy against known references.</p>
        </Card>
      </div>
    </div>
  );
};

export default About;
