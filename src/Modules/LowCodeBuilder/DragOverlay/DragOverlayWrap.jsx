/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { TrayElementButtonOverlay } from '../ComponentTray/TrayBtn/TrayElementButton';

export default function DragOverlayWrap() {
  const [draggedItem, setDraggedItem] = useState(null)


  useDndMonitor({
    onDragStart:(event) => {
      console.log("Drag start ", event);
      setDraggedItem(event.active)
    },
    onDragCancel:() => {
      setDraggedItem(null)
    },
    onDragEnd:() => {
      setDraggedItem(null)
    }
  })

  if(!draggedItem)return null;

  let node = <div>No drag overlay</div>
  const isTrayElementBtn = draggedItem?.data?.current?.isTrayElement; 

  if(isTrayElementBtn){
    node = <TrayElementButtonOverlay name={draggedItem?.data?.current?.name}></TrayElementButtonOverlay>
  }

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
