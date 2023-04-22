import { UserRegisterInput } from '@src/graphql/inputs/UserRegister';
import UserService from '@src/services/User';
import { Arg, Mutation, Query, Resolver } from '@ts-phoenix/node-graphql';
import { User } from '@src/graphql/entities/User';

@Resolver(User)
export class UserResolver {
  constructor(private service: UserService) {}

  @Mutation(() => Boolean)
  async register(@Arg('input') input: UserRegisterInput) {
    return this.service.register(input);
  }

  @Query((returns) => User)
  async user() {
    return this.service.get();
  }
}
