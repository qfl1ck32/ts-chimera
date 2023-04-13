import { Injectable } from '@ts-chimera/react-di';

import { SessionData } from './defs';

export interface ISessionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

@Injectable()
export class SessionStorage implements ISessionStorage {
  private localStorageKey: string;

  public state: SessionData;

  constructor() {
    this.localStorageKey = 'session-storage';

    if (typeof window !== 'undefined') {
      this.state = JSON.parse(
        localStorage.getItem(this.localStorageKey) || '{}',
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

    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state));
  }
}
