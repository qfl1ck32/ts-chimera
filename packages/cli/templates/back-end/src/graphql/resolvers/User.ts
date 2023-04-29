import { UserRegisterInput } from '@src/graphql/inputs/UserRegister';
import UserService from '@src/services/User';
import { Arg, Mutation, Query, Resolver } from '@ts-phoenix/node-graphql';
import { User } from '@src/graphql/entities/User';
import { Inject, Injectable } from '@ts-phoenix/core';

@Injectable()
@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private service: UserService) {}

  @Mutation(() => Boolean)
  async register(@Arg('input') input: UserRegisterInput) {
    return this.service.register(input);
  }

  @Query((returns) => User)
  async getUser() {
    return this.service.get();
  }
}
