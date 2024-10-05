import React, { useState, useRef, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import './inspector.scss';
import 'react-resizable/css/styles.css'; // Import styles for resizable
import InspectorHeader from './InspectorComponents/InspectorHeader';

export default function Inspector({ onResize }) {
  const COLLAPSED_HEIGHT = 50; // Height at which the drawer is considered collapsed
  const EXPANDED_HEIGHT = 300;
  const [height, setHeight] = useState(EXPANDED_HEIGHT); // Initial height of the drawer
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(2000); // Set initial width of the ResizableBox

  const containerRef = useRef(null);

  const onResizeStart = () => {
    setIsDragging(true);
  };

  // Detect when resizing stops
  const onResizeStop = () => {
    setIsDragging(false);
  };

  const handleResize = (event, { size }) => {
    const newHeight = size.height;
    setHeight(newHeight); // Update the height based on the resize
    onResize(newHeight); // Call the onResize function to inform parent

    console.log('onResize triggered');
    if (newHeight > COLLAPSED_HEIGHT) {
      setIsCollapsed(false); // Drawer is expanded
    } else {
      setIsCollapsed(true); // Drawer is collapsed
    }
  };
  const toggleDrawer = () => {
    setIsCollapsed((prev) => !prev); // Toggle the collapsed state
    setHeight(isCollapsed ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);
  };
  // Set the width of the resizable box to the parent container's width
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }

    // Add a resize event listener to update the width dynamically
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`bg-[#F3F4F8] drawer-container border-t-2 ${isDragging?'border-[#c7fc94]':'border-[#0b1644]'} fixed left-15 bottom-0`}>
      <ResizableBox
        width={width} // Set a fixed or calculated width here
        height={height}
        minConstraints={[width, COLLAPSED_HEIGHT]} // Minimum size constraints
        maxConstraints={[width, 500]} // Maximum size constraints
        onResize={handleResize}
        onResizeStart={onResizeStart} // Handle resize start
        onResizeStop={onResizeStop} // Handle resize stop
        axis="y" // Restrict resizing to the vertical axis
        resizeHandles={['n']} // Change to 'n' for the handle to be on the top
        // handle={(h) => <span className="resize-handle" onMouseDown={h.onMouseDown} onTouchStart={h.onTouchStart} />}
      >
        <div
          style={{
            height: `${height}px`,
            overflow: 'hidden',
            position: 'relative',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          

          {!isCollapsed && (
            <InspectorHeader toggleDrawer={toggleDrawer} isCollapsed={isCollapsed} />
          )}

          {/* Collapsed content */}
          {isCollapsed && (
            <InspectorHeader toggleDrawer={toggleDrawer} isCollapsed={isCollapsed} />
          )}
        </div>
      </ResizableBox>
    </div>
  );
}
