import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './Modules/Auth/SignUp';
import VisualBuilder from './Modules/VisualBuilder/VisualBuilder';
import {MainLayoutWithMenuBar} from './MainLayout'; 
import Ruler from './Modules/Experiment/Ruler';
import { Toaster }from 'react-hot-toast'
import { Provider } from 'react-redux';
import store from './_stores/store';
import './app.theme.scss';

function App() {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(false);

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
          />
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
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
