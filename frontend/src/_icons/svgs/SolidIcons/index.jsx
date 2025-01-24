import React from 'react';
import Dashboard from './Dashboard';
import PiggieStackWhite from './PiggieStackWhite';
import Portfolio from './Portfolio';
import MarketPlace from './MarketPlace';
import Library from './Library';
import Explore from './Explore';
import Builder from './Builder';
import Community from './Community';
import Wrench from './Wrench';
import Setting from './Settings';
import BackTest from './BackTest';
import Performance from './Performace';
import Screener from './Screener';
import LineChart from './LineChart';
import Temp from './Temp';
import Google from './Google';
import LinkedIn from './LinkedIn';
import BookMark from './BookMark';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'dashboard':
      return <Dashboard {...props} />;
    case 'piggie-white':
      return <PiggieStackWhite {...props} />;
    case 'portfolio':
      return <Portfolio {...props} />;
    case 'google':
      return <Google {...props} />;
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
    case 'wrench':
      return <Wrench {...props} />;
    case 'setting':
      return <Setting {...props} />;
    case 'back-test':
      return <BackTest {...props} />;
    case 'performance':
      return <Performance {...props} />;
    case 'filter':
      return <Filter {...props} />;
    case 'line-chart':
      return <LineChart {...props} />;
    case 'linkedin':
      return <LinkedIn {...props} />;
    case 'test_route':
      return <Temp {...props} />;
    case 'bookmark-square':
      return <BookMark {...props} />;
    case 'screener':
      return <Screener {...props} />;
    default:
      return null;
  }
};

export default Icon;
