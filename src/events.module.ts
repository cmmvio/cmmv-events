import { Module } from '@cmmv/core';

import { EventsConfig } from './events.config';
import { EventsService } from './events.service';

export const EventsModule = new Module('events', {
  configs: [EventsConfig],
  providers: [EventsService],
});
