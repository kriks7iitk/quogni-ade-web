import React, { useState, useRef } from 'react';
import TimeLineY from './Grid';
import PropTypes from 'prop-types';

const ZoomableGrid = ({ strategyDef, gap }) => {
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
    const [isPanning, setIsPanning] = useState(false);
    const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
    const [transformOrigin, setTransformOrigin] = useState('0 0');
    const gridRef = useRef(null);
  
    // Handle zoom in
    const handleZoomIn = (mouseX, mouseY) => {
      setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Max zoom level 3
      updateTransformOrigin(mouseX, mouseY);
    };
  
    // Handle zoom out
    const handleZoomOut = (mouseX, mouseY) => {
      setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level 0.5
      updateTransformOrigin(mouseX, mouseY);
    };
  
    // Zoom in or out based on wheel event
    const handleZoom = (event) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      const { left, top } = gridRef.current.getBoundingClientRect();
      const mouseX = clientX - left; // Mouse X position relative to the grid container
      const mouseY = clientY - top;  // Mouse Y position relative to the grid container
  
      if (event.deltaY < 0) {
        handleZoomIn(mouseX, mouseY);
      } else {
        handleZoomOut(mouseX, mouseY);
      }
    };
  
    // Update the transform-origin based on mouse position
    const updateTransformOrigin = (mouseX, mouseY) => {
      setTransformOrigin(`${mouseX}px ${mouseY}px`);
    };
  
    // Handle the start of the pan
    const handleMouseDown = (event) => {
      setIsPanning(true);
      setStartCoords({
        x: event.clientX - gridRef.current.scrollLeft,
        y: event.clientY - gridRef.current.scrollTop,
      });
    };
  
    // Handle the pan movement
    const handleMouseMove = (event) => {
      if (isPanning) {
        const x = event.clientX - startCoords.x;
        const y = event.clientY - startCoords.y;
        gridRef.current.scrollLeft = -x;
        gridRef.current.scrollTop = -y;
      }
    };
  
    // Handle pan end
    const handleMouseUp = () => {
      setIsPanning(false);
    };
  
    return (
      <div>
        <div className="zoom-controls">
          <button onClick={() => handleZoomIn(0, 0)}>Zoom In</button>
          <button onClick={() => handleZoomOut(0, 0)}>Zoom Out</button>
        </div>
        <div
          className="grid-container"
          ref={gridRef}
          onWheel={handleZoom} // Zoom with the wheel
          onMouseDown={handleMouseDown} // Start panning
          onMouseMove={handleMouseMove} // Pan with movement
          onMouseUp={handleMouseUp} // Stop panning
          onMouseLeave={handleMouseUp} // Stop panning if mouse leaves
          style={{
            overflow: 'hidden', // Hide overflow, but still allow panning
            width: '100%',
            height: '100%', // Example: fixed height for the main component
            cursor: isPanning ? 'grabbing' : 'grab', // Visual feedback for panning
            position: 'relative',
          }}
        >
          <div
            className="grid"
            style={{
              display: 'grid',
              gap: `${gap}px`,
              transform: `scale(${zoomLevel})`, // Apply zoom level
              transformOrigin: transformOrigin, // Dynamically update based on mouse position
              position: 'absolute', // Allow panning within fixed container
            }}
          >
            {Object.keys(strategyDef).map((key) => {
              const timeLineElement = strategyDef[key];
              return (
                <TimeLineY id={`key_${key}`} key={`key_${key}`}>
                  {timeLineElement?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: '50px',
                        position: 'absolute',
                        left: `${item.position.x}px`,
                        top: `${item.position.y}px`,
                        border: '2px dashed #000',
                        backgroundColor: '#f0f0f0', // Optional: background color for visibility
                      }}
                    >
                      {item.name} ({item.type})
                    </div>
                  ))}
                </TimeLineY>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default ZoomableGrid;

ZoomableGrid.propTypes = {
    strategyDef: PropTypes.any.isRequired,
    gap: PropTypes.number.isRequired,
  };