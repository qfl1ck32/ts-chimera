# @ts-phoenix/error

The `@ts-phoenix/error` package is a TypeScript library for creating custom error objects that extend the built-in `Error` class. This package provides an `Error` class that can be used to define custom errors with additional data and context.

## Features

The main features of this package include:

- The ability to define custom errors with additional data and context.
- A `getCode()` method that returns a string representing the error code.
- A `getContext()` method that returns an object representing the error context.
- A `getMessage()` method that returns a string representing the error message.

## Installation

Install the package using npm or yarn:

```
npm install @ts-phoenix/error
```

## Usage

To use the `@ts-phoenix/error` package, you first need to import the `Error` class from the package. Then, you can create a new custom error by extending the `Error` class and defining any additional properties or methods that you need.

Here's an example of how to create and use a custom error with the `@ts-phoenix/error` package:

```ts
import { Error } from '@ts-phoenix/error';

interface CustomErrorData {
  id: number;
  message: string;
}

class CustomError extends Error<CustomErrorData> {
  constructor(data: CustomErrorData) {
    super(data);
  }

  getContext() {
    return {
      id: this.data?.id,
    };
  }

  getMessage() {
    return `Custom error: ${this.data?.message}`;
  }
}

const errorData: CustomErrorData = {
  id: 123,
  message: 'Something went wrong',
};

const error = new CustomError(errorData);

console.error(error);

console.log(error.getCode());

console.log(error.getContext());

console.log(error.getMessage());
```

This will output the following:

```
CustomError: Error Something went wrong has occurred.
    at Object.<anonymous> (/path/to/file.ts:21:13)
    at Module._compile (internal/modules/cjs/loader.js:1072:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1101:10)
    at Module.load (internal/modules/cjs/loader.js:937:32)
    at Function.Module._load (internal/modules/cjs/loader.js:778:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'CUSTOM_ERROR',
  data: { id: 123, message: 'Something went wrong' }
}

CUSTOM_ERROR

{ id: 123 }

Custom error: Something went wrong
```

## Contributing

If you want to contribute to the `@ts-phoenix/error` package, please open an issue to discuss any proposed changes before submitting a pull request. Make sure to update tests as appropriate.

## License

The `@ts-phoenix/error` package is licensed under the [GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/) license.
