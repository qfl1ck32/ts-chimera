import { EVENT_MANAGER_LISTENER_DECORATOR_KEY } from './constants';
import { ListenerDecoratorType } from './defs';
import { Event } from './event';
import { EventManager } from './service';

export const Listener = <T extends Event<any>>(
  args: ListenerDecoratorType<T>,
): any => {
  return (
    target: any,
    propertyKey: string | symbol,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const listeners =
      Reflect.getMetadata(EVENT_MANAGER_LISTENER_DECORATOR_KEY, EventManager) ||
      [];

    listeners.push({
      ServiceClass: target.constructor,
      handler: propertyDescriptor.value,
      ...args,
    });

    Reflect.defineMetadata(
      EVENT_MANAGER_LISTENER_DECORATOR_KEY,
      listeners,
      EventManager,
    );
  };
};
