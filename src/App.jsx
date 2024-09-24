import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SignUp from './Modules/Auth/SignUp';
import '../src/_styles/theme.scss'
import '../src/_colors/colors.scss';
import { Toaster } from 'react-hot-toast';
import Builder from './Modules/LowCodeBuilder/Builder';
function App() {
  return (
    <div>
    <Router>
      {/* <ConditionalNavbar /> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path="/builder" element={<Builder />} />
        </Routes>
    </Router>
    <Toaster />
    </div>
  );
}

export default App;
