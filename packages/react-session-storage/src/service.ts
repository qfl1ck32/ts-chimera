import { Inject, Service } from '@ts-phoenix/core';
import { ISessionStorageService, SessionData } from '@ts-phoenix/react-session';

import { SessionStoragePackageConfigToken } from './constants';
import { ISessionStoragePackageConfig } from './defs';

@Service()
export class SessionStorageService implements ISessionStorageService {
  public state: SessionData;

  constructor(
    @Inject(SessionStoragePackageConfigToken)
    private config: ISessionStoragePackageConfig,
  ) {
    if (typeof window !== 'undefined') {
      this.state = JSON.parse(
        localStorage.getItem(this.config.localStorageKey) || '{}',
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
      this.config.localStorageKey,
      JSON.stringify(this.state),
    );
  }
}
