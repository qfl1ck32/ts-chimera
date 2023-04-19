import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';

export type PackageConfigType = ApolloServerOptions<BaseContext>;

export interface GraphQLEventData {
  server: ApolloServer;
}
