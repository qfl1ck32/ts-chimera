import { Error } from '@ts-chimera/error';

export class CircularDependencyError extends Error<{
  dependencies: string[];
}> {
  getMessage() {
    const dependencies = this.data!.dependencies;

    const dependenciesString = dependencies.join(' -> ');

    return `Circular dependency detected: ${dependenciesString}`;
  }
}
