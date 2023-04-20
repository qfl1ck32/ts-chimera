import { Constructor, MaybePromise } from '@ts-phoenix/typings';

import { Event } from './event';

export type Handler<T extends Event<any>, Return = any> = (
  e: T,
) => MaybePromise<Return>;

export type Listener<EventType extends Event<any>> = {
  event: Constructor<EventType>;

  handler: Handler<EventType, void>;

  filter?: Handler<EventType, boolean>;
};
