import React from 'react';
import BackIcon from './BackIcon';
import User from './User';
import UserName from './UserName';
import Email from './Email';
import NextIcon from './NextIcon';
import Search from './Search';
import PositiveUp from './PositiveUp';
import NegativeDown from './NegativeDown';
import NeutralDash from './NeutralDash';
import Minimize from './Minimize';
import Maximize from './Maximize';
import Delete from './Delete';
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
    case 'next':
      return <NextIcon {...props} />;
    case 'user-name':
      return <UserName {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'positive-up':
      return <PositiveUp {...props} />;
    case 'negative-down':
      return <NegativeDown {...props} />;
    case 'neutral-dash':
      return <NeutralDash {...props} />;
    case 'minimize':
      return <Minimize {...props} />;
    case 'maximize':
      return <Maximize {...props} />;
    case 'delete':
      return <Delete {...props} />;
    default:
      break;
  }
}
