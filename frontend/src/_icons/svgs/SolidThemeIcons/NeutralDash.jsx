import React from 'react';

export default function NeutralDash({
  viewBox = '0 0 25 25',
  fill = 'var(--orange-200)',
  width = '25',
}) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      width={width}
      height={width}
    >
      <path
        d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"
        fill={fill}
      ></path>{' '}
    </svg>
  );
}
