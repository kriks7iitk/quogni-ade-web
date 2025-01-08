import React from 'react';

export default function NextIcon({
  fill = '#000000',
  viewBox = '0 0 24 24',
  width = '20',
}) {
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
        <g id="next">
          {' '}
          <g>
            {' '}
            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}
