import { Event } from '@ts-phoenix/event-manager';

import { ServerEventData } from './defs';

export class BeforeServerStartEvent extends Event<ServerEventData> {}
export class AfterServerStartEvent extends Event<ServerEventData> {}

export class BeforeServerStopEvent extends Event<ServerEventData> {}
