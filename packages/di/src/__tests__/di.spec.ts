import {
  Container,
  Injectable,
  InjectToken,
  setToken,
  Token,
} from '@src/index';

describe('di', () => {
  test('InjectToken & setToken', () => {
    const container = new Container({
      autoBindInjectable: true,
    });

    const token = new Token<string>();

    const value = 'di';

    setToken({
      token,
      value,
      container,
    });

    @Injectable()
    class MyClass {
      constructor(@InjectToken(token) public name: string) {}
    }

    const myClass = container.get(MyClass);

    expect(myClass.name).toBe(value);
  });
});
