import React from 'react';

export default function NegativeDown({
  viewBox = '0 0 16 16',
  fill = 'var(--red-500)',
  width = '20',
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill={fill}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 6L8 14L16 6V4H0V6Z" fill={fill}></path>
    </svg>
  );
}
