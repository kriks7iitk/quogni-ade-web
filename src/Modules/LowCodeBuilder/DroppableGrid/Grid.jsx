import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

export default function TimeLineY({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    height: '100%',
    width:'1px',
    backgroundColor: isOver ? 'pink' : 'blue', // Background color for droppable state
    position: 'relative',
    display:'flex',
    flexDirection:'column'
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div>{id}</div>
      {children && (
        <div style={{ position: 'relative' , top:'50%'}}>
          {children}  {/* Display children next to the line */}
        </div>
      )}
    </div>
  );
}

TimeLineY.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,  // Validate 'children' as a React node
};
