import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', fullWidth = false, onClick, className = '', ...props }) => {
  const baseClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`;
  
  return (
    <button className={baseClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
