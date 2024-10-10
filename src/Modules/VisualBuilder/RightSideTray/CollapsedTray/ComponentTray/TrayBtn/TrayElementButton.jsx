import React , {useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';
import PropTypes from 'prop-types';
import { MdCandlestickChart } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import zIndex from '@mui/material/styles/zIndex';

const getIconForType = (type) => {
  
  switch (type) {
    case 'candle':
      return <MdCandlestickChart className="w-5 h-5" />;
    case 'line':
      return <IoAnalyticsOutline className="w-5 h-5" />;
    case 'volume':
      return <MdBarChart className="w-5 h-5" />;
    default:
      return null;
  }
  
};
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
      position: 'relative',
      padding: '10px',
      border: '1px solid white',
      margin: '5px',
      width:'70px',
      height:'40px',
      zIndex:1000,
      color:'white'

    };
    return (
      <button
        className="flex flex-col gap-2 h-[50px] w-[60px] cursor-grab text-white rounded-lg   justify-center items-center"
        ref={setNodeRef}
        // style={style}
        {...listeners}
        {...attributes}
      >
        <div className='' >
          <div className='flex justify-center items-center' >
            {getIconForType(type)}
          </div>
          <div>
            <span className='text-xs font-semibold flex justify-center items-center'>{name}</span>
          </div>
        </div>
      </button>
    );
};


// eslint-disable-next-line react/prop-types
export function TrayElementButtonOverlay ({ name, type }){
  const style = {
    padding: '10px',
    border: '1px solid black',
    margin: '5px',
    height:'40px',
    width:'62px'
  };
  return (
    <div className='bg-gray-300 w-8 h-8 rounded-md shadow-md shadow-slate-200 flex  justify-center items-center ' >
      {getIconForType(type)}
     {/* {name} */}
    </div>
  );
};



TrayElementButton.propTypes = {
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
  };