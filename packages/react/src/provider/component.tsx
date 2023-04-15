import { ContainerContext } from '@ts-chimera/react-di';
import { Core } from '@ts-chimera/core';
import React, { Fragment, useEffect, useState } from 'react';

export const AppProvider: React.FC<{
  children: React.ReactNode;
  LoadingComponent?: React.ReactNode;
  core: Core;
  className?: string;
}> = (props) => {
  const [isInitialised, setIsInitialised] = useState(props.core.isInitialised);

  const LoadingComponent = props.LoadingComponent || <div>Loading...</div>;

  useEffect(() => {
    props.core.initialise().then(() => setIsInitialised(true));
  }, []);

  if (!isInitialised) {
    return <Fragment>{LoadingComponent}</Fragment>;
  }

  return (
    <ContainerContext.Provider value={props.core.container}>
      <main className={props.className}>{props.children}</main>
    </ContainerContext.Provider>
  );
};
