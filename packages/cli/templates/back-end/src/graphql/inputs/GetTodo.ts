import { Field, InputType } from '@ts-phoenix/node-graphql';

@InputType()
export class GetTodoInput {
  @Field()
  id!: number;
}
