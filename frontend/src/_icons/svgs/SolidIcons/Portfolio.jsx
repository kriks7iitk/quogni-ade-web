import React from 'react';

export default function Portfolio({
  fill = '#ffffff',
  viewBox = '0 0 30 30',
  width = '30',
}) {
  return (
    <svg
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
    >
      <path
        stroke={fill}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="12"
        d="M41.592 45.843A74 74 0 0 1 170 96v0A74 74 0 1 1 28.636 65.372"
      ></path>
      <path
        stroke={fill}
        stroke-linecap="round"
        stroke-width="12"
        d="m29.326 64.312 47.515 23.23"
      ></path>
      <path
        stroke={fill}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="12"
        d="M96 116.714c11.44 0 20.714-9.274 20.714-20.714S107.44 75.286 96 75.286 75.286 84.56 75.286 96 84.56 116.714 96 116.714Z"
      ></path>
    </svg>
  );
}
