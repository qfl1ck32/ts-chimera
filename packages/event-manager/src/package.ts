import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { Constructor } from '@ts-phoenix/typings';

import { EventManager } from './service';

@Injectable()
export class EventManagerPackage extends Package {
  registerServices(): Constructor[] {
    return [EventManager];
  }
}
