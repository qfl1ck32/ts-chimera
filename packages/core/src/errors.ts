import { Error } from '@ts-phoenix/error';

export class ConfigNotFoundError extends Error<{
  packageName: string;
}> {
  getMessage() {
    const packageName = this.data.packageName;

    return `Missing config for package "${packageName}". Perhaps you forgot to add it to the core.`;
  }
}

export class DependencyNotFoundError extends Error<{
  dependency: string;
  dependent: string;
}> {
  getMessage() {
    return `The package "${this.data.dependent}" depends on "${this.data.dependency}", but it was not found in the core.`;
  }
}

export class ServiceNotFoundError extends Error<{
  serviceName: string;
}> {
  getMessage() {
    return `The service "${this.data.serviceName}" was not found in the core. Make sure to include the package that it's contained in.`;
  }
}
