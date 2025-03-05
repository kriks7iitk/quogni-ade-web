import React from 'react';

export default function Add({
  width = '24',
  viewBox = '0 0 24 24',
  fill = '#000000',
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M12 4V20"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{' '}
    </svg>
  );
}
