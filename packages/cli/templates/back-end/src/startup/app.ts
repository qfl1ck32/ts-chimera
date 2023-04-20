import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { Apollo } from '@ts-phoenix/node-apollo';
import {
  Express,
  AfterServerStartEvent as AfterExpressServerStartEvent,
  BeforeServerStartEvent as BeforeExpressServerStartEvent,
  BeforeServerStopEvent as BeforeExpressServerStopEvent,
} from '@ts-phoenix/node-express';
import { ORM } from '@ts-phoenix/node-orm';

@Injectable()
export class AppPackage extends Package {
  public async initialise() {
    const express = this.core.container.get(Express);
    const apollo = this.core.container.get(Apollo);
    const orm = this.core.container.get(ORM);

    this.core.eventManager.addListener({
      event: BeforeExpressServerStartEvent,
      handler: async (e) => {
        const app = e.data!.app;

        await apollo.start(app);

        await orm.initialise();
      },
    });

    this.core.eventManager.addListener({
      event: BeforeExpressServerStopEvent,
      handler: async () => {
        await apollo.stop();
      },
    });

    await express.start();
  }
}
