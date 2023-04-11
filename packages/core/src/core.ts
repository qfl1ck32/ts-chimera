import { BindingScopeEnum, Container, Injectable, Token } from '@ts-chimera/di';

import { CoreState } from './defs';
import { Package } from './package';

@Injectable()
export class Core {
  private state: CoreState;
  private containerInstance!: Container;

  get container() {
    if (!this.containerInstance) {
      this.containerInstance = new Container({
        autoBindInjectable: true,
        skipBaseClassChecks: true,
        defaultScope: BindingScopeEnum.Singleton,
      });
    }

    return this.containerInstance;
  }

  get isNew() {
    return this.state === CoreState.NEW;
  }

  get isInitializing() {
    return this.state === CoreState.INITIALIZING;
  }

  get isInitialized() {
    return this.state === CoreState.INITIALIZED;
  }

  public setToken<T>(token: Token<T>, value: T) {
    this.container.bind(token.identifier).toConstantValue(value);
  }

  constructor(private config: { packages: Package[] }) {
    this.state = CoreState.NEW;
  }

  public async initialise() {
    this.state = CoreState.INITIALIZING;

    for (const pkg of this.config.packages) {
      pkg.setCore(this);

      await pkg.initialise();
    }

    this.state = CoreState.INITIALIZED;
  }
}
