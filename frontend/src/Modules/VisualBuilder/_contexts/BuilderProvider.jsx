import React, { createContext, useContext, useState } from 'react';

export const BuilderContext = createContext(null);

export default function BuilderProvider({ children }) {
  return <BuilderContext.Provider>{children}</BuilderContext.Provider>;
}
