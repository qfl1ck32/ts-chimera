import { useMemo } from 'react';

import { Constructor } from '@ts-chimera/core';

import { useContainer } from './useContainer';

export function use<T>(identifier: Constructor<T>, transient?: boolean): T {
  const container = useContainer();

  if (transient) {
    return container.get(identifier);
  }

  return useMemo(() => {
    return container.get(identifier);
  }, []);
}
