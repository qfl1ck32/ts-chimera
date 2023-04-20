import { BuildSchemaOptions } from 'type-graphql';

export type PackageConfigType = Omit<BuildSchemaOptions, 'resolvers'>;

export interface GraphQLEventData {
  resolvers: any[];
}
