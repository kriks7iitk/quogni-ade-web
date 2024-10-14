import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SignUp from './Modules/Auth/SignUp';
import VisualBuilder from './Modules/VisualBuilder/VisualBuilder';
import { MainLayoutWithMenuBar } from './MainLayout';
import Ruler from './Modules/Experiment/Ruler';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './_stores/store';
import './app.theme.scss';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { step1 } from './Utility/DriverSteps';
import Dashboard from './Modules/Routes/Dashboard/Dashboard';
import Portfolio from './Modules/Routes/Portfolio/Portfolio';
import Library from './Modules/Routes/Library/Library';
import MarketPlace from './Modules/Routes/MarketPlace/MarketPlace';
import Explore from './Modules/Routes/Explore/Explore';
import Community from './Modules/Routes/Community/Community';
import Indicator from './Modules/VisualBuilder/BuilderRoutes/IndicatorComponent/Indicator';
import Backtest from './Modules/VisualBuilder/BuilderRoutes/BacktestComponent/Backtest';
import Performance from './Modules/VisualBuilder/BuilderRoutes/PerformanceComponent/Performance';
import StrategySettings from './Modules/VisualBuilder/BuilderRoutes/StrategySettingsComponent/StrategySettings';
import Filter from './Modules/VisualBuilder/BuilderRoutes/FilterComponent/Filter';
import LineChart from './Modules/VisualBuilder/BuilderRoutes/LineChartComponent/LineChart';


function App() {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);

  useEffect(() => {

    const driverObj = driver({
      showProgress: true,
      steps: step1,
      allowClose: true,
      allowInteractions: true,
    });
    if(window.location.pathname === '/builder/back-test'){
      driverObj.drive();
    }
   
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/builder"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Provider store={store}>
                  <VisualBuilder />
                </Provider>
              </MainLayoutWithMenuBar>
            }
          >
            <Route path="indicators" element={<Indicator />} />
            <Route path="line-chart" element={<LineChart />} />
            <Route path="filter" element={<Filter />} />
            <Route path="back-test" element={<Backtest />} />
            <Route path="performance" element={<Performance />} />
            <Route path="settings" element={<StrategySettings />} />
          </Route>
          <Route
            path="/experiment"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Ruler />
              </MainLayoutWithMenuBar>
            }
          />
          <Route
            path="/"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Dashboard />
              </MainLayoutWithMenuBar>
            }
          />
          <Route
            path="/portfolio"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Portfolio />
              </MainLayoutWithMenuBar>
            }
          />
          <Route
            path="/library"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Library />
              </MainLayoutWithMenuBar>
            }
          />
          <Route path="/test-route"  element={
            <h1>Testing</h1>
            }> Test Rute</Route>
          <Route
            path="/market-place"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <MarketPlace />
              </MainLayoutWithMenuBar>
            }
          />
          <Route
            path="/community"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Community />
              </MainLayoutWithMenuBar>
            }
          />
          <Route
            path="/explore"
            element={
              <MainLayoutWithMenuBar
                isNavBarExpanded={isNavBarExpanded}
                setIsNavBarExpanded={setIsNavBarExpanded}
              >
                <Explore />
              </MainLayoutWithMenuBar>
            }
          />
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
