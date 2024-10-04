import React, {useState} from 'react'
import { ResizableBox } from 'react-resizable';
import './inspector.scss'
import 'react-resizable/css/styles.css'; // Import styles for resizable

export default function Inspector({ onResize }){
    const [height, setHeight] = useState(200); // Initial height of the drawer
  
    const handleResize = (event, { size }) => {
        
      setHeight(size.height); // Update the height based on the resize
      onResize(size.height); // Call the onResize function to inform parent
    };
  
    return (
      <div className="drawer-container">
        <ResizableBox
                width={300} // Set a fixed or calculated width here
                height={height}
                minConstraints={[100, 100]} // Minimum size constraints
                maxConstraints={[300, 500]} // Maximum size constraints
                onResize={handleResize}
                axis="y" // Restrict resizing to the vertical axis
                resizeHandles={['n']} // Change to 'n' for the handle to be on the top
                // handle={(h) => <span className="resize-handle" onMouseDown={h.onMouseDown} onTouchStart={h.onTouchStart} />}
            >
                <div className="inspector" style={{ height: `${height}px` }}>
                    {/* Drawer content goes here */}
                    <h3>Inspector Drawer</h3>
                    <p>Content goes here...</p>
                </div>
            </ResizableBox>
      </div>
    );
  };
  
