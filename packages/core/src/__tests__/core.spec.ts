import { Injectable } from '@ts-phoenix/di';

import { DependencyNotFoundError } from '@src/errors';
import { PackageConfigToken, Core, Package, PartialConfig } from '@src/index';

describe('core', () => {
  it('should work', async () => {
    @Injectable()
    class MyService {
      public initialised: boolean;

      constructor() {
        this.initialised = false;
      }

      public initialise() {
        this.initialised = true;
      }
    }

    @Injectable()
    class MyPackage extends Package {
      async initialise() {
        const myService = this.core.container.get(MyService);

        myService.initialise();
      }

      registerServices() {
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

  it('should work with multiple packages', async () => {
    interface PackageConfig {
      name: string;
    }

    const MY_PACKAGE_CONFIG = new PackageConfigToken<PackageConfig>(
      'MY_PACKAGE',
    );

    @Injectable()
    class MyPackage extends Package<PackageConfig> {
      public getConfigToken() {
        return MY_PACKAGE_CONFIG;
      }

      public getDefaultConfig(): Partial<PackageConfig> {
        return {
          name: 'hello',
        };
      }
    }

    const newName = 'ModifiedByMyOtherPackage';

    class MyOtherPackage extends Package {
      public getDependencies() {
        return [MyPackage];
      }
    }

    let core = new Core({
      packages: [new MyOtherPackage()],
    });

    await expect(core.initialise()).rejects.toThrowError(
      DependencyNotFoundError,
    );

    core = new Core({
      packages: [
        new MyOtherPackage(),
        new MyPackage({
          name: newName,
        }),
      ],
    });

    await core.initialise();

    const config = core.container.getPackageConfigToken(MY_PACKAGE_CONFIG);

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

    const MY_PACKAGE_CONFIG = new PackageConfigToken<PackageConfig>(
      'MY_PACKAGE',
    );

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
        };
      }
    }

    @Injectable()
    class MyOtherPackage extends Package {
      public getDependencies() {
        return [MyPackage];
      }
    }

    const core = new Core({
      packages: [
        new MyPackage({
          requiredStuff,
        }),
        new MyOtherPackage(),
      ],
    });

    await core.initialise();

    const config = core.container.getToken(MY_PACKAGE_CONFIG);

    expect(config).toStrictEqual({
      name,
      requiredStuff,
    });
  });
});
