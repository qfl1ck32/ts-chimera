import { Inject, Service } from '@ts-phoenix/core';
import { ISessionStorage, SessionData } from '@ts-phoenix/react-session';

import { SessionStoragePackage } from './package';

@Service()
export class SessionStorage implements ISessionStorage {
  public state: SessionData;

  constructor(
    @Inject(SessionStoragePackage) private pkg: SessionStoragePackage,
  ) {
    if (typeof window !== 'undefined') {
      this.state = JSON.parse(
        localStorage.getItem(this.pkg.config.localStorageKey) || '{}',
      );
    } else {
      this.state = {} as SessionData;
    }
  }

  public getItem<T extends keyof SessionData>(key: T) {
    return this.state[key];
  }

  public setItem<T extends keyof SessionData>(key: T, value: SessionData[T]) {
    this.state[key] = value;

    localStorage.setItem(
      this.pkg.config.localStorageKey,
      JSON.stringify(this.state),
    );
  }
}
