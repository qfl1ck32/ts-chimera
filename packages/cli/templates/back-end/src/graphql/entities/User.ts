import { Field, ObjectType } from '@ts-phoenix/node-graphql';
import { Todo } from './Todo';

@ObjectType()
export class User {
  @Field()
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field(() => [Todo])
  todos!: Todo[];
}
