import { Event } from '@ts-phoenix/event-manager';

import { ApolloEventData } from './defs';

export class BeforeApolloServerStartEvent extends Event {}
export class AfterApolloServerStartEvent extends Event<ApolloEventData> {}

export class BeforeApolloServerStopEvent extends Event<ApolloEventData> {}
