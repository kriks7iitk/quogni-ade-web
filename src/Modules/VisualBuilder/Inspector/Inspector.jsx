import React, { useState, useRef, useEffect, useContext } from 'react';
import { ResizableBox } from 'react-resizable';
import './inspector.scss';
import 'react-resizable/css/styles.css';
import InspectorHeader from './InspectorComponents/InspectorHeader';
import { InspectorContext } from '../_contexts/InspectorProvider';
import lineData from '../../../assets/candelstick_data';
import CandlestickChart from './InspectorComponents/Candlestick/CandlestickChart';
import LineChart from './InspectorComponents/LineChart/LineChart';

export default function Inspector() {
  const COLLAPSED_HEIGHT = 51;
  const EXPANDED_HEIGHT = 1000;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(window.outerWidth-200);
  const { setInspectorHeight, inspectorHeight } = useContext(InspectorContext);

  const initialTabs = ['Strategy1']; // Initial tabs
  const [tabs, setTabs] = useState(initialTabs); // State to store the tabs
  const [activeTab, setActiveTab] = useState(initialTabs[0]); 

  const containerRef = useRef(null);

  const onResizeStart = () => {
    setIsDragging(true);
  };

  const onResizeStop = () => {
    setIsDragging(false);
  };

  const handleResize = (event, { size }) => {
    const newHeight = size.height;
    if (inspectorHeight <= 1000) setInspectorHeight(newHeight);
    if (newHeight > COLLAPSED_HEIGHT) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };
  const toggleDrawer = () => {
    setIsCollapsed((prev) => !prev);
    setInspectorHeight(isCollapsed ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);
  };

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }

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

  console.log("height of the inspector",inspectorHeight)
  console.log("width of the inspector",width)
  return (
    <div
      className={`bg-[#F3F4F8] drawer-container border-t-2 ${isDragging ? 'border-[#c7fc94]' : 'border-[#0b1644]'} bottom-0`}
    >
      <ResizableBox
        height={inspectorHeight}
        minConstraints={[width, COLLAPSED_HEIGHT]}
        maxConstraints={[width, 500]}
        onResize={handleResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        axis="y"
        resizeHandles={['n']}
      >
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          <InspectorHeader
            toggleDrawer={toggleDrawer}
            isCollapsed={isCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            setTabs={setTabs}
          />
          {!isCollapsed && (
            <div ref={containerRef} className="inspector-content">
              <div>
                <div>
                   {activeTab === 'Strategy1' && (
                    <div className='w-full h-full flex justify-center items-center p-5 '>
                    <LineChart data={lineData} width={width} height={inspectorHeight} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </ResizableBox>
    </div>
  );
}
