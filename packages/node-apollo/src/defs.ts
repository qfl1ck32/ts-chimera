import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';

export interface PackageConfigType
  extends Omit<ApolloServerOptions<BaseContext>, 'typeDefs' | 'resolvers'> {
  mountingPath: string;
}

export interface ApolloEventData {
  server: ApolloServer;
}
