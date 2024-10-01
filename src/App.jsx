import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './Modules/Auth/SignUp';
import Builder from './Modules/LowCodeBuilder/Builder';
import MainLayout from './MainLayot'; 
import Ruler from './Modules/Experiment/Ruler';

function App() {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(true);

  return (
    <div className='app-container'>
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
              <SignUp />
          }
        />
        <Route
          path="/builder"
          element={
            <MainLayout isNavBarExpanded={isNavBarExpanded} setIsNavBarExpanded={setIsNavBarExpanded}>
              <Builder />
            </MainLayout>
          }
        />
        <Route
          path="/experiment"
          element={
            <MainLayout isNavBarExpanded={isNavBarExpanded} setIsNavBarExpanded={setIsNavBarExpanded}>
              <Ruler/>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
