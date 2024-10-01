import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import './builder.scss';
import DragOverlayWrap from './DragOverlay/DragOverlayWrap';
import ZoomableGrid from './DroppableGrid/BuilderGrid';
import './DroppableGrid/grid.scss'
import Inspector from './Inspector/Inspector';

export default function Builder() {
   
  const [strategyDef, setStrategyDef] = useState({ "1": {}, "2":{},"3":{}, "4":{} });
  const [drawerHeight, setDrawerHeight] = useState(200); 
  const [activeItem, setActiveItem] = useState(null);



  const gridSize = 10;

  const createSnapModifier = (gridSize) => {
    return ({transform}) => {
      
      return{
      ...transform,
      x: Math.ceil(transform.x / gridSize) * gridSize,
      y: Math.ceil(transform.y / gridSize) * gridSize,
    }};
  }

  const snapToGridModifier = createSnapModifier(gridSize);

  

  

  const handleDragStart = (event) => {
    console.log(event);
    
    console.log("drag start");
    const { active } = event;
    console.log(active);
    
    
    
    setActiveItem(active);
  };

  // const handleTimeElementDragEnd = () => {
  //   const data = activeItem?.data?.current;
  //   const { type, posY, overId } = data
  //   console.log("drag end data is ");
  //   console.log(data);
    
    
  //   setStrategyDef((prevDef) => {
  //     const currentTimeLineState = prevDef[overId];
  //     const componentDef = currentTimeLineState[type];
  //     const newDef = {
  //         ...prevDef,
  //         [overId]: {...currentTimeLineState, [type]:{...componentDef, position:{
  //             y:posY
  //         }}},
  //       }
  //       console.log("new def is");
  //       console.log(newDef);
        
  //     return newDef;
  // })


  // }

  const handleTrayElementDragEnd = ({over}) => {
    
    
    // const relativeX = delta.x;
    //   const relativeY = delta.y;
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
      const currentTimeLineState = strategyDef[over.id]
      setStrategyDef({
        ...strategyDef,
        [over.id]: {...currentTimeLineState, [data.type]:newItem},
      });
  }

  const handleDragEnd = (event) => {
    const { over, delta } = event;
    console.log(delta);
    console.log("delta");
    
    
    const data = activeItem?.data?.current;
    const isTrayElement = data?.isTrayElement;

    if (isTrayElement && over && activeItem) {
      handleTrayElementDragEnd({over,delta})
    }
    // if(data?.isTimeLineElement){
    //   handleTimeElementDragEnd();
    // }
    setActiveItem(null); 
  };

  return (
    <div className="builder-layout" >
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]} >
     
      <div className="editor-class" style={{ height: `calc(100vh - ${drawerHeight}px)` }} >
        <ZoomableGrid strategyDef={strategyDef} gridSize={gridSize} setStrategyDef={setStrategyDef}/>
      </div>
      {activeItem?.data?.current?.isTrayElement && 
        <DragOverlayWrap draggedItem= {activeItem}/>}
      
      </DndContext>

      <Inspector onResize={setDrawerHeight} /> 

    </div>
  );
}
