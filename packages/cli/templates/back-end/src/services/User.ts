import { UserAlreadyExistsError } from '@src/errors/UserAlreadyExists';
import { User } from '@src/orm/entities/User';
import { UserRegisterInput } from '@src/graphql/inputs/UserRegister';
import { Inject, Service } from '@ts-phoenix/core';
import { DataSource, ORMDataSourceToken } from '@ts-phoenix/node-orm';

@Service()
class UserService {
  constructor(@Inject(ORMDataSourceToken) private source: DataSource) {}

  async register(input: UserRegisterInput) {
    const repository = this.source.getRepository(User);

    const userCountByUsername = await repository.count({
      where: [{ username: input.username }],
    });

    if (userCountByUsername > 0) {
      throw new UserAlreadyExistsError({
        username: input.username,
      });
    }

    const userCountByEmail = await repository.count({
      where: [{ email: input.email }],
    });

    if (userCountByEmail > 0) {
      throw new UserAlreadyExistsError({
        email: input.email,
      });
    }

    const hash = 'hi';

    const { password, ...userData } = input;

    const user = repository.create({
      ...userData,
      hash,
    });

    return repository.save(user);
  }

  async get() {}
}

export default UserService;
