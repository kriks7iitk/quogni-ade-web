import React, { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

export default function TimeLineY({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  useEffect(() => {
    console.log("TimeLineY rendered with ID:", id);
  }, [id]);

  const style = {
    width: '1px', // Adjust the width for visibility
    height: '100%',
    borderLeft: '1px dashed black', // Create a dashed line effect
    backgroundColor: isOver ? 'lightgreen' : 'transparent', // Background color for droppable state
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children && (
        <div style={{ position: 'absolute', left: '10px' }}>
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
