import React from 'react';
import BackIcon from './BackIcon';
// import '../../../_colors/colors.scss';

export default function SolidThemeIcon({ name, ...props }) {
  switch (name) {
    case 'back-1':
      return <BackIcon {...props}></BackIcon>;
      break;
    default:
      break;
  }
}
