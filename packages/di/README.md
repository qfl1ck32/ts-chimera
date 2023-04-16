# @ts-chimera/di

`@ts-chimera/di` is a dependency injection package for TypeScript projects, built on top of Inversify. It provides a simple and clean API to manage dependencies using tokens, making it easier to organize and maintain your code.

## Features

- Simple and clean API for dependency injection
- Built on top of the robust Inversify library
- Supports custom tokens for identifying dependencies
- Provides utility functions for working with tokens and containers

## Installation

Install the package using npm or yarn:

```
npm i @ts-chimera/di
```

## Usage

Here's a basic example of how to use _@ts-chimera/di_:

```ts
import {
  Container,
  InjectToken,
  Injectable,
  Token,
  setToken,
} from '@ts-chimera/di';

// Define tokens for configuration data
const ApiBaseUrlToken = new Token<string>('ApiBaseUrl');
const ApiKeyToken = new Token<string>('ApiKey');

@Injectable()
class ApiService {
  constructor(
    @InjectToken(ApiBaseUrlToken) private apiBaseUrl: string,
    @InjectToken(ApiKeyToken) private apiKey: string,
  ) {}

  fetchData() {
    console.log(
      `Fetching data from ${this.apiBaseUrl} using API key: ${this.apiKey}`,
    );
  }
}

// Create a new Inversify container
const container = new Container();

// Set the token values for the configuration data
setToken(ApiBaseUrlToken, 'https://api.example.com', container);
setToken(ApiKeyToken, 'your-api-key', container);

// Bind ApiService to the container
container.bind(ApiService).toSelf();

// Retrieve an instance of ApiService with the injected configuration data
const apiService = container.get<ApiService>(ApiService);
apiService.fetchData(); // Outputs: "Fetching data from https://api.example.com using API key: your-api-key"
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)
