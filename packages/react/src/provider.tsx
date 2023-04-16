import { ContainerContext } from '@ts-phoenix/react-di';
import { Core } from '@ts-phoenix/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Loading } from '@ts-phoenix/react-components';

export const AppProvider: React.FC<{
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  core: Core;
}> = (props) => {
  const [isInitialised, setIsInitialised] = useState(props.core.isInitialised);

  const LoadingComponent = props.loadingComponent || <Loading />;

  useEffect(() => {
    props.core.initialise().then(() => setIsInitialised(true));
  }, []);

  if (!isInitialised) {
    return <Fragment>{LoadingComponent}</Fragment>;
  }

  return (
    <ContainerContext.Provider value={props.core.container}>
      {props.children}
    </ContainerContext.Provider>
  );
};
