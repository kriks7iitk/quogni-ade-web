import React from 'react';

export default function BackIcon({ fill = '#000000', viewBox = '0 0 24 24', width = '20' }) {
  return (
    <svg
      fill={fill}
      height={width}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <g id="back">
          {' '}
          <g>
            {' '}
            <polygon points="17.2,23.7 18.6,22.3 8.3,12 18.6,1.7 17.2,0.3 5.5,12 "></polygon>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}

