import React from 'react';
import { Search, Filter, CheckCircle2, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import './History.css';

const History = () => {
  const historyData = [
    { id: 1, name: "Lay's Classic", date: '21 Sep 2026', status: 'genuine', conf: 94, img: 'https://images.unsplash.com/photo-1566478989037-e924e5077977?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: "Unknown Chips", date: '21 Sep 2026', status: 'suspicious', conf: 67, img: 'https://images.unsplash.com/photo-1621551122354-e96737d6eba3?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: "EAGLE Demo Cola", date: '20 Sep 2026', status: 'genuine', conf: 98, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="history-container animate-fade-in">
      <header className="page-header">
        <h2 className="page-title">SCAN HISTORY</h2>
      </header>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>
        <button className="filter-btn">
          <Filter size={18} />
        </button>
      </div>

      <div className="history-list">
        {historyData.map(item => (
          <Card key={item.id} className="history-card" hover={true}>
            <img src={item.img} alt={item.name} className="history-img" />
            <div className="history-info">
              <h4>{item.name}</h4>
              <p className="history-date">{item.date}</p>
            </div>
            <div className="history-result">
              {item.status === 'genuine' ? (
                <>
                  <CheckCircle2 size={16} className="text-success" />
                  <span className="text-success fw-bold">{item.conf}%</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={16} className="text-warning" />
                  <span className="text-warning fw-bold">{item.conf}%</span>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
