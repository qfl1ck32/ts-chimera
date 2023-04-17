import { Injectable } from '@ts-phoenix/di';
import { Constructor } from '@ts-phoenix/typings';

@Injectable()
export class RegisteredServices {
  private registeredServices: Constructor[] = [];

  public register(service: Constructor) {
    if (this.registeredServices.includes(service)) {
      return;
    }

    this.registeredServices.push(service);
  }

  public get() {
    return this.registeredServices;
  }
}
