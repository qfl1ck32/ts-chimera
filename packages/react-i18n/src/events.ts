import { Event } from '@ts-phoenix/event-manager';

export class LocaleChangedEvent extends Event<{ locale: string }> {}
