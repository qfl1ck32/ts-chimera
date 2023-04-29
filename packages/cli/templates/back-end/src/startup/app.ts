import UserService from '@src/services/User';
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
import { ORMServiceToken } from '@ts-phoenix/node-orm';

export class AppPackage extends Package {
  async beforeExpressServerStart(e: BeforeExpressServerStartEvent) {
    const apollo = this.core.container.get(ApolloServiceToken);
    const orm = this.core.container.get(ORMServiceToken);

    const app = e.data.app;

    await apollo.start(app);

    await orm.initialise();
  }

  async beforeExpressServerStopEvent(e: BeforeExpressServerStopEvent) {
    const apolloService = this.core.container.get(ApolloServiceToken);
    const ormService = this.core.container.get(ORMServiceToken);

    await apolloService.stop();
    await ormService.destroy();
  }

  async beforeApolloServerStart(e: BeforeApolloServerStartEvent) {
    const graphqlService = this.core.container.get(GraphQLServiceToken);
    const apolloService = this.core.container.get(ApolloServiceToken);

    const schema = await graphqlService.generateSchema();

    apolloService.setSchema(schema);
  }

  public bind() {
    // TODO: tokens
    this.core.container.bind(UserService).to(UserService).inSingletonScope();
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
