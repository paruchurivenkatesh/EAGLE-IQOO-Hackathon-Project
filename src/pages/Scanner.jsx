import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize, Image as ImageIcon, Zap, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import './Scanner.css';

const Scanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [isReady, setIsReady] = useState(false); // User decides when ready

  useEffect(() => {
    let localStream = null;

    const startCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        setCameraError(false);
        
        setTimeout(() => setIsReady(true), 2000);
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
        setCameraError(true);
      }
    };

    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // Force stop all tracks directly from the video element
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      
      navigate('/analysis', { state: { source: 'camera', image: dataUrl } });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Force stop all tracks directly from the video element
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        navigate('/analysis', { state: { source: 'upload', image: reader.result } });
      };
    }
  };

  if (cameraError) {
    return (
      <div className="scanner-container" style={{justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center'}}>
        <h2 style={{color: 'var(--danger)', marginBottom: '16px'}}>CAMERA ACCESS REQUIRED</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '32px'}}>Allow camera access to scan a product, or upload an image instead.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '300px'}}>
          <Button variant="primary" onClick={() => window.location.reload()}>ENABLE CAMERA</Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>UPLOAD IMAGE</Button>
          <Button variant="tertiary" onClick={() => navigate('/home')}>Back to Home</Button>
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{display: 'none'}} />
      </div>
    );
  }

  return (
    <div className="scanner-container">
      <header className="scanner-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} /> Back
        </button>
        <div className="scanner-title">
          <h3>EAGLE SCANNER</h3>
          <div className="status-indicator">
            <div className="status-dot active animate-pulse-glow" />
            <span>AI VISION ACTIVE</span>
          </div>
        </div>
        <div className="spacer"></div>
      </header>

      <main className="scanner-main">
        <div className="scanner-viewport">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="camera-feed-video"
          ></video>

          {/* Alignment Guides */}
          <div className={`alignment-frame ${isReady ? 'frame-locked' : ''}`}>
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
            
            {!isReady && <div className="scan-line-vertical"></div>}
          </div>
        </div>

        <div className="scanner-instructions">
          {!isReady ? (
            <>
              <h3>ALIGN PRODUCT INSIDE FRAME</h3>
              <p>"Keep the logo, label and code visible."</p>
            </>
          ) : (
            <div className="ready-state animate-fade-in">
              <CheckCircle2 size={32} className="text-success" />
              <h3 className="text-success">READY TO CAPTURE</h3>
            </div>
          )}
        </div>
      </main>

      <footer className="scanner-controls">
        <button className="control-btn" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon size={24} /><br/>Gallery
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{display: 'none'}} />
        
        <div className="capture-wrapper">
          <button 
            className={`capture-btn ${isReady ? 'ready' : ''}`}
            onClick={handleCapture}
            disabled={!isReady}
          >
            <div className="capture-btn-inner"></div>
          </button>
        </div>

        <button className="control-btn"><Zap size={24} /><br/>Flash</button>
      </footer>
    </div>
  );
};

export default Scanner;
