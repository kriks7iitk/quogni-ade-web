import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './Modules/Auth/SignUp';
import Builder from './Modules/LowCodeBuilder/Builder';
import MainLayout from './MainLayot'; 

function App() {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(true);

  return (
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
      </Routes>
    </Router>
  );
}

export default App;
