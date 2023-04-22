import { Event } from '@ts-phoenix/event-manager';

import { ORMEventData } from './defs';

export class BeforeORMInitialiseEvent extends Event {}
export class AfterORMInitialiseEvent extends Event<ORMEventData> {}

export class BeforeORMDestroyEvent extends Event<ORMEventData> {}
