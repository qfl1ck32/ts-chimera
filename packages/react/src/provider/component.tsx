import { ContainerContext } from '@src/di';
import { Core, CoreState } from '@ts-chimera/core';
import React, { useEffect, useState } from 'react';

export const AppProvider: React.FC<{
  children: React.ReactNode;
  LoadingComponent: React.ReactNode;
  core: Core;
  className?: string;
}> = (props) => {
  const [isInitialised, setIsInitialised] = useState(props.core.isInitialised);

  useEffect(() => {
    if (props.core.isInitialised) return;

    props.core.initialise().then(() => setIsInitialised(true));
  }, []);

  if (!isInitialised) {
    return <>{props.LoadingComponent}</>;
  }

  return (
    <ContainerContext.Provider value={props.core.container}>
      <main className={props.className}>{props.children}</main>
    </ContainerContext.Provider>
  );
};
