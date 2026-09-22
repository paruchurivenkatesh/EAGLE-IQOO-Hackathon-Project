import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';

const ProductDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="details-container animate-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <header className="page-header" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', color: 'var(--text-primary)'}}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="page-title">PRODUCT DETAILS</h2>
      </header>

      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
        <div style={{flex: '1 1 300px'}}>
          <img src="https://images.unsplash.com/photo-1566478989037-e924e5077977?auto=format&fit=crop&w=600&q=80" alt="Product" style={{width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)'}} />
        </div>
        
        <div style={{flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <h1 style={{fontSize: '2rem', margin: '0'}}>Lay's Classic</h1>
            <p style={{color: 'var(--text-secondary)'}}>Frito-Lay • Snacks</p>
          </div>
          
          <Card hover={false} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div>
              <span style={{color: 'var(--text-secondary)', fontSize: '0.75rem'}}>BARCODE</span>
              <p>028400090859</p>
            </div>
            <div>
              <span style={{color: 'var(--text-secondary)', fontSize: '0.75rem'}}>QR STATUS</span>
              <p className="text-secondary">N/A</p>
            </div>
            <div>
              <span style={{color: 'var(--text-secondary)', fontSize: '0.75rem'}}>BATCH NUMBER</span>
              <p>A29B-492</p>
            </div>
            <div>
              <span style={{color: 'var(--text-secondary)', fontSize: '0.75rem'}}>EXPIRY</span>
              <p>12 DEC 2026</p>
            </div>
          </Card>
          
          <Card hover={false}>
            <h3 style={{fontSize: '1rem', marginBottom: '8px'}}>Ingredients</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Potatoes, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), and Salt.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
