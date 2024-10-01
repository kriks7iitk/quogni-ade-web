import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Candle() {

  const style = {
    width: '20px',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid black'  // Add border property here
  };

  return (
    <div style={style}>
    </div>
  );
}

Candle.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,  // Validate 'children' as a React node
};
