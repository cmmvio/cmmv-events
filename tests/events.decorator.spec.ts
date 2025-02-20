import { describe, it, expect, vi } from 'vitest';
import { OnEvent } from '../src/events.decorator';
import { EventsRegistry } from '../src/events.registry';

vi.spyOn(EventsRegistry, 'registerConsumeHandler');

describe('OnEvent Decorator', () => {
  it('should register the method with EventsRegistry', () => {
    const message = 'TEST_EVENT';

    class TestClass {
      @OnEvent(message)
      someMethod() {
        return 'executed';
      }
    }

    expect(EventsRegistry.registerConsumeHandler).toHaveBeenCalledWith(
      expect.any(Object),
      message,
      'someMethod',
      expect.any(Function),
    );
  });

  it('should preserve the original method behavior', () => {
    const message = 'ANOTHER_EVENT';

    class AnotherClass {
      @OnEvent(message)
      anotherMethod() {
        return 'working!';
      }
    }

    const instance = new AnotherClass();
    expect(instance.anotherMethod()).toBe('working!');
  });
});
