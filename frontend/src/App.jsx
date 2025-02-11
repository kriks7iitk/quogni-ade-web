import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import SignUp from './Modules/Auth/SignUp';
import { Toaster } from 'react-hot-toast';
import './app.theme.scss';
import 'driver.js/dist/driver.css';
import Builder from './Modules/Builder/Builder';
import Onboarding from './Modules/Auth/Onboarding';
import SignIn from './Modules/Auth/SignIn';
import OtpVerify from './Modules/Auth/OtpVerify';
import PrivateRoute from './Modules/Routes/PrivateRoute';
import { authorize } from './Utility/authorization';
import AuthCallback from './Modules/Auth/OAuth/AuthCallback';
import { GoogleOAuthProvider } from '@react-oauth/google';
import InfoModal from './Modules/Auth/InfoModal';
import Dashboard from './Modules/Dashboard/Dashboard';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

function App() {
  const [appLoadingState, setAppLoadingState] = useState(true);

  useEffect(() => {
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
                  <PrivateRoute>
                      <Builder />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard/>
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
