import React, { useState, createContext, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import './builder.scss';
import { useLocation } from 'react-router-dom';
import DragOverlayWrap from './DragOverlay/DragOverlayWrap';
import BuilderGrid from './DroppableGrid/BuilderGrid';
import { updateDefinition } from '../../_stores/strategy.reducer';
import './DroppableGrid/grid.scss';
import { useSelector, useDispatch } from 'react-redux';
import Inspector from './Inspector/Inspector';
import BuilderHeader from './BuilderHeader/BuilderHeader';
import LeftMenuBar from './LeftMenuBar/LeftMenuBar';
import RightSideTray from './RightSideTray/RightSideTray';
import InspectorProvider from './_contexts/InspectorProvider';
import ComingSoonDawer from './BuilderRoutes/ComingSoonDawer';
import Indicator from './BuilderRoutes/IndicatorComponent/Indicator';

export const VisualBuilderContext = createContext(null);

export default function VisualBuilder() {

  const dispatch = useDispatch();
  const strategyDef = useSelector((state) => state.strategy.data);
  const [activeItem, setActiveItem] = useState(null);
  const [expandSideTray, setExpandSideTray] = useState(false);
  
  const [subRoute, setSubRoute] = useState('builder'); 
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setStrategyDef = (data) => {
    dispatch(updateDefinition(data));
  };

  const gridSize = 10;

  const createSnapModifier = (gridSize) => {
    return ({ transform }) => {
      return {
        ...transform,
        x: Math.ceil(transform.x / gridSize) * gridSize,
        y: Math.ceil(transform.y / gridSize) * gridSize,
      };
    };
  };

  const toggleRightDrawer = () => {
    setExpandSideTray(!expandSideTray);
  };

  const snapToGridModifier = createSnapModifier(gridSize);

  const handleDragStart = (event) => {
    console.log('drag is starting');
    console.log(event);
    
    const { active } = event;
    setActiveItem(active);
  };

  const handleTrayElementDragEnd = ({ over }) => {
    const data = activeItem?.data?.current;
    const newItem = {
      id: `${data?.type}_${over.id}`,
      name: data.name,
      type: data.type,
      position: {
        x: 0,
        y: 0,
      },
    };
    const currentTimeLineState = strategyDef[over.id];
    setStrategyDef({
      ...strategyDef,
      [over.id]: { ...currentTimeLineState, [data.type]: newItem },
    });
  };

  const handleDragEnd = (event) => {
    const { over, delta } = event;
    const data = activeItem?.data?.current;
    const isTrayElement = data?.isTrayElement;

    if (isTrayElement && over && activeItem) {
      handleTrayElementDragEnd({ over, delta });
    }
    setActiveItem(null);
  };

  // useEffect(() => {
  //   setDrawerOpen(subRoute !== 'builder');
  // }, [subRoute]);
  return (
    <div className="builder-layout">
      <div className="bg-red-400 mr-40">
        <ComingSoonDawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          subRoute={subRoute}
        >
          {/* Render dynamic content inside the drawer based on subRoute */}
          {subRoute === 'indicators' && <Indicator />}
          {subRoute === 'line-chart' && <div>Line Chart Content</div>}
          {subRoute === 'filter-options' && <div>Filter Options Content</div>}
          {subRoute === 'performance' && <div>Performance Content</div>}
          {subRoute === 'settings' && <div>Settings Content</div>}
        </ComingSoonDawer>
      </div>
      <VisualBuilderContext.Provider
        value={{
          expandSideTray,
          setExpandSideTray,
          toggleRightDrawer,
          subRoute,
          setSubRoute,
          setDrawerOpen,
        }}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[snapToGridModifier]}
        >
          <BuilderHeader />
          <div className="horizontal-layout">
            <LeftMenuBar />
            <InspectorProvider>
              <div className="vertical-layout">
                {subRoute === 'builder' && (
                  <div className="editor-class">
                    <BuilderGrid
                      strategyDef={strategyDef}
                      gridSize={gridSize}
                      setStrategyDef={setStrategyDef}
                    />
                  </div>
                )}
                <Inspector />
              </div>
              <RightSideTray />
            </InspectorProvider>
          </div>
          {activeItem && <DragOverlayWrap draggedItem={activeItem} />}
        </DndContext>
      </VisualBuilderContext.Provider>
    </div>
  );
}
