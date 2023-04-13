import { Event } from '@ts-chimera/event-manager';

export class LanguageChangedEvent extends Event<{ language: string }> {}
