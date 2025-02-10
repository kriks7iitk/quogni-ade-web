import React from 'react';
import Dashboard from './Dashboard';
import Library from './Library';
import Explore from './Explore';
import Community from './Community';
import Wrench from './Wrench';
import Setting from './Settings';
import Performance from './Performace';
import Temp from './Temp';
import Google from './Google';
import LinkedIn from './LinkedIn';
import History from '../SolidThemeIcons/History';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'dashboard':
      return <Dashboard {...props} />;
    case 'analyst-agent':
      return <AnalystAgent {...props} />;
    case 'data-insight-agent':
      return <DataInsightAgent {...props} />;
    case 'event-agent':
      return <EventAgent {...props} />;
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
    case 'history':
      return <History {...props} />
    default:
      return null;
  }
};

export default Icon;
