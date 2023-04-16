import { Event } from '@ts-phoenix/event-manager';

import { LogEventData } from './defs';

export class BeforeLogEvent extends Event<LogEventData> {}

export class AfterLogEvent extends Event<LogEventData> {}
