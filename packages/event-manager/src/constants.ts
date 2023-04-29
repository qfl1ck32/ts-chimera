import { ServiceToken } from '@ts-phoenix/core';

import { IEventManagerService } from './defs';

export const EventManagerServiceToken =
  ServiceToken<IEventManagerService>('EventManager');
