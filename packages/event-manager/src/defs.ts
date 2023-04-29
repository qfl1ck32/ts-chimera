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

export interface IEventManagerService {
  addListener<T extends Event<any>>(args: ListenerType<T>): void;

  removeListener<T extends Event<any>>(args: {
    event: Constructor<T>;
    handler: HandlerType<T>;
  }): void;

  emit<T>(event: Event<T>): void;

  emitSync<T>(event: Event<T>): Promise<void>;
}
