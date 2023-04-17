import { InjectToken, Injectable } from '@ts-phoenix/di';

import { Core } from '../core';
import { CONTAINER } from '../tokens';

export const InjectContainer = () => InjectToken(CONTAINER);

export const Service = () => {
  const decorator = (target: any) => {
    Core._registeredServices.register(target);

    Injectable()(target);
  };

  return decorator;
};
