import { InjectToken, Injectable } from '@ts-chimera/react-di';
import { ISessionStorage, SessionData } from '@ts-chimera/react-session';
import { SESSION_STORAGE_CONFIG } from './tokens';
import { Config } from './defs';

@Injectable()
export class SessionStorage implements ISessionStorage {
  public state: SessionData;

  constructor(@InjectToken(SESSION_STORAGE_CONFIG) private config: Config) {
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
