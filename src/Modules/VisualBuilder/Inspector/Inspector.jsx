import React, { useState, useRef, useEffect, useContext } from 'react';
import { ResizableBox } from 'react-resizable';
import './inspector.scss';
import 'react-resizable/css/styles.css';
import InspectorHeader from './InspectorComponents/InspectorHeader';
import { InspectorContext } from '../_contexts/InspectorProvider';
import { VisualBuilderContext } from '../VisualBuilder';
import lineData from '../../../assets/candelstick_data';
import LineChart from './InspectorComponents/LineChart/LineChart';
import { useNavigate } from 'react-router-dom';
import Chart from './InspectorComponents/LineChart/Chart';

export default function Inspector() {
  const { subRoute, setSubRoute, setExpandSideTray } =
    useContext(VisualBuilderContext);
  const COLLAPSED_HEIGHT = 51;
  const drawerRef = useRef(null);
  const EXPANDED_HEIGHT = 300;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { setInspectorHeight, inspectorHeight } = useContext(InspectorContext);
  const [parentHeight, setParentHeight] = useState(0);

  const initialTabs = ['Strategy1']; // Initial tabs
  const [tabs, setTabs] = useState(initialTabs); // State to store the tabs
  const [activeTab, setActiveTab] = useState(initialTabs[0]);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const onResizeStart = () => {
    setIsDragging(true);
  };

  const onResizeStop = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    computeWidth();
    window.addEventListener('resize', computeWidth);
    return () => {
      window.removeEventListener('resize', computeWidth);
    };
  }, []);
  const computeWidth = () => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.clientWidth; // Get the parent's width
      setWidth(parentWidth); // Update the state with the new width
    }
  };

  const handleResize = (event, { size }) => {
    if (subRoute === 'back-test') return;

    const newHeight = size.height;
    if (inspectorHeight <= 500) setInspectorHeight(newHeight);
    if (newHeight > COLLAPSED_HEIGHT) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  };
  const toggleDrawer = () => {
    if (subRoute === 'back-test') {
      setSubRoute('builder');
      navigate('/builder');
      setIsCollapsed(true);
      setExpandSideTray(false);
      setTabs([])
      console.log('subRoute === back-test')
      setIsCollapsed(false);
      setInspectorHeight(EXPANDED_HEIGHT);
    }
    if (subRoute === 'back-test') {
      
    } else {
      setIsCollapsed((prev) => !prev);
      setInspectorHeight(isCollapsed ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);
    }
  };

  useEffect(() => {
    // Function to update the parent's height dynamically
    const updateParentHeight = () => {
      if (drawerRef.current) {
        setParentHeight(drawerRef.current.clientHeight);
      }
    };

    // Update parent height initially and on window resize
    updateParentHeight();
    window.addEventListener('resize', updateParentHeight);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateParentHeight);
    };
  }, [subRoute]);
  return (
    <div
      className={`bg-[#F3F4F8] drawer-container border-t-2 ${isDragging ? 'border-[#c7fc94]' : 'border-[#0b1644]'} bottom-0`}
      style={{
        height: '100%',
        transition: 'height 0.5s ease',
        width: '100%',
        overflow: 'hidden',
      }}
      ref={drawerRef}
    >
      <ResizableBox
        className="resizable-box"
        height={subRoute == 'back-test' ? parentHeight : inspectorHeight}
        minConstraints={[width, COLLAPSED_HEIGHT]}
        maxConstraints={[width, 500]}
        onResize={handleResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        axis="y"
        resizeHandles={subRoute === 'back-test' ? [] : ['n']}
      >
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            transition: 'height 0.3s ease-in-out',
            height: '100%',
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
          {/* {subRoute == 'back-test' && (
            <div ref={containerRef} className="inspector-content">
              {activeTab === 'Strategy1' && (
                <div
                  className="w-full h-full flex justify-center items-center p-5 "
                  ref={parentRef}
                >
                  <LineChart
                    data={lineData}
                    width={width}
                    height={parentHeight - 100}
                  />
                </div>
              )}
            </div>
          )} */}
          {subRoute == 'back-test' && (
            <Chart chartData={lineData} height={parentHeight - 100} />
          )}
        </div>
      </ResizableBox>
    </div>
  );
}
