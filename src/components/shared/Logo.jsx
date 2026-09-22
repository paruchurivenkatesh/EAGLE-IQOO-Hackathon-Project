import React from 'react';

const Logo = ({ size = 'normal', monochrome = false, iconOnly = false }) => {
  const width = size === 'large' ? 120 : size === 'small' ? 24 : 40;
  const height = size === 'large' ? 120 : size === 'small' ? 24 : 40;
  const color = monochrome ? 'currentColor' : 'var(--accent-primary)';

  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric Eagle + Letter E representation */}
        <path 
          d="M10 50L40 10L90 10L60 50L90 90L40 90L10 50Z" 
          fill={color}
          opacity="0.2"
        />
        <path 
          d="M30 50L50 25L80 25L60 50L80 75L50 75L30 50Z" 
          fill={color} 
        />
        <circle cx="65" cy="40" r="4" fill="var(--bg-primary)" />
      </svg>
      {!iconOnly && (
        <span style={{ 
          fontFamily: 'var(--font-family)', 
          fontWeight: 800, 
          fontSize: size === 'large' ? '2.5rem' : size === 'small' ? '1rem' : '1.5rem',
          letterSpacing: '0.05em',
          color: monochrome ? 'inherit' : 'var(--text-primary)'
        }}>
          EAGLE
        </span>
      )}
    </div>
  );
};

export default Logo;
