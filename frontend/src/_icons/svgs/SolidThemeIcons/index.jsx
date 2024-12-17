import React from 'react';
import BackIcon from './BackIcon';
import User from './User';
import UserName from './UserName';
import Email from './Email';
// import '../../../_colors/colors.scss';

export default function SolidThemeIcon({ name, ...props }) {
  switch (name) {
    case 'back-1':
      return <BackIcon {...props}></BackIcon>;
      break;
    case 'email':
      return <Email {...props} />;
      break;
    case 'user':
      return <User {...props} />;
    case 'user-name':
      return <UserName {...props} />;
    default:
      break;
  }
}
