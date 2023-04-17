import { InjectToken, Injectable } from '@ts-phoenix/core';
import { ISessionStorage, SessionData } from '@ts-phoenix/react-session';

import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class SessionStorage implements ISessionStorage {
  public state: SessionData;

  constructor(
    @InjectToken(PACKAGE_CONFIG_TOKEN) private config: PackageConfigType,
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
