import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { useDraggable, useDndMonitor } from '@dnd-kit/core';
import cx from 'classnames';
import Candle from './Candle/Candle';
import './component.scss';

export default function ComponentRenderer({ componentDef, overId , setStrategyDef}) {
    const { type: ctype, position } = componentDef;
    const [yPosition, setYPosition] = useState(position.y); // State to track Y position
    const [lastDeltaY, setLastDeltaY] = useState(0)


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `over-${overId}-${ctype}`,
        data:{
            overId,
            type:ctype,
            isTimeLineElement:true,

        }
    });

    useDndMonitor({
        onDragEnd() {
            setStrategyDef((prevDef) => {
                const currentTimeLineState = prevDef[overId];
                const componentDef = currentTimeLineState[ctype];
                const newDef = {
                    ...prevDef,
                    [overId]: {...currentTimeLineState, [ctype]:{...componentDef, position:{
                        y:yPosition
                    }}},
                  }
                  console.log("new def is");
                  console.log(newDef);
                  
                return newDef;
            })
        },
      });

    useEffect(() => {
        if (transform && lastDeltaY!==transform.y) {
            console.log(overId);
            
            setLastDeltaY(transform.y)
            
        }
        if(!transform){
            console.log("finalziing ");
            setYPosition(lastDeltaY + yPosition);
            setLastDeltaY(0)
        }
    }, [transform]);

    

    

    const renderFunction = (ctype) => {
        switch (ctype) {
            case 'candle':
                return <Candle />;
            default:
                return null;
        }
    };

    return (
        <div
            className={cx('component-renderer-base', {
                'candle-render': ctype === 'candle',
            })}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={{
                transform: `translateY(${(lastDeltaY + yPosition)}px)`, // Apply Y-axis movement only
                transition: 'transform 0.1s ease', // Smooth transition
            }}
        >
            {renderFunction(ctype)}
        </div>
    );
}

ComponentRenderer.propTypes = {
    componentDef: PropTypes.any.isRequired,
    overId: PropTypes.any.isRequired,
};
