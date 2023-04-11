import { Injectable } from '@ts-chimera/di';

import { Core } from '@src/core';
import { Constructor, Service } from '@src/defs';
import { Package } from '@src/package';

describe('core', () => {
  it('should work', async () => {
    @Injectable()
    class MyService {
      public initialised: boolean;

      constructor() {
        this.initialised = false;
      }

      async init() {
        this.initialised = true;
      }
    }
    class MyPackage extends Package {
      getServices(): Constructor<Service>[] {
        return [MyService];
      }
    }

    const core = new Core({
      packages: [new MyPackage()],
    });

    await core.init();

    const myService = core.container.get(MyService);

    expect(myService).toBeInstanceOf(MyService);

    expect(myService.initialised).toBe(true);
  });
});
