import { useEffect, useState } from 'react';

import { InjectContainer } from '@ts-chimera/core';
import { EventManager } from '@ts-chimera/event-manager';
import {
  Container,
  Inject,
  InjectToken,
  Injectable,
} from '@ts-chimera/react-di';

import { Config, ISessionStorage, SessionData } from './defs';
import { SessionStorageUpdatedEvent } from './events';
import { SESSION_CONFIG } from './tokens';

@Injectable()
export class Session {
  private storage: ISessionStorage;

  constructor(
    @InjectContainer() private container: Container,
    @InjectToken(SESSION_CONFIG) private config: Config,
    @Inject(EventManager) private eventManager: EventManager,
  ) {
    this.storage = this.container.get(this.config.storage);
  }

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
      this.storage.getItem(key) || defaultValue || null,
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
}
