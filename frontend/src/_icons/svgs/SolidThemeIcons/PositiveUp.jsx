import React from 'react';

export default function PositiveUp({ viewBox = '0 0 20 20', fill = '#088F8F', width = '20' }) {
  return (
    <svg
      viewBox={viewBox}
      fill={fill}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10L8 2L16 10V12H0V10Z" fill={fill}></path>{' '}
    </svg>
  );
}
