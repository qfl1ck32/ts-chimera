import { Field, InputType } from '@ts-phoenix/node-graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
