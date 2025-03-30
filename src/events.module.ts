import { Module } from '@cmmv/core';

import { EventsService } from './events.service.js';

export const EventsModule = new Module('events', {
    providers: [EventsService],
});
