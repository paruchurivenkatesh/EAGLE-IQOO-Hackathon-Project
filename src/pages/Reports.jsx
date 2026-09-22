import React from 'react';
import History from './History';

// For the hackathon demo, Reports will share the History layout but maybe different data.
// Reusing History for simplicity, but altering title dynamically if possible.
const Reports = () => {
  return (
    <div className="reports-container animate-fade-in">
      <header className="page-header" style={{marginBottom: '20px'}}>
        <h2 className="page-title">VERIFICATION REPORTS</h2>
      </header>
      <div className="empty-state">
        <p className="text-secondary" style={{textAlign: 'center', marginTop: '40px'}}>
          Detailed PDF reports will appear here.
        </p>
      </div>
    </div>
  );
};

export default Reports;
