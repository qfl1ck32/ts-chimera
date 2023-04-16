import { Event } from '@ts-phoenix/event-manager';

import { SessionData } from './defs';

export class SessionStorageUpdatedEvent<
  T extends keyof SessionData,
> extends Event<{
  key: T;
  value: SessionData[T];
}> {}
