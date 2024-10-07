/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { DragOverlay  } from '@dnd-kit/core'
import { TrayElementButtonOverlay } from '../RightSideTray/ComponentTray/TrayBtn/TrayElementButton';

export default function DragOverlayWrap({draggedItem}) {
  const [node, setNode] = useState(null)

  useEffect(() => {
    console.log("showing drag overlay");
    console.log(draggedItem);
  const isTrayElementBtn = draggedItem?.data?.current?.isTrayElement; 

  if(isTrayElementBtn){
    console.log("helo helo");
    
    setNode(<TrayElementButtonOverlay name={draggedItem?.data?.current?.name}></TrayElementButtonOverlay>)
  }
  }, [draggedItem])
  

  

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
