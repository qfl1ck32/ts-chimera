import { Injectable } from '@ts-chimera/di';

import { Core } from '@src/core';
import { Package } from '@src/package';
import { Service } from '@src/defs';

describe('core', () => {
  it('should work', async () => {
    @Injectable()
    class MyService implements Service {
      public initialised: boolean;

      constructor() {
        this.initialised = false;
      }

      async initialise() {
        this.initialised = true;
      }
    }

    class MyPackage extends Package {
      getServices() {
        return [MyService];
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
