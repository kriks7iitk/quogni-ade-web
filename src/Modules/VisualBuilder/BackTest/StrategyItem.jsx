import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function StrategyItem({ name, id, isDragged = false }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `strategy-${id}`,
    data: {
      name,
      isBakTestTrayItem: true,
    },
  });

  return (
    <div
      className={`strategy-item`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {name}{' '}
    </div>
  );
}

export function StrategyItemOverlay({ name }) {
  return <div className={'strategy-item-dragged'}>{name} </div>;
}
