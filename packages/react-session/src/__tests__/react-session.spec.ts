import { Core, Package, Service } from '@ts-phoenix/core';
import { EventManagerPackage } from '@ts-phoenix/event-manager';

import {
  SessionServiceToken,
  SessionStorageServiceToken,
} from '@src/constants';
import { ISessionStorageService, SessionData } from '@src/defs';
import { SessionPackage } from '@src/package';

declare module '@src/defs' {
  interface SessionData {
    test: string;
  }
}

describe('react-session', () => {
  it('should work', async () => {
    const initialState = {
      test: 'hi',
    } as SessionData;

    @Service()
    class SessionStorageService implements ISessionStorageService {
      state: SessionData;

      constructor() {
        this.state = initialState;
      }

      getItem<T extends never>(key: T): SessionData[T] | null {
        return this.state[key];
      }

      setItem<T extends never>(key: T, value: SessionData[T]): void {
        this.state[key] = value;
      }
    }

    class StoragePackage extends Package {
      bind() {
        this.core.container
          .bind(SessionStorageServiceToken)
          .to(SessionStorageService);
      }
    }

    const core = new Core({
      packages: [
        new SessionPackage(),
        new StoragePackage(),
        new EventManagerPackage(),
      ],
    });

    await core.initialise();

    const session = core.container.get(SessionServiceToken);

    expect(session.state).toStrictEqual(initialState);

    session.set('test', 'hi');

    expect(session.state.test).toBe('hi');
  });
});
