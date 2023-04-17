import { Inject, Injectable, Token } from '@ts-phoenix/di';
import { EventManager } from '@ts-phoenix/event-manager';

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

      public initialise() {
        this.initialised = true;
      }
    }

    @Injectable()
    class MyPackage extends Package {
      getConfigToken() {
        return null;
      }

      public initialiseServices() {
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
      getConfigToken() {
        return null;
      }

      public getDependencies(): PackageDependency[] {
        return [createPackageDependency(MyOtherPackage)];
      }
    }

    @Injectable()
    class MyOtherPackage extends Package {
      getConfigToken() {
        return null;
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

    const MY_PACKAGE_CONFIG = new Token<PackageConfig>();

    @Injectable()
    class MyPackage extends Package<PackageConfig> {
      public getDependencies(): PackageDependency[] {
        return [];
      }

      public getConfigToken() {
        return MY_PACKAGE_CONFIG;
      }
    }

    const newName = 'ModifiedByMyOtherPackage';

    class MyOtherPackage extends Package {
      public getDependencies(): PackageDependency[] {
        return [
          createPackageDependency(MyPackage, {
            name: newName,
          }),
        ];
      }

      getConfigToken() {
        return null;
      }
    }

    const core = new Core({
      packages: [new MyOtherPackage()],
    });

    await core.initialise();

    const config = core.container.getToken(MY_PACKAGE_CONFIG);

    expect(config.name).toBe(newName);
  });

  it('should work with required config', async () => {
    interface PackageConfig {
      name: string;
      requiredStuff: string;
    }

    type RequiredPackageConfig = Pick<PackageConfig, 'requiredStuff'>;

    const name = 'Hi';
    const requiredStuff = 'hi';

    const MY_PACKAGE_CONFIG = new Token<PackageConfig>();

    @Injectable()
    class MyPackage extends Package<PackageConfig, RequiredPackageConfig> {
      getConfigToken() {
        return MY_PACKAGE_CONFIG;
      }

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

    @Injectable()
    class MyOtherPackage extends Package {
      getConfigToken() {
        return null;
      }

      public getDependencies(): PackageDependency[] {
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

    const config = core.container.getToken(MY_PACKAGE_CONFIG);

    expect(config).toStrictEqual({
      name,
      requiredStuff,
    });
  });
});
