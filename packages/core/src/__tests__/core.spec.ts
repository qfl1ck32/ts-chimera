import {
  ConfigNotFoundError,
  DependencyNotFoundError,
  ServiceNotFoundError,
} from '@src/errors';
import {
  PackageConfigToken,
  Core,
  Package,
  PartialConfig,
  ServiceToken,
  Service,
  Inject,
} from '@src/index';

describe('core', () => {
  it('should work', async () => {
    interface IMyService {
      initialised: boolean;

      initialise: () => void;
    }

    const MyServiceToken = ServiceToken<IMyService>('MyService');

    @Service()
    class MyService implements IMyService {
      public initialised: boolean;

      constructor() {
        this.initialised = false;
      }

      public initialise() {
        this.initialised = true;
      }
    }

    class MyPackage extends Package {
      async initialise() {
        const myService = this.core.container.get(MyServiceToken);

        myService.initialise();
      }

      public async bind() {
        this.core.container
          .bind(MyServiceToken)
          .to(MyService)
          .inSingletonScope();
      }
    }

    const core = new Core({
      packages: [new MyPackage()],
    });

    await core.initialise();

    const myService = core.container.get(MyServiceToken);

    expect(myService).toBeInstanceOf(MyService);

    expect(myService.initialised).toBe(true);
  });

  it('should work with multiple packages', async () => {
    interface PackageConfig {
      name: string;
    }

    const MY_PACKAGE_CONFIG = PackageConfigToken<PackageConfig>('MY_PACKAGE');

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

    const config = core.container.get(MY_PACKAGE_CONFIG);

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

    const MY_PACKAGE_CONFIG = PackageConfigToken<PackageConfig>('MY_PACKAGE');

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

    const config = core.container.get(MY_PACKAGE_CONFIG);

    expect(config).toStrictEqual({
      name,
      requiredStuff,
    });
  });

  it('should throw error when service not found', async () => {
    const MyServiceToken = ServiceToken('MyService');

    const core = new Core({
      packages: [],
    });

    await core.initialise();

    expect(() => core.container.get(MyServiceToken)).toThrowError(
      ServiceNotFoundError,
    );
  });

  it('should throw error when config not found', async () => {
    interface IMyPackageConfig {
      name: string;
    }

    const MyServiceToken = ServiceToken('MyService');
    const MyPackageConfigToken =
      PackageConfigToken<IMyPackageConfig>('MyPackage');

    @Service()
    class MyService {
      constructor(@Inject(MyPackageConfigToken) configToken: IMyPackageConfig) {
        console.log(configToken);
      }
    }

    class MyPackage extends Package {
      async initialise() {
        const service = this.core.container.get(MyServiceToken);
      }

      bind() {
        this.core.container
          .bind(MyServiceToken)
          .to(MyService)
          .inSingletonScope();
      }
    }

    const core = new Core({
      packages: [new MyPackage()],
    });

    await expect(core.initialise()).rejects.toThrow(ConfigNotFoundError);
  });
});
