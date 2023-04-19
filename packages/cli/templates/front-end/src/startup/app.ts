import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';

@Injectable()
export class AppPackage extends Package {
  async initialise() {
    console.log('Welcome!');
  }
}
