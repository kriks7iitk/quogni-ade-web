import React, { createContext, useContext, useState } from 'react'

export const DragAndDropContext = createContext(null);


export default function DragAndDropProvider({ children }) {

  return (
    <DragAndDropContext.Provider>
      {children}
    </DragAndDropContext.Provider>
  )
}