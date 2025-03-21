import React from 'react';

export default function Maximize({ viewBox = '0 0 24 24', fill = '#1C274C' , width = '24'}) {
  return (
    <svg
      viewBox={viewBox}
      fill={fill}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          opacity="0.6"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.39286 15C2.39286 14.5858 2.72864 14.25 3.14286 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V20.8571C9.75 21.2714 9.41421 21.6071 9 21.6071C8.58579 21.6071 8.25 21.2714 8.25 20.8571V16.8107L2.53033 22.5303C2.23744 22.8232 1.76256 22.8232 1.46967 22.5303C1.17678 22.2374 1.17678 21.7626 1.46967 21.4697L7.18934 15.75H3.14286C2.72864 15.75 2.39286 15.4142 2.39286 15Z"
          fill="#1C274C"
        ></path>{' '}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.6071 9C21.6071 9.41421 21.2714 9.75 20.8571 9.75H15C14.5858 9.75 14.25 9.41421 14.25 9V3.14286C14.25 2.72864 14.5858 2.39286 15 2.39286C15.4142 2.39286 15.75 2.72864 15.75 3.14286V7.18934L21.4697 1.46967C21.7626 1.17678 22.2374 1.17678 22.5303 1.46967C22.8232 1.76256 22.8232 2.23744 22.5303 2.53033L16.8107 8.25H20.8571C21.2714 8.25 21.6071 8.58579 21.6071 9Z"
          fill="#1C274C"
        ></path>{' '}
      </g>
    </svg>
  );
}
