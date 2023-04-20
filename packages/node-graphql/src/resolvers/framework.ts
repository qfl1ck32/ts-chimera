import { Query, Resolver } from 'type-graphql';

@Resolver()
class FrameworkResolver {
  @Query(() => String)
  framework() {
    return 'ts-framework';
  }
}

export default FrameworkResolver;
