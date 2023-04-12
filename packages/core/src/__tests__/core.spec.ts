import { Inject, Injectable } from '@ts-chimera/di';
import { EventManager } from '@ts-chimera/event-manager';

import { Core, CoreBeforeInitialiseEvent, Package } from '@src/index';

describe('core', () => {
  it('should work', async () => {
    @Injectable()
    class MyService {
      public initialised: boolean;

      constructor(
        @Inject(EventManager) private readonly eventManager: EventManager,
      ) {
        this.initialised = false;

        this.eventManager.addListener({
          event: CoreBeforeInitialiseEvent,
          handler: this.initialise.bind(this),
        });
      }

      async initialise() {
        this.initialised = true;
      }
    }

    class MyPackage extends Package {
      public getServices() {
        return [MyService];
      }

      public getDefaultConfig() {
        return {};
      }
    }

    const core = new Core({
      packages: [new MyPackage()],
    });

    await core.initialise();

    const myService = core.container.get(MyService);

    expect(myService).toBeInstanceOf(MyService);

    expect(myService.initialised).toBe(true);
  });
});
