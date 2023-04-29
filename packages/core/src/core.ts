/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Container } from './container';
import { CoreConfig, CoreState } from './defs';
import { DependencyNotFoundError } from './errors';

export class Core {
  private _state: CoreState;

  private _container!: Container;

  constructor(private config: CoreConfig) {
    this._state = CoreState.NEW;
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
        skipBaseClassChecks: true,
      });
    }

    return this._container;
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
    }

    this._state = CoreState.INITIALIZING;

    for (const pkg of this.config.packages) {
      await pkg.bind();
    }

    for (const pkg of this.config.packages) {
      await pkg.initialise();
    }

    this._state = CoreState.INITIALIZED;
  }

  async shutdown() {
    // TODO
  }
}
