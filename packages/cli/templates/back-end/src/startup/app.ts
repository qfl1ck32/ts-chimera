import { Package } from '@ts-phoenix/core';
import { Injectable } from '@ts-phoenix/di';
import { Listener } from '@ts-phoenix/event-manager';
import {
  Apollo,
  BeforeServerStartEvent as BeforeApolloServerStartEvent,
} from '@ts-phoenix/node-apollo';
import {
  Express,
  BeforeServerStartEvent as BeforeExpressServerStartEvent,
  BeforeServerStopEvent as BeforeExpressServerStopEvent,
} from '@ts-phoenix/node-express';
import { GraphQL } from '@ts-phoenix/node-graphql';
import { ORM } from '@ts-phoenix/node-orm';

@Injectable()
export class AppPackage extends Package {
  @Listener({
    event: BeforeExpressServerStartEvent,
  })
  async beforeExpressServerStart(e: BeforeExpressServerStartEvent) {
    const apollo = this.core.container.get(Apollo);
    const orm = this.core.container.get(ORM);

    const app = e.data.app;

    await apollo.start(app);

    await orm.initialise();
  }

  @Listener({
    event: BeforeExpressServerStopEvent,
  })
  async beforeExpressServerStopEvent(e: BeforeExpressServerStopEvent) {
    const apollo = this.core.container.get(Apollo);
    const orm = this.core.container.get(ORM);

    await apollo.stop();
    await orm.destroy();
  }

  @Listener({
    event: BeforeApolloServerStartEvent,
  })
  async beforeApolloServerStart(e: BeforeApolloServerStartEvent) {
    const graphql = this.core.container.get(GraphQL);
    const apollo = this.core.container.get(Apollo);

    const schema = await graphql.generateSchema();

    await apollo.setSchema(schema);
  }

  public async initialise() {
    const express = this.core.container.get(Express);

    await express.start();
  }
}
