import { Core, Injectable } from '@ts-phoenix/core';

import { ISessionStorage, SessionData } from '@src/defs';
import { SessionPackage } from '@src/package';
import { Session } from '@src/service';

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

    @Injectable()
    class Storage implements ISessionStorage {
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

    const core = new Core({
      packages: [
        new SessionPackage({
          storage: Storage,
        }),
      ],
    });

    await core.initialise();

    const session = core.container.get(Session);

    expect(session.state).toStrictEqual(initialState);

    session.set('test', 'hi');

    expect(session.state.test).toBe('hi');
  });
});
