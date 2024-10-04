import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import './builder.scss';
import DragOverlayWrap from './DragOverlay/DragOverlayWrap';
import BuilderGrid from './DroppableGrid/BuilderGrid';
import { updateDefinition } from '../../_stores/strategy.reducer';
import './DroppableGrid/grid.scss';
import { useSelector, useDispatch } from 'react-redux';
import Inspector from './Inspector/Inspector';
import BuilderHeader from './BuilderHeader/BuilderHeader';
import LeftMenuBar from './LeftMenuBar/LeftMenuBar';

export default function VisualBuilder() {
  const dispatch = useDispatch();
  const strategyDef = useSelector((state) => state.strategy.data);
  const [drawerHeight, setDrawerHeight] = useState(200);
  const [activeItem, setActiveItem] = useState(null);

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

  const snapToGridModifier = createSnapModifier(gridSize);

  const handleDragStart = (event) => {
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

  return (
    <div className="builder-layout">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[snapToGridModifier]}
      >
        <BuilderHeader />
        <div className="horizontal-layout">
          <LeftMenuBar />
          <div className="vertical-layout">
            <div
              className="editor-class"
              style={{ height: `calc(100vh - ${drawerHeight}px - 40px)` }}
            >
              <BuilderGrid
                strategyDef={strategyDef}
                gridSize={gridSize}
                setStrategyDef={setStrategyDef}
              />
            </div>
            <Inspector onResize={setDrawerHeight} />
          </div>
          {/* Tray should come here */}
        </div>
        {activeItem?.data?.current?.isTrayElement && (
          <DragOverlayWrap draggedItem={activeItem} />
        )}
      </DndContext>
    </div>
  );
}
