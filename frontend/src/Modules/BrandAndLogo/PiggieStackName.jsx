import React from 'react';
import './logo.scss';

export default function PiggieStackName({ firstColor, secondColor, size }) {
  return (
    <div
      className="header-logo"
      style={{ fontSize: size ? `${size}px` : '20px' }}
    >
      <div className="header-text-1" style={{ color: firstColor }}>
        Piggie
      </div>
      <div className="header-text-2" style={{ color: secondColor }}>
        Stack
      </div>
    </div>
  );
}
