import { describe, it, expect, vi } from 'vitest';
import { OnEvent } from '../src/events.decorator';
import { EventsRegistry } from '../src/events.registry';

vi.spyOn(EventsRegistry, 'registerHandler').mockImplementation(() => {});

const mockContext = {
    kind: 'method',
    name: 'someMethod',
    toString: () => 'someMethod',
} as any;

describe('OnEvent Decorator', () => {
    it('should register the method with EventsRegistry', () => {
        const message = 'TEST_EVENT';
        const mockTarget = {};

        const decorator = OnEvent(message);
        decorator(mockTarget, mockContext);

        expect(EventsRegistry.registerHandler).toHaveBeenCalledWith(
            message,
            'someMethod',
            mockTarget,
        );
    });

    it('should throw an error if not used on a method', () => {
        const message = 'ANOTHER_EVENT';
        const mockTarget = {};
        const invalidContext = {
            kind: 'field',
            name: 'someField',
        } as any;

        const decorator = OnEvent(message);

        expect(() => {
            decorator(mockTarget, invalidContext);
        }).toThrow('@OnEvent can only be used on methods');
    });

    it('should preserve the original method behavior', () => {
        const message = 'ANOTHER_EVENT';

        const originalMethod = function () {
            return 'working!';
        };

        const mockMethodContext = {
            kind: 'method',
            name: 'anotherMethod',
            toString: () => 'anotherMethod',
            addInitializer: vi.fn(),
        } as any;

        const decorator = OnEvent(message);
        decorator(originalMethod, mockMethodContext);
        expect(originalMethod()).toBe('working!');

        expect(EventsRegistry.registerHandler).toHaveBeenCalledWith(
            message,
            'anotherMethod',
            originalMethod,
        );
    });
});
