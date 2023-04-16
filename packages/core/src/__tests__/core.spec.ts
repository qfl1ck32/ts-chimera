import { Inject, Injectable } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';
import { Constructor } from '@ts-phoenix/typings';

import { CircularDependencyError } from '@src/errors';
import {
  Core,
  CoreBeforeInitialiseEvent,
  Package,
  PackageDependency,
  PartialConfig,
} from '@src/index';
import { createPackageDependency } from '@src/utils';

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
      public getServices(): Constructor[] {
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

  it('should throw when circular dependency', async () => {
    class MyPackage extends Package {
      public getServices() {
        return [];
      }

      public getDependencies(): PackageDependency[] {
        return [createPackageDependency(MyOtherPackage)];
      }
    }

    class MyOtherPackage extends Package {
      public getServices(): Constructor[] {
        return [];
      }

      public getDependencies(): PackageDependency[] {
        return [createPackageDependency(MyPackage)];
      }
    }

    const core = new Core({
      packages: [new MyOtherPackage()],
    });

    await expect(core.initialise()).rejects.toThrowError(
      CircularDependencyError,
    );
  });

  it('should work with multiple packages', async () => {
    interface PackageConfig {
      name: string;
    }

    class MyPackage extends Package<PackageConfig> {
      public getServices(): Constructor[] {
        return [];
      }

      public getDependencies(): PackageDependency[] {
        return [];
      }
    }

    const newName = 'ModifiedByMyOtherPackage';

    class MyOtherPackage extends Package<PackageConfig> {
      public getServices(): Constructor[] {
        return [];
      }

      public getDependencies(): PackageDependency[] {
        return [
          createPackageDependency(MyPackage, {
            name: newName,
          }),
        ];
      }
    }

    const core = new Core({
      packages: [new MyOtherPackage()],
    });

    await core.initialise();

    const myPackage = core.container.get(MyPackage);

    expect(myPackage.config.name).toBe(newName);
  });

  it('should work with required config', async () => {
    interface PackageConfig {
      name: string;
      requiredStuff: string;
    }

    interface RequiredPackageConfig
      extends Pick<PackageConfig, 'requiredStuff'> {}

    const name = 'Hi';
    const requiredStuff = 'hi';
    class MyPackage extends Package<PackageConfig, RequiredPackageConfig> {
      public getDefaultConfig(): PartialConfig<
        PackageConfig,
        RequiredPackageConfig
      > {
        return {
          name,
          requiredStuff: undefined,
        };
      }
    }

    class MyOtherPackage extends Package {
      public getDependencies(): PackageDependency<any, any>[] {
        return [
          createPackageDependency(MyPackage, {
            requiredStuff,
          }),
        ];
      }
    }

    const core = new Core({
      packages: [new MyOtherPackage()],
    });

    await core.initialise();

    const pkg = core.container.get(MyPackage);

    expect(pkg.config).toStrictEqual({
      name,
      requiredStuff,
    });
  });
});
