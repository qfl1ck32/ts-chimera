import { Server } from 'http';

import { Application } from 'express';

export interface PackageConfigType {
  port: number;
}

export interface ExpressEventData {
  app: Application;
  server: Server;
}

export { Application, Server };
