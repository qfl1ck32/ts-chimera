import { Event } from '@ts-phoenix/event-manager';

import { ExpressEventData } from './defs';

export class BeforeExpressServerStartEvent extends Event<ExpressEventData> {}
export class AfterExpressServerStartEvent extends Event<ExpressEventData> {}

export class BeforeExpressServerStopEvent extends Event<ExpressEventData> {}
