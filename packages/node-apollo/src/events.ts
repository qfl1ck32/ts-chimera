import { Event } from '@ts-phoenix/event-manager';

import { GraphQLEventData } from './defs';

export class BeforeServerStartEvent extends Event<GraphQLEventData> {}
export class AfterServerStartEvent extends Event<GraphQLEventData> {}

export class BeforeServerStopEvent extends Event<GraphQLEventData> {}
