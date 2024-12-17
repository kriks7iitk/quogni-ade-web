import React from 'react';

export default function Library({
  fill = '#ffffff',
  viewBox = '0 0 24 24',
  width = '24',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {' '}
      <path d="M16 6l4 14"></path> <path d="M12 6v14"></path>{' '}
      <path d="M8 8v12"></path> <path d="M4 4v16"></path>{' '}
    </svg>
  );
}
