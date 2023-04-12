import { BindingScopeEnum, Container, Injectable, Token } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';

import { CoreState } from './defs';
import { CoreAfterInitialiseEvent, CoreBeforeInitialiseEvent } from './events';
import { Package } from './package';

@Injectable()
class Test {}

@Injectable()
export class Core {
  private _state: CoreState;
  private containerInstance!: Container;

  private eventManager: EventManager;

  constructor(private config: { packages: Package[] }) {
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
  }

  get state() {
    return this._state;
  }

  get isInitialised() {
    return this.state === CoreState.INITIALIZED;
  }

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

  public setToken<T>(token: Token<T>, value: T) {
    this.container.bind(token.identifier).toConstantValue(value);
  }

  public async initialise() {
    for (const pkg of this.config.packages) {
      pkg.setCore(this);
    }

    for (const pkg of this.config.packages) {
      for (const ServiceClass of pkg.getServices()) {
        // TODO: should be some kind of "bind"
        this.container.get(ServiceClass);
      }
    }

    await this.eventManager.emitAsync(new CoreBeforeInitialiseEvent());
    await this.eventManager.emitAsync(new CoreAfterInitialiseEvent());
  }
}
