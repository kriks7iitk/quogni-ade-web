import React from 'react';

export default function LineChart({
  fill = '#ffffff',
  viewBox = '0 0 32 32',
  width = '30',
}) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      fill="none"
      stroke={fill}
      stroke-width="2"
    >
      <path d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"></path>{' '}
    </svg>
  );
}
