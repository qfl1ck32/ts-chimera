import { Constructor, MaybePromise } from '@ts-phoenix/typings';

import { Event } from './event';

export type HandlerType<T extends Event<any>, Return = any> = (
  e: T,
) => MaybePromise<Return>;

export type ListenerType<EventType extends Event<any>> = {
  event: Constructor<EventType>;

  handler: HandlerType<EventType, void>;

  filter?: HandlerType<EventType, boolean>;
};

export type ListenerDecoratorType<EventType extends Event<any>> = Omit<
  ListenerType<EventType>,
  'handler'
>;
