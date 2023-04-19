# @ts-phoenix/core

The heart of the @ts-phoenix ecosystem, providing a robust foundation for building scalable and maintainable web applications in TypeScript.

## Features

- Manage application state and lifecycle
- Efficiently handle package dependencies
- Centralized dependency injection for improved code reusability and testability

## Installation

Install the package using npm or yarn:

```
npm i @ts-phoenix/core
```

# Features

### Packages

A package is a modular, self-contained unit that encapsulates a specific functionality or feature. Packages can have their own configuration, dependencies, and services. They are designed to be easily combined, allowing developers to build complex applications by assembling multiple packages together. By using packages, you can maintain a clean separation of concerns, promote reusability, and simplify the overall structure of your application.

### Core

The Core class serves as the central hub that manages the lifecycle of all packages in your application. It is responsible for initializing packages, handling dependencies, and managing the application state. The Core class provides lifecycle events like `BeforeInitialise` and `AfterInitialise`, which can be used to execute specific tasks or set up event listeners in your services.

## Usage

Here's an example of how to use @ts-phoenix/core, including all the features:

```ts
// defs.ts
export interface PackageConfigType {
  message: string;
  requiredField: string;
}

export type PackageRequiredConfigType = Pick<
  PackageConfigType,
  'requiredField'
>;
```

```ts
// config.ts
import { PackageConfigToken } from '@ts-phoenix/core';
import { PackageConfigType } from './defs';

export const MY_PACKAGE_CONFIG_TOKEN =
  new PackageConfigToken<PackageConfigType>('MY_PACKAGE');
```

```ts
// service.ts
import {
  CoreBeforeInitialiseEvent,
  CoreAfterInitialiseEvent,
  Injectable,
  InjectToken,
} from '@ts-phoenix/core';
import { EventManger } from '@ts-phoenix/event-manager';
import { PACKAGE_CONFIG_TOKEN } from './config';
import { PackageConfigType } from './defs';

@Injectable()
export class MyService {
  constructor(
    @Inject(EventManager) private readonly eventManager: EventManager,
    @InjectToken(PACKAGE_CONFIG_TOKEN)
    private readonly config: PackageConfigType,
  ) {
    this.eventManager.addEventListener({
      event: CoreBeforeInitialiseEvent,
      handler: () => console.log('Before initialising'),
    });

    this.eventManager.addEventListener({
      event: CoreAfterInitialiseEvent,
      handler: () => console.log('After initialising'),
    });
  }

  public showConfig() {
    console.log(this.config);
  }
}
```

```ts
// package.ts
import { Package, Injectable, createPackageDependency } from '@ts-phoenix/core';
import { MyService } from './service';
import { PackageConfigType, PackageRequiredConfigType } from './defs';
import { CONFIG_TOKEN } from './config';

@Injectable()
class MyPackage extends Package<Config, RequiredConfig> {
  public getConfigToken() {
    return CONFIG_TOKEN;
  }

  public getDependencies() {
    return [SomeOtherPackage];
  }

  public getDefaultConfig() {
    return {
      message: 'Hi', // you don't need to provide requiredField in the default config
    };
  }
}
```

```ts
// core.ts
import { Core } from '@ts-phoenix/core';
import { MyPackage } from './package';
import { MyService } from './service';

const core = new Core({
  packages: [
    new MyPackage({
      requiredField: ':D', // this is required; you can still override "message" too
    }),
  ],
});

core.initialise().then(() => {
  const myService = core.container.get(MyService);

  myService.showConfig(); // { message: "Hi", requiredField: ":D" }
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)
