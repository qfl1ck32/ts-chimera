import { useEffect, useState } from 'react';

import { Inject, Injectable } from '@ts-chimera/di';
import { EventManager, Handler } from '@ts-chimera/event-manager';

import { SessionData } from './defs';
import { SessionStorageUpdatedEvent } from './events';
import { SessionStorage } from './storage';

@Injectable()
export class Session {
  constructor(
    @Inject(SessionStorage) private storage: SessionStorage,
    @Inject(EventManager) private eventManager: EventManager,
  ) {}

  get state() {
    return this.storage.state;
  }

  public setDefaultValues(state: SessionData) {
    for (const key in state) {
      const value = state[key as keyof SessionData];

      if (this.storage.state[key as keyof SessionData] == null) {
        this.storage.setItem(key as keyof SessionData, value);
      }
    }
  }

  public get<T extends keyof SessionData>(
    key: T,
    defaultValue?: SessionData[T],
  ): SessionData[T] | null {
    const [value, setValue] = useState<SessionData[T] | null>(
      this.storage.getItem(key) || defaultValue,
    );

    useEffect(() => {
      const handler = (e: SessionStorageUpdatedEvent<never>) => {
        setValue(this.storage.getItem(key));
      };

      this.eventManager.addListener({
        event: SessionStorageUpdatedEvent,
        handler,
        filter: (e) => e.data?.key === key,
      });

      return () => {
        this.eventManager.removeListener({
          event: SessionStorageUpdatedEvent,
          handler,
        });
      };
    }, []);

    return value;
  }

  public async set<T extends keyof SessionData>(key: T, value: SessionData[T]) {
    this.storage.setItem(key, value);

    await this.eventManager.emitAsync(
      new SessionStorageUpdatedEvent({ key, value }),
    );
  }

  public onSet<T extends keyof SessionData>(
    key: T,
    handler: Handler<SessionData[T]>,
  ) {
    // TODO
    // this.eventManager.addListener({
    //   event: SessionStorageUpdatedEvent,
    //   handler,
    //   filter: (e) => e.data?.key === key.toString()
    // });
  }

  public offSet<T extends keyof SessionData>(
    key: SessionData,
    handler: Handler<T>,
  ) {
    // this.eventManager.removeListener({
    //   event: SessionStorageUpdatedEvent as any,
    //   handler,
    // });
  }
}
