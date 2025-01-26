import React from 'react';

export default function Enter({
  viewBox = '0 0 24 24',
  width = '24',
  fill = '#292929',
}) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4.00018H19V18.0002C19 19.1048 18.1046 20.0002 17 20.0002H9"
        stroke={fill}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{' '}
      <path
        d="M12 15.0002L15 12.0002M15 12.0002L12 9.00018M15 12.0002H5"
        stroke={fill}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{' '}
    </svg>
  );
}
