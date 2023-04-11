import EventEmitter from 'events';

import { Constructor } from '@ts-chimera/core';
import { Injectable } from '@ts-chimera/di';

import { Handler, Listener } from './defs';
import { Event } from './event';

@Injectable()
export class EventManager {
  private emitter: EventEmitter;
  private listeners: Map<Handler<any>, Handler<any>>;

  constructor() {
    this.emitter = new EventEmitter();
    this.listeners = new Map();
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

    this.listeners.set(args.handler, wrappedHandler);

    this.emitter.addListener(args.event.name, wrappedHandler);
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

  public async emitAsync<T>(event: Event<T>) {
    const listeners = this.emitter.listeners(event.constructor.name);

    if (!listeners.length) return false;

    const promises = listeners.map((listener) => listener(event));

    await Promise.all(promises);

    return true;
  }
}
