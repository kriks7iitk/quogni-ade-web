import React, { useState, createContext, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import './builder.scss';
import { useNavigate } from 'react-router-dom';
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
import { InspectorContext } from './_contexts/InspectorProvider';
import {
  updateData,
  updateLoadingState,
  updateBackButtonState,
  updateTitleState,
  updateRightDrawerJourneyState,
  fetchSignal,
} from '../../_stores/right-drawer.reducer';
import toast from 'react-hot-toast';

export const VisualBuilderContext = createContext(null);

export default function VisualBuilder() {
  const dispatch = useDispatch();
  // const strategyDef = useSelector((state) => state.strategy.data);
  const [strategyDef, setStrategyDef] = useState({ 1: [], 2: [] });
  const [activeItem, setActiveItem] = useState(null);
  const [expandSideTray, setExpandSideTray] = useState(false);
  const [tabs, setTabs] = useState(['Strategy1']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [subRoute, setSubRoute] = useState('back-test');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // const setStrategyDef = (data) => {
  //   dispatch(updateDefinition(data));
  // };
  const selectedOption = useSelector(
    (state) => state?.rightDrawerData?.selectedStock,
  );

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

  useEffect(() => {
    setSubRoute('back-test');
    navigate('/builder/back-test');
    setExpandSideTray(true);
    dispatch(updateTitleState('Strategy list'));
  }, [VisualBuilderContext]);

  const toggleRightDrawer = () => {
    setExpandSideTray(!expandSideTray);
  };

  const snapToGridModifier = createSnapModifier(gridSize);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(active);
    console.log('drag start');

    console.log(active);
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

  const handleBackTestDropEvent = (name) => {
    if (!selectedOption) {
      toast.error('Please select stock for run back testing');
      return;
    }
    console.log('name is');
    console.log(name);

    dispatch(updateLoadingState(true));
    dispatch(updateTitleState('Strategy performance'));
    dispatch(updateBackButtonState(true));
    dispatch(updateRightDrawerJourneyState('back-test-performance'));
    dispatch(fetchSignal({ stock: selectedOption, strategyName: name }));
  };

  const handleDragEnd = (event) => {
    const { over, delta } = event;
    const data = activeItem?.data?.current;
    const isTrayElement = data?.isTrayElement;
    const strategyName = data?.name;

    const isBackTestTrayItem = data?.isBackTestTrayItem;

    if (isTrayElement && over && activeItem) {
      handleTrayElementDragEnd({ over, delta });
    }

    if (isBackTestTrayItem) {
      handleBackTestDropEvent(strategyName);
    }
    setActiveItem(null);
  };

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
          tabs,
          setTabs,
          isCollapsed,
          setIsCollapsed,
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
