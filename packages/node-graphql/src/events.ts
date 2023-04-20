import { Event } from '@ts-phoenix/event-manager';

import { GraphQLEventData } from './defs';

export class BeforeGraphQLInitialiseEvent extends Event<GraphQLEventData> {}
