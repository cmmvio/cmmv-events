import { ConfigSchema } from '@cmmv/core';

export const EventsConfig: ConfigSchema = {
  queue: {
    type: {
      required: true,
      type: 'string',
      default: 'rabbitmq',
    },
    url: {
      required: true,
      type: 'string',
      default: 'amqp://guest:guest@localhost:5672/cmmv',
    },
  },
};
