import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context to hold the actor state
export const ActorContext = createContext<any>(null);

// Create a context provider component
export const ActorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actor, setActor] = useState<any>(null);

  const resetActor = () => {
    setActor(null);
  };

  return (
    <ActorContext.Provider value={{ actor, setActor }}>
      {children}
    </ActorContext.Provider>
  );
};

// Custom hook to use the actor context
export const useActor = () => useContext(ActorContext);

