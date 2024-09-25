import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { NavBar } from './Modules/Navigations/NavBar/NavBar';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ isNavBarExpanded, setIsNavBarExpanded, children }) => {
  return (
    <div style={{ display: 'flex' , flexGrow:'1'}}>
      {/* NavBar component */}
      <NavBar isExpanded={isNavBarExpanded} setIsExpanded={setIsNavBarExpanded} />
      
      {/* Main content that adjusts dynamically */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: isNavBarExpanded ? '250px' : '75px',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {children} {/* Render the actual route content here */}
      </div>
      <Toaster />
    </div>
  );
};

// Define PropTypes for MainLayout
MainLayout.propTypes = {
  isNavBarExpanded: PropTypes.bool.isRequired, // Boolean, required
  setIsNavBarExpanded: PropTypes.func.isRequired, // Function, required
  children: PropTypes.node.isRequired, // Renderable content, required
};

export default MainLayout;
