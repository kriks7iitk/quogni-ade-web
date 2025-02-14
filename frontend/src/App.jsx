import {
  BrowserRouter as Router,
} from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import './app.theme.scss';
import 'driver.js/dist/driver.css';
import { authorize } from './Utility/authorization';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './Modules/Platform/Navigation/AppRouter';

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
            <AppRouter/>
          </Router>
          <Toaster />
        </div>
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
