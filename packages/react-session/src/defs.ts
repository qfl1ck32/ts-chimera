import { Constructor } from '@ts-chimera/typings';

export interface SessionData {}

export interface ISessionStorage {
  state: SessionData;

  getItem<T extends keyof SessionData>(key: T): SessionData[T] | null;
  setItem<T extends keyof SessionData>(key: T, value: SessionData[T]): void;
}
export interface Config {
  storage: Constructor<ISessionStorage>;
}

export interface RequiredConfig extends Pick<Config, 'storage'> {}
