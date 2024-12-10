import { EventsRegistry } from './events.registry';

export function OnEvent(message: string): MethodDecorator {
  return (
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    EventsRegistry.registerConsumeHandler(
      target,
      message,
      propertyKey as string,
      descriptor.value,
    );
  };
}
