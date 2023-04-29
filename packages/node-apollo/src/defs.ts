import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { Application } from '@ts-phoenix/node-express';

export interface INodeApolloPackageConfig
  extends Omit<ApolloServerOptions<BaseContext>, 'typeDefs' | 'resolvers'> {
  mountingPath: string;
}

export interface ApolloEventData {
  server: ApolloServer;
}

export interface IApolloService {
  server: ApolloServer;

  start(app: Application): Promise<void>;

  stop(): Promise<void>;
}
