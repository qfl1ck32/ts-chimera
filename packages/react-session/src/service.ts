import { Inject, Service } from '@ts-phoenix/core';
import {
  EventManagerServiceToken,
  IEventManagerService,
} from '@ts-phoenix/event-manager';
import { useEffect, useState } from 'react';

import { SessionStorageServiceToken } from './constants';
import { ISessionStorageService, SessionData, ISessionService } from './defs';
import { SessionStorageUpdatedEvent } from './events';

@Service()
export class SessionService implements ISessionService {
  constructor(
    @Inject(SessionStorageServiceToken)
    private storageService: ISessionStorageService,
    @Inject(EventManagerServiceToken)
    private eventManager: IEventManagerService,
  ) {}

  get state() {
    return this.storageService.state;
  }

  public get<T extends keyof SessionData>(
    key: T,
    defaultValue?: SessionData[T],
  ): SessionData[T] | null {
    const [value, setValue] = useState<SessionData[T] | null>(
      this.storageService.getItem(key) || defaultValue || null,
    );

    useEffect(() => {
      const handler = (e: SessionStorageUpdatedEvent<never>) => {
        setValue(this.storageService.getItem(key));
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
    this.storageService.setItem(key, value);

    await this.eventManager.emitSync(
      new SessionStorageUpdatedEvent({ key, value }),
    );
  }
}
