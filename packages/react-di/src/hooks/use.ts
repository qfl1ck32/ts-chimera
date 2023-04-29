import { ServiceIdentifier } from '@ts-phoenix/core';
import { useMemo } from 'react';

import { useContainer } from './useContainer';

export function use<T>(
  identifier: ServiceIdentifier<T>,
  transient?: boolean,
): T {
  const container = useContainer();

  if (transient) {
    return container.get(identifier);
  }

  return useMemo(() => {
    return container.get(identifier);
  }, []);
}
