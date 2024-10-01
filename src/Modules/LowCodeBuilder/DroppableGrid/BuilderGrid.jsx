import React, { useState, useRef,useEffect } from 'react';
import TimeLineY from './Grid';
import PropTypes from 'prop-types';
import { TrayElementButton } from '../ComponentTray/TrayBtn/TrayElementButton';
import { Ruler } from './Ruler/Ruler';
import ComponentRenderer from '../Components/ComponentRenderer';

const ZoomableGrid = ({ strategyDef,gridSize, setStrategyDef }) => {
    const [gap, setGap] = useState(99);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
    const [transformOrigin, setTransformOrigin] = useState('0 0');
    const gridRef = useRef(null);

    const trayItems = [
        { name: 'Candle', type: 'candle' },
        { name: 'Line', type: 'line' },
        { name: 'Volume', type: 'volume' },
    ];
    

    // Handle zoom in
    const handleZoomIn = (mouseX, mouseY) => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3));
        updateTransformOrigin(mouseX, mouseY);
    };

    // Handle zoom out
    const handleZoomOut = (mouseX, mouseY) => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
        updateTransformOrigin(mouseX, mouseY);
    };

    // Zoom based on wheel event
    const handleZoom = (event) => {
        event.preventDefault();
        const { clientX, clientY } = event;
        const { left, top } = gridRef.current.getBoundingClientRect();
        const mouseX = clientX - left;
        const mouseY = clientY - top;

        if (event.deltaY < 0) {
            handleZoomIn(mouseX, mouseY);
        } else {
            handleZoomOut(mouseX, mouseY);
        }
    };

    // Update transform origin
    const updateTransformOrigin = (mouseX, mouseY) => {
        setTransformOrigin(`${mouseX}px ${mouseY}px`);
    };

    // Handle mouse events for panning
    const handleMouseDown = (event) => {
        setIsPanning(true);
        setStartCoords({
            x: event.clientX - gridRef.current.scrollLeft,
            y: event.clientY - gridRef.current.scrollTop,
        });
    };

    const handleMouseMove = (event) => {
        if (isPanning) {
            const x = event.clientX - startCoords.x;
            const y = event.clientY - startCoords.y;
            gridRef.current.scrollLeft = -x;
            gridRef.current.scrollTop = -y;
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    return (
        <div className='grid-main-container' style={{ '--grid-size': `${gridSize}px` }}>
            <div className="zoom-controls">
                <button onClick={() => handleZoomIn(0, 0)}>Zoom In</button>
                <button onClick={() => handleZoomOut(0, 0)}>Zoom Out</button>
            </div>
            <div className="tray-pane">
                {trayItems.map((item, index) => (
                    <TrayElementButton key={index} type={item?.type} name={item?.name} />
                ))}
            </div>
            <Ruler orientation='vertical' zoomLevel={zoomLevel} />
            <Ruler orientation='horizontal' />
            <div
                className="grid-container"
                ref={gridRef}
                onWheel={handleZoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    cursor: isPanning ? 'grabbing' : 'grab',
                    position: 'relative',
                }}
            >
                <div
                    className="grid"
                    style={{
                        gap: `${gap}px`,
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: transformOrigin,
                        position: 'relative',
                        width: `100%`,
                        height: `100%`,
                    }}
                >
                    
                {Object.keys(strategyDef).map((key) => {
                    const timeLineElement = strategyDef[key];
                    
                    return (
                        <TimeLineY id={key} key={`key_${key}`}>
                            {Object.keys(timeLineElement).map((types, index) => (
                                <ComponentRenderer key={index} componentDef={timeLineElement[types]} overId={key} setStrategyDef={setStrategyDef}/>
                            ))}
                        </TimeLineY>
                    );
                })}
                </div>
            </div>
        </div>
    );
};


ZoomableGrid.displayName = 'ZoomableGrid';

ZoomableGrid.propTypes = {
    strategyDef: PropTypes.any.isRequired,
    gridSize: PropTypes.number.isRequired,

};
export default ZoomableGrid;
