import React, { useState, useRef, useEffect, useContext } from 'react';
import { ResizableBox } from 'react-resizable';
import './inspector.scss';
import 'react-resizable/css/styles.css';
import InspectorHeader from './InspectorComponents/InspectorHeader';
import { InspectorContext } from '../_contexts/InspectorProvider';
import { VisualBuilderContext } from '../VisualBuilder';

export default function Inspector() {
  const { subRoute, setSubRoute, setExpandSideTray } =
    useContext(VisualBuilderContext);
  const COLLAPSED_HEIGHT = 51;
  const EXPANDED_HEIGHT = 300;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(2000);
  const { setInspectorHeight, inspectorHeight } = useContext(InspectorContext);

  const containerRef = useRef(null);

  const onResizeStart = () => {
    setIsDragging(true);
  };

  const onResizeStop = () => {
    setIsDragging(false);
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
    console.log(subRoute);

    if (subRoute === 'back-test') setSubRoute('builder');
    setExpandSideTray(false);
    if (subRoute === 'back-test') {
      setIsCollapsed(false);
      setInspectorHeight(EXPANDED_HEIGHT);
    } else {
      setIsCollapsed((prev) => !prev);
      setInspectorHeight(isCollapsed ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);
    }
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
    console.log('subroute ', subRoute);
  }, [subRoute]);
  return (
    <div
      className={`bg-[#F3F4F8] drawer-container border-t-2 ${isDragging ? 'border-[#c7fc94]' : 'border-[#0b1644]'} bottom-0`}
      style={{
        height: '100%',
        transition: 'height 0.5s ease',
        overflow: 'hidden',
      }}
    >
      <ResizableBox
        className="resizable-box"
        height={inspectorHeight}
        minConstraints={[width, COLLAPSED_HEIGHT]}
        maxConstraints={[width, 500]}
        onResize={handleResize}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        axis="y"
        resizeHandles={subRoute === 'back-test' ? [] : ['n']}
        // handle={(h) => <span className="resize-handle" onMouseDown={h.onMouseDown} onTouchStart={h.onTouchStart} />}
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
          />
        </div>
      </ResizableBox>
    </div>
  );
}
