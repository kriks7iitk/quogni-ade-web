import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { NavBar } from './Modules/Navigation/NavBar/NavBar';

export const MainLayoutWithMenuBar = ({
  isNavBarExpanded,
  setIsNavBarExpanded,
  children,
}) => {
  return (
    <div style={{ display: 'flex', flexGrow: '1', height: '100%' }}>
      <NavBar
        isExpanded={isNavBarExpanded}
        setIsExpanded={setIsNavBarExpanded}
      />
      <div
        className="main-layout"
        style={{
          marginLeft: isNavBarExpanded ? '250px' : '60px',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

MainLayoutWithMenuBar.propTypes = {
  isNavBarExpanded: PropTypes.bool.isRequired,
  setIsNavBarExpanded: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
