import { Injectable } from '@ts-phoenix/di';
import { Resolver as BaseResolver, ClassType } from 'type-graphql';
import {
  AbstractClassOptions,
  ClassTypeResolver,
} from 'type-graphql/dist/decorators/types';

type ResolverParams<T> =
  | []
  | [options: AbstractClassOptions]
  | [typeFunc: ClassTypeResolver, options?: AbstractClassOptions]
  | [objectType: ClassType<T>, options?: AbstractClassOptions];

export const Resolver = <T>(...params: ResolverParams<T>): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: any) {
    Injectable()(target); //

    if (params.length === 0) {
      BaseResolver()(target);
    } else if (params.length === 1 && typeof params[0] === 'object') {
      BaseResolver(params[0] as AbstractClassOptions)(target);
    } else if (params.length === 1 && typeof params[0] === 'function') {
      BaseResolver(params[0] as ClassTypeResolver)(target);
    } else {
      BaseResolver(
        params[0] as ClassType<T>,
        params[1] as AbstractClassOptions,
      )(target);
    }
  };
};
