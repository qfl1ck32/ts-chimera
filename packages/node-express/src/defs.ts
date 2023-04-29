import { Server } from 'http';

import { Application } from 'express';

export interface IExpressPackageConfig {
  port: number;
}

export interface ExpressEventData {
  app: Application;
  server: Server;
}

export interface IExpressService {
  app: Application;
  server: Server;

  start(): Promise<void>;
  stop(): Promise<void>;
}

export { Application, Server };
