import { User } from '@src/entities/User';
import { UserAlreadyExistsError } from '@src/errors/UserAlreadyExists';
import { UserRegisterInput } from '@src/inputs/UserRegister';
import UserService from '@src/services/User';
import { Inject, Injectable } from '@ts-phoenix/di';
import { Arg, Mutation, Query, Resolver } from '@ts-phoenix/node-graphql';

@Injectable()
@Resolver(User)
export class UserResolver {
  constructor(@Inject(UserService) private service: UserService) {}

  @Mutation(() => Boolean)
  async register(@Arg('input') input: UserRegisterInput) {
    throw new UserAlreadyExistsError({
      username: 'hi',
    });

    console.log(input);
    return;

    // return this.service.register(input);
  }

  @Query((returns) => User)
  async user() {
    return this.service.get();
  }
}
