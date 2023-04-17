import { Error } from '@ts-phoenix/error';

export class ServiceIdentifierNotFoundError extends Error<{
  name: string;
}> {
  getMessage() {
    return `Service identifier not found: ${this.data!.name};`;
  }
}
