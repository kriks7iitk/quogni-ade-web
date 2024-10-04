import React, { createContext, useContext, useState } from 'react'

export const InspectorContext = createContext(null);


export default function InspectorProvider({ children }) {
  
  const [inspectorHeight, setInspectorHeight] = useState(60)
  

  return (
    <InspectorContext.Provider value={{ inspectorHeight, setInspectorHeight }}>
      {children}
    </InspectorContext.Provider>
  )
}
