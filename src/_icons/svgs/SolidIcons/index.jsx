import React from 'react';
import Dashboard from './Dashboard';
import PiggieStackWhite from './PiggieStackWhite';
import Portfolio from './Portfolio';
import MarketPlace from './MarketPlace';
import Library from './Library';
import Explore from './Explore';
import Builder from './Builder';
import Community from './Community';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'dashboard':
      return <Dashboard {...props} />;
    case 'piggie-white':
      return <PiggieStackWhite {...props} />;
    case 'portfolio':
      return <Portfolio {...props} />;
    case 'market-place':
      return <MarketPlace {...props} />;
    case 'library':
      return <Library {...props} />;
    case 'explore':
      return <Explore {...props} />;
    case 'builder':
      return <Builder {...props} />;
    case 'community':
      return <Community {...props} />;
    default:
      return null;
  }
};

export default Icon;
