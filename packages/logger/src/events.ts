import { Event } from '@ts-chimera/event-manager';

import { LogEventData } from './defs';

export class BeforeLogEvent extends Event<LogEventData> {}

export class AfterLogEvent extends Event<LogEventData> {}
