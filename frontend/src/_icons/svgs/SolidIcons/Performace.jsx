import React from 'react';

export default function Performance({
  fill = '#ffffff',
  viewBox = '0 0 20 20',
  width = '30',
}) {
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" fill={fill}>
      <rect x="0" fill="none" width={width} height={width}></rect>{' '}
      <path d="M3.76 17.01h12.48C17.34 15.63 18 13.9 18 12c0-4.41-3.58-8-8-8s-8 3.59-8 8c0 1.9.66 3.63 1.76 5.01zM9 6c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zM4 8c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm4.52 3.4c.84-.83 6.51-3.5 6.51-3.5s-2.66 5.68-3.49 6.51c-.84.84-2.18.84-3.02 0-.83-.83-.83-2.18 0-3.01zM3 13c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1z"></path>{' '}
    </svg>
  );
}
