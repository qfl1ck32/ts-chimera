import { Event } from '@ts-phoenix/event-manager';

import { ExpressEventData } from './defs';

export class BeforeServerStartEvent extends Event<ExpressEventData> {}
export class AfterServerStartEvent extends Event<ExpressEventData> {}

export class BeforeServerStopEvent extends Event<ExpressEventData> {}
