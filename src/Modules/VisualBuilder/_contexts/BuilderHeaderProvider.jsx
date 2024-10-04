import React, { createContext, useContext, useState } from 'react'

export const BuilderHeaderContext = createContext(null);


export default function BuilderHeaderProvider({ children }) {

  return (
    <BuilderHeaderContext.Provider>
      {children}
    </BuilderHeaderContext.Provider>
  )
}