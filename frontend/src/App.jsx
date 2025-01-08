import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
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
import Dashboard from './Modules/Dashboard/Dashboard';
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
import Onboarding from './Modules/Auth/Onboarding';
import SignIn from './Modules/Auth/SignIn';
import OtpVerify from './Modules/Auth/OtpVerify';
import PrivateRoute from './Modules/Routes/PrivateRoute';
import { authorize } from './Utility/authorization';
import AuthCallback from './Modules/Auth/OAuth/AuthCallback';
import { GoogleOAuthProvider } from '@react-oauth/google';
import InfoModal from './Modules/Auth/InfoModal';
import { authenticationService } from './_services';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

function App() {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);
  const [appLoadingState, setAppLoadingState] = useState(true);

  useEffect(() => {
    console.log('hello how are you');
    const performAuthorization = async () => {
      try {
        await authorize();
      } catch (error) {
        console.error('Error during authorization:', error);
      }
    };
    performAuthorization();
    setAppLoadingState(false);
  }, []);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AppContext.Provider value={{ appLoadingState }}>
        <div className="app-container">
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/signup"
                element={
                  <Onboarding>
                    <SignUp />
                  </Onboarding>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <InfoModal
                    isOpen={true}
                    closeModal={false}
                    title="Welcome to Piggie Stack"
                  />
                }
              />
              <Route path="/oauth/callback/:type" element={<AuthCallback />} />
              <Route
                path="/signin"
                element={
                  <Onboarding>
                    <SignIn />
                  </Onboarding>
                }
              />
              <Route
                path="/otp-verify"
                element={
                  <Onboarding>
                    <OtpVerify />
                  </Onboarding>
                }
              />
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
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <MainLayoutWithMenuBar
                      isNavBarExpanded={isNavBarExpanded}
                      setIsNavBarExpanded={setIsNavBarExpanded}
                    >
                      <Dashboard />
                    </MainLayoutWithMenuBar>
                  </PrivateRoute>
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
              <Route
                path="/test_route"
                element={
                  <MainLayoutWithMenuBar
                    isNavBarExpanded={isNavBarExpanded}
                    setIsNavBarExpanded={setIsNavBarExpanded}
                  >
                    <Library />
                  </MainLayoutWithMenuBar>
                }
              />
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
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
