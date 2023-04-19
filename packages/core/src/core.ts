/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BindingScopeEnum, Injectable, Token } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';

import { Container } from './container';
import { CoreConfig, CoreState } from './defs';
import { DependencyNotFoundError } from './errors';
import {
  CoreAfterInitialiseEvent,
  CoreBeforeInitialiseEvent,
  CoreBeforeShutdownEvent,
} from './events';
import { CONTAINER } from './tokens';

@Injectable()
export class Core {
  private _state: CoreState;

  private _container!: Container;

  public eventManager: EventManager;

  constructor(private config: CoreConfig) {
    this._state = CoreState.NEW;

    this.eventManager = this.container.get(EventManager);

    this.eventManager.addListener({
      event: CoreBeforeInitialiseEvent,
      handler: () => {
        this._state = CoreState.INITIALIZING;
      },
    });

    this.eventManager.addListener({
      event: CoreAfterInitialiseEvent,
      handler: () => {
        this._state = CoreState.INITIALIZED;
      },
    });

    this.setToken(CONTAINER, this.container);
    this.container.bind(Core).toConstantValue(this);
  }

  get state() {
    return this._state;
  }

  get isNew() {
    return this.state === CoreState.NEW;
  }

  get isInitialised() {
    return this.state === CoreState.INITIALIZED;
  }

  get isInitialising() {
    return this.state === CoreState.INITIALIZING;
  }

  get container() {
    if (this._container == null) {
      this._container = new Container({
        autoBindInjectable: true,
        skipBaseClassChecks: true,
        defaultScope: BindingScopeEnum.Singleton,
      });
    }

    return this._container;
  }

  public setToken<T>(token: Token<T>, value: T) {
    this.container.bind(token.identifier).toConstantValue(value);
  }

  private checkPackagesDependencies() {
    for (const pkg of this.config.packages) {
      const dependencies = pkg.getDependencies();

      for (const PackageDependency of dependencies) {
        if (
          !this.config.packages.some((pkg) => pkg instanceof PackageDependency)
        ) {
          throw new DependencyNotFoundError({
            dependency: PackageDependency.name,
            dependent: pkg.constructor.name,
          });
        }
      }
    }
  }

  public async initialise() {
    if (!this.isNew) {
      return;
    }

    this.checkPackagesDependencies();

    for (const pkg of this.config.packages) {
      // @ts-ignore
      pkg.__setCore(this);

      // @ts-ignore
      pkg.__setConfigToken();

      if (!this.container.isBound(pkg.constructor)) {
        this.container.bind(pkg.constructor).toConstantValue(pkg);
      }
    }

    for (const pkg of this.config.packages) {
      await pkg.initialise();
    }

    await this.eventManager.emitAsync(new CoreBeforeInitialiseEvent());
    await this.eventManager.emitAsync(new CoreAfterInitialiseEvent());
  }

  async shutdown() {
    await this.eventManager.emitAsync(new CoreBeforeShutdownEvent());
  }
}
