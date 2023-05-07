import { Field, ObjectType } from '@ts-phoenix/node-graphql';

@ObjectType()
export class User {
  @Field()
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;
}
