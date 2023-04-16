import { Constructor, MaybePromise } from '@ts-phoenix/typings';

import { Event } from './event';

export type Handler<EventType extends Event, Return = any> = (
  e: EventType,
) => MaybePromise<Return>;

export type Listener<T> = {
  event: Constructor<Event<T>>;

  handler: Handler<Event<T>, void>;

  filter?: Handler<Event<T>, boolean>;
};
