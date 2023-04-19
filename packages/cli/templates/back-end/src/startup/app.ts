import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { BeforeServerStartEvent } from '@ts-phoenix/node-express';

@Injectable()
export class AppPackage extends Package {
  public async initialise() {
    this.core.eventManager.addListener({
      event: BeforeServerStartEvent,
      handler: async (e) => {
        const app = e.data!.app;

        app.get('/', async (req, res) => {
          res.send('Hello!');
        });
      },
    });
  }
}
