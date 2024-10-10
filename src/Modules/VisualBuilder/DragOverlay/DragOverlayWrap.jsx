/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { DragOverlay  } from '@dnd-kit/core'
import { TrayElementButtonOverlay } from '../RightSideTray/CollapsedTray/ComponentTray/TrayBtn/TrayElementButton';
import { StrategyItemOverlay } from '../BackTest/StrategyItem';
import '../BackTest/back-test.theme.scss';

export default function DragOverlayWrap({ draggedItem }) {
  const [node, setNode] = useState(null);

  useEffect(() => {
    console.log('showing drag overlay');
    console.log(draggedItem);
    const isTrayElementBtn = draggedItem?.data?.current?.isTrayElement;
    const isBakTestTrayItem = draggedItem?.data?.current?.isBakTestTrayItem;

    if (isTrayElementBtn) {
      setNode(
        <TrayElementButtonOverlay
          name={draggedItem?.data?.current?.name}
        ></TrayElementButtonOverlay>,
      );
    }
    if (isBakTestTrayItem) {
      setNode(<StrategyItemOverlay name={draggedItem?.data?.current?.name} />);
    }
  }, [draggedItem]);

  return <DragOverlay>{node}</DragOverlay>;
}
