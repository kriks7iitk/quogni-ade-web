import React from 'react';

export default function Search({
  fill = '#000000',
  viewBox = '0 0 24 24',
  width = '24',
}) {
  return (
    <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height={width} fill="none"></rect>
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="#000000"
        stroke-linejoin="round"
      ></circle>{' '}
      <path
        d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
        fill={fill}
      ></path>
      {/* <defs>
        {' '}
        <clipPath id="clip0_15_152">
          {' '}
          <rect width={width} height={width} fill="white"></rect>{' '}
        </clipPath>{' '}
      </defs>{' '} */}
    </svg>
  );
}
