
import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import PropTypes from 'prop-types';

export function TrayElementButton({ type, name }){
    const { attributes, listeners, setNodeRef} = useDraggable({
      id:`tray-element-${type}`,
      data:{
        type,
        isTrayElement:true,
        name
      }
    });
  
    const style = {
      padding: '10px',
      border: '1px solid black',
      margin: '5px',
    };
    return (
      <button className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'  ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {name}
      </button>
    );
};


// eslint-disable-next-line react/prop-types
export function TrayElementButtonOverlay ({ name }){
  const style = {
    padding: '10px',
    border: '1px solid black',
    margin: '5px',
  };

  return (
    <div className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab' style={style}>
     {name}
    </div>
  );
};



TrayElementButton.propTypes = {
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
  };