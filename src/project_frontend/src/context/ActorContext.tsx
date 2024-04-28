import React, { createContext, useContext, useState, ReactNode } from 'react';

export const ActorContext = createContext<any>(null);

export const ActorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actor, setActor] = useState<any>(null);

//   const resetActor = () => {
//     setActor(null);
//   };

  return (
    <ActorContext.Provider value={{ actor, setActor }}>
      {children}
    </ActorContext.Provider>
  );
};

export const useActor = () => useContext(ActorContext);

