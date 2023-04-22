import { Field, InputType } from '@ts-phoenix/node-graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title!: string;
}
