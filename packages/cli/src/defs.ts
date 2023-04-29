export enum MicroserviceType {
  FRONT_END = 'front-end',
}

export interface ICLIService {
  run: () => Promise<void>;
}
