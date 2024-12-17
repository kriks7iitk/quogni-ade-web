import React from 'react';
import './Loader.scss'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Please wait...</p>
    </div>
  );
};

export default Loader;
