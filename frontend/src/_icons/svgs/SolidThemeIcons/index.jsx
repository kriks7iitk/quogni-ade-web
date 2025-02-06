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
import Copy from './Copy';
import History from './History';
import Enter from './Enter';
import Add from './Add';
import Dashboard from './Dashboard';

export default function SolidThemeIcon({ name, ...props }) {
  switch (name) {
    case 'back-1':
      return <BackIcon {...props}></BackIcon>;
    case 'dashboard':
      return <Dashboard {...props} />;
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
    case 'enter':
      return <Enter {...props} />;
    case 'positive-up':
      return <PositiveUp {...props} />;
    case 'plus':
      return <Add {...props} />;
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
    case 'copy':
      return <Copy {...props} />;
    case 'history':
      return <History {...props} />;
    default:
      break;
  }
}
