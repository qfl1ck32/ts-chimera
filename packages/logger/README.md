# @ts-phoenix/logger

A powerful and customizable logging library for TypeScript projects that makes logging messages a breeze. With support for various log levels and built-in event emission, this logger provides a flexible and extensible solution for your logging needs.

## Features

- Multiple log levels: `info`, `error`, `warn` and `debug`
- Easy customization using `chalk` for colored log outputs
- Emits events before and after logging with `message` and `level` information

## Installation

Install the package using npm or yarn:

```
npm i @ts-phoenix/logger
```

## Usage

Here's a basic example of how to use _@ts-phoenix/logger_:

```ts
import { EventManager } from '@ts-phoenix/event-manager';
import { Logger, LogLevel } from '@ts-phoenix/logger';

const eventManager = new EventManager();
const logger = new Logger(eventManager);

async function main() {
  await logger.info('This is an info message');
  await logger.error('This is an error message');
  await logger.warn('This is a warning message');
  await logger.debug('This is a debug message');
}

main();
```

### Events

When a message is logged, the logger emits two events: one before displaying the message and one after it. Both events contain the `message` and `level` properties. The `level` property can have one of the following values, represented by the `LogLevel` enumeration:

```ts
export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)
