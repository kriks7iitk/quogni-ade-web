import React from 'react';

export default function Filter({
  fill = '#ffffff',
  viewBox = '0 0 20 20',
  width = '30',
}) {
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M0 3H16V1H0V3Z" fill={fill}></path>{' '}
      <path d="M2 7H14V5H2V7Z" fill={fill}></path>{' '}
      <path d="M4 11H12V9H4V11Z" fill={fill}></path>{' '}
      <path d="M10 15H6V13H10V15Z" fill={fill}></path>{' '}
    </svg>
  );
}
