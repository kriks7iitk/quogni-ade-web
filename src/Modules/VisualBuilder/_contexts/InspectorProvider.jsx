import React, { createContext, useContext, useState } from 'react'

export const InspectorContext = createContext(null);


export default function InspectorProvider({ children }) {
   const EXPANDED_HEIGHT = window.outerHeight - 200;;
  const [inspectorHeight, setInspectorHeight] = useState(EXPANDED_HEIGHT);
  

  return (
    <InspectorContext.Provider value={{ inspectorHeight, setInspectorHeight }}>
      {children}
    </InspectorContext.Provider>
  )
}
