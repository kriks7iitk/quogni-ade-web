import React, {useState, useRef, useEffect} from 'react';
import './ruler.scss'


export function Ruler({ orientation, zoomLevel }) {
    const [size, setSize] = useState(0);
    const rulerRef = useRef(null);
    const tickSpacing = 19*zoomLevel; // Adjust tick spacing based on zoom level
    
    // Create tick marks based on the size of the grid
    

    useEffect(() => {
        // Get the size of the parent container dynamically
        const updateSize = () => {
          if (rulerRef.current) {
            const newSize = orientation === 'horizontal' ? rulerRef.current.offsetWidth : rulerRef.current.offsetHeight;
            setSize(newSize);
          }
        };
        
        
        updateSize();
        
        // Recalculate size on window resize
        window.addEventListener('resize', updateSize);
        
        // Cleanup listener on unmount
        return () => {
          window.removeEventListener('resize', updateSize);
        };
      }, [orientation,zoomLevel]);
  
    return (
      <div
        ref={rulerRef}
        className={`ruler ruler-${orientation}`}
        style={{
          [orientation === 'horizontal' ? 'width' : 'height']: `100%`,
          [orientation === 'horizontal' ? 'height' : 'width']: '20px',
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row-reverse' : 'column--reverse',
          justifyContent: 'flex-end',
          gap:`${tickSpacing}px`
        }}
        
      >
      </div>
    );
  }
  