import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.theme.scss';

export default function CustomSkeleton({ height, count }) {
  return (
    <div className="custom-skeleton-container">
      <Skeleton height={height} count={count} />
    </div>
  );
}
