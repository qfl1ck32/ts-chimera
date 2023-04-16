import { Error } from '@src/index';

describe('error', () => {
  it('should work', async () => {
    interface IUsernameAlreadyExistsError {
      username: string;
    }

    const code = 'USERNAME_ALREADY_EXISTS';

    class UsernameAlreadyExistsError extends Error<IUsernameAlreadyExistsError> {
      getCode() {
        return code;
      }

      getContext() {
        return {
          username: this.data!.username,
        };
      }

      getMessage() {
        return `Username ${this.data!.username} already exists`;
      }
    }

    try {
      throw new UsernameAlreadyExistsError({
        username: 'test',
      });
    } catch (err: unknown) {
      const error = err as Error;

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UsernameAlreadyExistsError);
      expect(error.getCode()).toBe(code);
      expect(error.getContext()).toEqual({
        username: 'test',
      });
      expect(error.getMessage()).toBe('Username test already exists');
    }
  });
});
