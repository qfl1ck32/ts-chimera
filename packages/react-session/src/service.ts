import {
  InjectContainer,
  Container,
  Inject,
  Injectable,
  InjectToken,
} from '@ts-phoenix/core';
import { EventManager } from '@ts-phoenix/event-manager';
import { useEffect, useState } from 'react';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { ISessionStorage, PackageConfigType, SessionData } from './defs';
import { SessionStorageUpdatedEvent } from './events';

@Injectable()
export class Session {
  private storage: ISessionStorage;

  constructor(
    @InjectContainer() private container: Container,
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
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
