import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { TrayElementButton } from './ComponentTray/TrayBtn/TrayElementButton'; // Assuming Candle uses useDraggable
import './builder.scss';
import DragOverlayWrap from './DragOverlay/DragOverlayWrap';
import {createSnapModifier} from '@dnd-kit/modifiers';
import ZoomableGrid from './DroppableGrid/BuilderGrid';

export default function Builder() {
  const [gap, setGap] = useState(99); 
  const [strategyDef, setStrategyDef] = useState({ "1": [], "2":[],"3":[], "4":[] });
  const [activeItem, setActiveItem] = useState(null); // Track active draggable item

  const trayItems = [
    { name: 'Candle', type: 'candle' },
    { name: 'Line', type: 'line' },
    { name: 'Volume', type: 'volume' },
  ];
  

  const gridSize = 20; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  

  const handleDragStart = (event) => {
    const { active } = event;
    const draggedItem = trayItems.find((item) => `tray-element-${item?.type}` === active.id);
    setActiveItem(draggedItem);
  };

  const handleDragEnd = (event) => {
    const { over, delta } = event; // Get delta to track pointer position

    if (over && activeItem) {
      // Calculate drop position relative to the drop zone
      const dropZoneRect = over?.rect;
      const relativeX = delta.x; // Use delta to track pointer's x position relative to drop zone
      const relativeY = delta.y; // Use delta to track pointer's y position relative to drop zone

      const newItem = {
        id: `${activeItem?.type}_${over.id}`,
        name: activeItem.name,
        type: activeItem.type,
        position: {
          x: relativeX,
          y: relativeY,
        },
      };

      setStrategyDef({
        ...strategyDef,
        [over.id]: [...strategyDef[over.id], newItem],
      });
      setActiveItem(null); 
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
      <div className="editor-class">
        {/* Tray Component */}
        <div className="tray-pane">
          {trayItems.map((item, index) => (
            <TrayElementButton key={index} type={item?.type} name={item?.name} />
          ))}
        </div>

        {/* Grid (Canvas) Components */}
         <ZoomableGrid strategyDef={strategyDef} gap={gap}/>

        {/* Drag Overlay for smoother drag effect */}
        <DragOverlayWrap />
      </div>
    </DndContext>
  );
}
