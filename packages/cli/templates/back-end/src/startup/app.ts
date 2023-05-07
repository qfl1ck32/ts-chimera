import { Package } from '@ts-phoenix/core';
import { EventManagerServiceToken } from '@ts-phoenix/event-manager';
import {
  ApolloServiceToken,
  BeforeApolloServerStartEvent,
} from '@ts-phoenix/node-apollo';
import {
  BeforeExpressServerStartEvent,
  BeforeExpressServerStopEvent,
  ExpressServiceToken,
} from '@ts-phoenix/node-express';
import { GraphQLServiceToken } from '@ts-phoenix/node-graphql';

export class AppPackage extends Package {
  async beforeExpressServerStart(e: BeforeExpressServerStartEvent) {
    const apollo = this.core.container.get(ApolloServiceToken);

    const app = e.data.app;

    await apollo.start(app);
  }

  async beforeExpressServerStopEvent(e: BeforeExpressServerStopEvent) {
    const apolloService = this.core.container.get(ApolloServiceToken);

    await apolloService.stop();
  }

  async beforeApolloServerStart(e: BeforeApolloServerStartEvent) {
    const graphqlService = this.core.container.get(GraphQLServiceToken);
    const apolloService = this.core.container.get(ApolloServiceToken);

    const schema = await graphqlService.generateSchema();

    apolloService.setSchema(schema);
  }

  public async initialise() {
    const expressService = this.core.container.get(ExpressServiceToken);
    const eventManagerService = this.core.container.get(
      EventManagerServiceToken,
    );

    eventManagerService.addListener({
      event: BeforeExpressServerStartEvent,
      handler: this.beforeExpressServerStart.bind(this),
    });

    eventManagerService.addListener({
      event: BeforeExpressServerStopEvent,
      handler: this.beforeExpressServerStopEvent.bind(this),
    });

    eventManagerService.addListener({
      event: BeforeApolloServerStartEvent,
      handler: this.beforeApolloServerStart.bind(this),
    });

    await expressService.start();
  }
}
