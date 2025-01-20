import React from 'react';
import './container.theme.scss';

export default function CardHeader({ title, leftButton }) {
  return (
    <div className="card-header">
      <div className="header-nav-btn-left">{leftButton}</div>
      <div className="header-title">{title}</div>
      <div className="header-nav-btn-right"></div>
    </div>
  );
}
