import React from 'react'

const StrategyTriggerMarker = ({
     x = 100,
     y = 200,
     message = "Strategy Triggered Here",
   }) => {
  return (
     <g transform={`translate(${x}, ${y})`}>
      {/* Text Label */}
      <text
        x={10}
        y={-10}
        fontSize={15}
        fill="red"
        fontFamily="Arial"
        textAnchor="left"
      >
        {message}
      </text>
      {/* Vertical Line Indicator */}
      <line x1={0} y1={0} x2={0} y2={-60} stroke="red" strokeWidth={2} />
    </g>
  )
}

export default StrategyTriggerMarker
