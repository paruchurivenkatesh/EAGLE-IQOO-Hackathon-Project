import React from 'react';
import { Search, Database as DatabaseIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Database = () => {
  const dbData = [
    { id: 101, brand: 'EAGLE Demo', name: 'Demo Chips (Genuine Ref)', category: 'Food', barcode: '890123456789' },
    { id: 102, brand: 'EAGLE Demo', name: 'Demo Cola (Genuine Ref)', category: 'Beverages', barcode: '890987654321' },
  ];

  return (
    <div className="database-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <header className="page-header">
        <h2 className="page-title">PRODUCT DATABASE</h2>
      </header>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search product or barcode..." className="search-input" />
        </div>
      </div>

      <div className="demo-notice" style={{padding: '12px', background: 'rgba(255,214,0,0.1)', border: '1px solid var(--accent-primary)', borderRadius: '8px', color: 'var(--accent-primary)', fontSize: '0.85rem'}}>
        <strong>DEMO REFERENCE DATA</strong> - Showing internal mock records used for hackathon verification testing.
      </div>

      <div className="db-list" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {dbData.map(item => (
          <Card key={item.id}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div>
                <span style={{fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase'}}>{item.brand} • {item.category}</span>
                <h4 style={{fontSize: '1.1rem', margin: '4px 0'}}>{item.name}</h4>
                <span style={{fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-tertiary)'}}>UPC: {item.barcode}</span>
              </div>
              <Button variant="secondary" style={{padding: '6px 12px', fontSize: '0.8rem'}}>VIEW</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Database;
