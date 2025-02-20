import { EventsRegistry } from './events.registry';

export function OnEvent(message: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    EventsRegistry.registerConsumeHandler(
      target,
      message,
      propertyKey as string,
      descriptor?.value,
    );
  };
}
