import React from 'react'

const StrategyTriggerMarker = ({
     x,
     y,
     message,
   }) => {

    
  return (
     <g transform={`translate(${x}, ${y})`}>
      {/* Text Label */}
      <text
        x={10}
        y={30}
        fontSize={15}
        fill="red"
        fontFamily="Arial"
        textAnchor="right"
      >
        {message}
      </text>
      {/* Vertical Line Indicator */}
      <line x1={0} y1={1} x2={1} y2={50} stroke="red" strokeWidth={2} />
    </g>
  )
}

export default StrategyTriggerMarker
