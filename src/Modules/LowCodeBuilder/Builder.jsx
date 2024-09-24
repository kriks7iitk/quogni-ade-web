import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { TrayElementButton } from './ComponentTray/TrayBtn/TrayElementButton'; // Assuming Candle uses useDraggable
import TimeLineY from './DroppableGrid/Grid'; // Assuming TimeLineY uses useDroppable
import './builder.scss';
import DragOverlayWrap from './DragOverlay/DragOverlayWrap';

export default function Builder() {
  const [gap, setGap] = useState(100); 
  const [strategyDef, setStrategyDef] = useState({ "1": [], "2":[] });
  const [activeItem, setActiveItem] = useState(null); // Track active draggable item

  const trayItems = [
    { name: 'Candle', type: 'candle' },
    { name: 'Line', type: 'line' },
    { name: 'Volume', type: 'volume' },
  ];

  

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="editor-class">
        {/* Tray Component */}
        <div className="tray-pane">
          {trayItems.map((item, index) => (
            <TrayElementButton key={index} type={item?.type} name={item?.name} />
          ))}
        </div>

        {/* Grid (Canvas) Components */}
        <div className="grid" style={{ gap: `${gap}px` }}>
        {Object.keys(strategyDef).map((key) => {
          const timeLineElement = strategyDef[key];
          console.log("key is ",);
          console.log(Object.keys(strategyDef));
          
          return (
              <TimeLineY id={`key_${1}`} key={`key_${key}`}>
                {timeLineElement?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      width: '50px',
                      position: 'absolute',
                      left: `${item.position.x}px`,
                      top: `${item.position.y}px`,
                      border: '2px dashed #000',
                      backgroundColor: '#f0f0f0', // Optional: background color for visibility
                    }}
                  >
                    {item.name} ({item.type})
                  </div>
                ))}
              </TimeLineY>
         );
        })}
        </div>

        {/* Drag Overlay for smoother drag effect */}
        <DragOverlayWrap />
      </div>
    </DndContext>
  );
}
