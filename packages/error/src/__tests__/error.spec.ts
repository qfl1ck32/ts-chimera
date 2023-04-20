import { Error } from '@src/index';

describe('error', () => {
  it('should work with base methods', async () => {
    interface IUsernameAlreadyExistsError {
      username: string;
    }

    class UsernameAlreadyExistsError extends Error<IUsernameAlreadyExistsError> {}

    const username = 'hi';

    const error = new UsernameAlreadyExistsError({
      username,
    });

    expect(error.data).toStrictEqual({ username });
    expect(error.getMessage()).toBe(
      'Error UsernameAlreadyExists has occurred.',
    );
    expect(error.getContext()).toStrictEqual({});
    expect(error.getCode()).toBe('USERNAME_ALREADY_EXISTS');
    expect(error.data).toStrictEqual({
      username,
    });
  });

  it('should have undefined for data if it has no interface', async () => {
    class UsernameAlreadyExistsError extends Error {}

    const error = new UsernameAlreadyExistsError();

    expect(error.data).toBeUndefined();
  });
});
