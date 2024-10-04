import React from 'react';

export default function PiggieStackWhite({
  fill = '#000000',
  viewBox = '0 0 16 16',
  width = '16',
}) {
  return (
    <svg
      fill={fill}
      viewBox={viewBox}
      width={width}
      height={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10l8 4 8-4v2l-8 4-8-4v-2zm0-4l8 4 8-4v2l-8 4-8-4V6zm8-6l8 4-8 4-8-4 8-4z"
        fillRule="evenodd"
      />
    </svg>
  );
}
