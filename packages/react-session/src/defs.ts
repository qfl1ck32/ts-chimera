import { Constructor } from '@ts-phoenix/typings';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SessionData {}

export interface ISessionStorage {
  state: SessionData;

  getItem<T extends keyof SessionData>(key: T): SessionData[T] | null;
  setItem<T extends keyof SessionData>(key: T, value: SessionData[T]): void;
}
export interface PackageConfigType {
  storage: Constructor<ISessionStorage>;
}

export type PackageRequiredConfig = Pick<PackageConfigType, 'storage'>;
