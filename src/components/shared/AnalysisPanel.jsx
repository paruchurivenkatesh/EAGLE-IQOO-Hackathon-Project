import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import './AnalysisPanel.css';

const AnalysisPanel = ({ active = false, checks = [] }) => {
  return (
    <div className="analysis-panel">
      <div className="panel-header">
        <h4>EAGLE AI VISION</h4>
        <div className="status-indicator">
          {active ? (
            <>
              <div className="status-dot active animate-pulse-glow" />
              <span>ANALYSIS ACTIVE</span>
            </>
          ) : (
            <>
              <div className="status-dot" />
              <span>SYSTEM IDLE</span>
            </>
          )}
        </div>
      </div>
      
      <div className="panel-body">
        {checks.map((check, index) => (
          <div key={index} className="check-item">
            <span className="check-label">{check.label}</span>
            <span className="check-status">
              {check.status === 'done' && <Check size={16} className="text-success" />}
              {check.status === 'loading' && <Loader2 size={16} className="text-accent animate-spin" />}
              {check.status === 'pending' && <span className="text-secondary">-</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPanel;
