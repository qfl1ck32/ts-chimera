import { Server } from 'http';

export interface PackageConfigType {
  port: number;
}

export interface ServerEventData {
  app: Express.Application;
  server: Server;
}
