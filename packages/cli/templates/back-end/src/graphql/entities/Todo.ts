import { Field, ObjectType } from '@ts-phoenix/node-graphql';
import { User } from './User';

@ObjectType()
export class Todo {
  @Field()
  id!: number;

  @Field()
  title!: string;

  @Field()
  finished!: boolean;

  @Field(() => User)
  user!: User;
}
