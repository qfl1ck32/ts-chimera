import { Event } from '@ts-phoenix/event-manager';

import { ApolloEventData } from './defs';

export class BeforeServerStartEvent extends Event {}
export class AfterServerStartEvent extends Event<ApolloEventData> {}

export class BeforeServerStopEvent extends Event<ApolloEventData> {}
