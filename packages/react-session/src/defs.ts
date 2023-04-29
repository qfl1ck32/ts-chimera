// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SessionData {}

export interface ISessionStorageService {
  state: SessionData;

  getItem<T extends keyof SessionData>(key: T): SessionData[T] | null;
  setItem<T extends keyof SessionData>(key: T, value: SessionData[T]): void;
}

export interface ISessionService {
  state: SessionData;
  get<T extends keyof SessionData>(
    key: T,
    defaultValue?: SessionData[T],
  ): SessionData[T] | null;

  set<T extends keyof SessionData>(key: T, value: SessionData[T]): void;
}
