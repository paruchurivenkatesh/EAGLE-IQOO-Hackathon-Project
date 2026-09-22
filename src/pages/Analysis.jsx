import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import { analyzeProductImage } from '../utils/ai';
import './Analysis.css';

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisError, setAnalysisError] = useState(false);

  // Retrieve uploaded image if available
  const uploadedImage = location.state?.image || 'https://images.unsplash.com/photo-1621551122354-e96737d6eba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';

  const steps = [
    { label: 'CAPTURING', desc: 'Capturing high-resolution image...' },
    { label: 'READING', desc: 'Reading product label...' },
    { label: 'EXTRACTING', desc: 'Extracting brand information...' },
    { label: 'COMPARING', desc: 'Comparing logo geometry...' },
    { label: 'VERIFYING', desc: 'Searching reference record...' },
    { label: 'RESULT', desc: 'Evaluating inconsistencies...' }
  ];

  useEffect(() => {
    let isMounted = true;

    const performAnalysis = async () => {
      try {
        // Start artificial UI progress loop for visual feedback
        const progressInterval = setInterval(() => {
          if (isMounted) {
            setCurrentStep(prev => {
              if (prev < steps.length - 2) return prev + 1;
              return prev; // hold at step 4 until actual AI finishes
            });
          }
        }, 800);

        // Process image for AI
        let base64Data = '';
        let mimeType = 'image/jpeg';
        
        if (uploadedImage.startsWith('data:')) {
          const parts = uploadedImage.split(';');
          mimeType = parts[0].split(':')[1];
          base64Data = parts[1].split(',')[1];
        }

        // Call the real Gemini API (or mock fallback if no key)
        let aiResult = null;
        if (base64Data) {
          aiResult = await analyzeProductImage(base64Data, mimeType);
        } else {
          // Fallback if they didn't actually upload an image (e.g. refreshed the page)
          aiResult = await analyzeProductImage('', mimeType);
        }

        clearInterval(progressInterval);
        
        if (isMounted) {
          setCurrentStep(steps.length - 1); // Jump to RESULT step
          setTimeout(() => navigate('/result', { state: { aiResult } }), 1000);
        }

      } catch (err) {
        console.error("Analysis failed", err);
        if (isMounted) setAnalysisError(true);
      }
    };

    performAnalysis();

    return () => {
      isMounted = false;
    };
  }, [navigate, uploadedImage]);

  return (
    <div className="analysis-container">
      <header className="analysis-header">
        <Logo size="small" />
      </header>

      <main className="analysis-main">
        <h2 className="analysis-title animate-pulse-glow">ANALYZING PRODUCT</h2>
        
        <div className="analysis-visual">
          <div className="captured-product" style={{ backgroundImage: `url(${uploadedImage})` }}>
            <div className="scan-line-horizontal"></div>
          </div>
          
          {/* Orbital Nodes */}
          <div className="orbit-node node-packaging">PACKAGING</div>
          <div className="orbit-node node-logo">LOGO</div>
          <div className="orbit-node node-ocr">OCR</div>
          <div className="orbit-node node-qr">QR</div>
          <div className="orbit-node node-barcode">BARCODE</div>
          <div className="orbit-node node-reference">REFERENCE</div>
        </div>

        <div className="analysis-status">
          {analysisError ? (
            <h3 className="complete-text text-danger">ANALYSIS FAILED</h3>
          ) : (
            <>
              <p className="status-text">{steps[currentStep].desc}</p>
              {currentStep === steps.length - 1 && (
                <h3 className="complete-text text-success">ANALYSIS COMPLETE</h3>
              )}
            </>
          )}
        </div>

        <div className="timeline-container">
          {steps.map((step, idx) => (
            <div key={idx} className={`timeline-step ${idx <= currentStep ? 'active' : ''}`}>
              <div className="step-dot"></div>
              <span className="step-num">0{idx + 1}</span>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
          <div 
            className="timeline-progress-bar"
            style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
