import { BuildSchemaOptions } from 'type-graphql';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResolverType = Function | string;
export type Resolvers = ResolverType[];

export interface GraphQLEventData {
  resolvers: Resolvers;
}

export type PackageConfigType = Omit<BuildSchemaOptions, 'resolvers'> & {
  resolvers?: Resolvers;
};
