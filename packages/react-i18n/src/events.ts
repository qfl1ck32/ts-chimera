import { Event } from '@ts-chimera/event-manager';

export class LocaleChangedEvent extends Event<{ locale: string }> {}
