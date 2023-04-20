import EventEmitter from 'events';

import { Injectable } from '@ts-phoenix/di';
import { Constructor } from '@ts-phoenix/typings';

import { Handler, Listener } from './defs';
import { Event } from './event';

@Injectable()
export class EventManager {
  private emitter: EventEmitter;
  private listeners: Map<Handler<any>, Handler<any>>;
  private events: Map<Constructor<Event>, symbol>;

  constructor() {
    this.emitter = new EventEmitter();
    this.listeners = new Map();
    this.events = new Map();
  }

  public addListener<T>(args: Listener<T>) {
    const wrappedHandler: Handler<Event<T>> = async (e) => {
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

  public removeListener<EventType extends Event>(args: {
    event: Constructor<EventType>;
    handler: Handler<EventType>;
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

    if (!listeners.length) return false;

    const promises = listeners.map((listener) => listener(event));

    await Promise.all(promises);

    return true;
  }
}
