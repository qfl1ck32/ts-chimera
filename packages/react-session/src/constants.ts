import { ServiceToken } from '@ts-phoenix/core';

import { ISessionService, ISessionStorageService } from './defs';

export const SessionServiceToken =
  ServiceToken<ISessionService>('SessionService');

export const SessionStorageServiceToken = ServiceToken<ISessionStorageService>(
  'SessionStorageService',
);
