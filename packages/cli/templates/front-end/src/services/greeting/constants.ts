import { ServiceToken } from '@ts-phoenix/core';

import { IGreetingService } from './defs';

export const GreetingServiceToken =
  ServiceToken<IGreetingService>('GreetingService');
