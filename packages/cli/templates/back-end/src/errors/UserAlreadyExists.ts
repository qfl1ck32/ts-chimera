import { Error } from '@ts-phoenix/error';

export class UserAlreadyExistsError extends Error<{
  username?: string;
  email?: string;
}> {
  getContext() {
    return this.data;
  }
}
