/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BindingScopeEnum, Container, Injectable, Token } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';

import { CoreState } from './defs';
import { CircularDependencyError } from './errors';
import { CoreAfterInitialiseEvent, CoreBeforeInitialiseEvent } from './events';
import { Package } from './package';
import { CONTAINER } from './tokens';

@Injectable()
export class Core {
  private _state: CoreState;

  private _container!: Container;

  private eventManager: EventManager;

  constructor(
    private config: {
      packages: Array<Package | Package<any, null>>;
    },
  ) {
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

  private buildPackagesDependencyList(packages: Package[]): Package[] {
    const result: Package[] = [];
    const visited = new Set<Package>();
    const visiting = new Set<Package>();

    const visit = (pkg: Package) => {
      if (visited.has(pkg)) {
        return;
      }

      if (visiting.has(pkg)) {
        throw new CircularDependencyError({
          dependencies: Array.from(visiting).map((p) => p.constructor.name),
        });
      }

      visiting.add(pkg);

      const dependencies = pkg.getDependencies().map((dependency) => {
        const pkg = this.container.get(
          dependency.PackageConstructor,
        ) as Package;

        if (dependency.config?.[0]) {
          // @ts-ignore
          pkg.__mergeConfig(dependency.config[0]);
        }

        return pkg;
      });

      for (const dep of dependencies) {
        visit(dep);
      }

      visited.add(pkg);
      visiting.delete(pkg);
      result.push(pkg);
    };

    for (const pkg of packages) {
      visit(pkg);
    }

    return result;
  }

  public async initialise() {
    if (!this.isNew) {
      return;
    }

    const packages = this.buildPackagesDependencyList(this.config.packages);

    for (const pkg of packages) {
      // @ts-ignore
      pkg.__setCore(this);

      // @ts-ignore
      pkg.__setConfigToken();

      if (!this.container.isBound(pkg.constructor)) {
        this.container.bind(pkg.constructor).toConstantValue(pkg);
      }
    }

    for (const pkg of packages) {
      const services = pkg.initialiseServices();

      for (const ServiceClass of services) {
        try {
          this.container.get(ServiceClass);
        } catch (e) {
          // already bound to the container
        }
      }
    }

    await this.eventManager.emitAsync(new CoreBeforeInitialiseEvent());

    await this.eventManager.emitAsync(new CoreAfterInitialiseEvent());
  }
}
