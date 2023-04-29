import EventEmitter from 'events';

import { Service } from '@ts-phoenix/core';
import { Constructor } from '@ts-phoenix/typings';

import { HandlerType, IEventManagerService, ListenerType } from './defs';
import { Event } from './event';

@Service()
export class EventManagerService implements IEventManagerService {
  private emitter: EventEmitter;
  private listeners: Map<HandlerType<any>, HandlerType<any>>;
  private events: Map<Constructor<Event<any>>, symbol>;

  constructor() {
    this.emitter = new EventEmitter();
    this.listeners = new Map();
    this.events = new Map();
  }

  public addListener<T extends Event<any>>(args: ListenerType<T>) {
    const wrappedHandler: HandlerType<T> = async (e) => {
      if (args.filter) {
        if (!(await args.filter(e))) {
          return;
        }
      }

      await args.handler(e);
    };

    const eventSymbol = Symbol();

    this.events.set(args.event, eventSymbol);

    this.listeners.set(args.handler, wrappedHandler);

    this.emitter.addListener(eventSymbol, wrappedHandler);
  }

  public removeListener<EventType extends Event<any>>(args: {
    event: Constructor<EventType>;
    handler: HandlerType<EventType>;
  }) {
    const wrappedHandler = this.listeners.get(args.handler);

    if (!wrappedHandler) {
      return;
    }

    this.emitter.removeListener(args.event.name, wrappedHandler);
  }

  public emit<T>(event: Event<T>) {
    this.emitter.emit(event.constructor.name, event);
  }

  public async emitSync<T>(event: Event<T>) {
    const eventSymbol = this.events.get(
      event.constructor as Constructor<Event>,
    ) as symbol;

    const listeners = this.emitter.listeners(eventSymbol);

    if (!listeners.length) return;

    const promises = listeners.map((listener) => listener(event));

    await Promise.all(promises);
  }
}
