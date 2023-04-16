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
export interface Config {
  message: string;
  requiredField: string;
}

export type RequiredConfig = Pick<Config, 'requiredField'>;
```

```ts
// tokens.ts
import { Config } from './defs.ts';

export const CONFIG_TOKEN = new Token<Config>('CONFIG_TOKEN');
```

```ts
// service.ts
import {
  CoreBeforeInitialiseEvent,
  CoreAfterInitialiseEvent,
} from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { EventManger } from '@ts-phoenix/event-manager';

@Injectable()
export class MyService {
  constructor(
    @Inject(EventManager) private readonly eventManager: EventManager,
    @Inject(CONFIG_TOKEN) private readonly config: Config,
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

@Injectable()
class MyPackage extends Package<Config, RequiredConfig> {
  public getServices() {
    // We need to provide the services here, so they are constructed when the package is initialised, in order to be able to hook into core's lifecycle events
    return [MyService];
  }

  public getDependencies() {
    return [
      createPackageDependency(SomeOtherPackage, {
        // you need to provide the required config & you can override the default one
      }),
    ];
  }

  public getDefaultConfig() {
    return {
      message: 'Hi', // you don't need to provide requiredField in the default config
    };
  }

  public async initialise() {
    this.setConfigToken(CONFIG_TOKEN);
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
