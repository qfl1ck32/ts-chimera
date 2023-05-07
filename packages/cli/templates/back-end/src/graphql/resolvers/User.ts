import { User } from '@src/graphql/entities/User';
import { Injectable } from '@ts-phoenix/core';
import { Query, Resolver } from '@ts-phoenix/node-graphql';

@Injectable()
@Resolver(User)
export class UserResolver {

  @Query(returns => String)
  async hello() {
    return "Hello"
  }
}
