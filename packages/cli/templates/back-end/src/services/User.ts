import { User } from '@src/entities/User';
import { UserRegisterInput } from '@src/inputs/UserRegister';
import { Inject, Injectable } from '@ts-phoenix/di';
import { ORM } from '@ts-phoenix/node-orm';

@Injectable()
class UserService {
  constructor(@Inject(ORM) private orm: ORM) {}

  async register(input: UserRegisterInput) {
    const repository = this.orm.source.getRepository(User);

    const user = repository.create(input);

    return repository.save(user);
  }

  async get() {
    return this.orm.source.getRepository(User).findOne({
      where: {
        age: 2,
      },
    });
  }
}

export default UserService;
