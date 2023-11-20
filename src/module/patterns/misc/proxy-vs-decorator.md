# Proxy vs Decorator

The Decorator Design Pattern and the Proxy Design Pattern are both structural patterns that involve composition and allow you to alter the behavior of an object. However, they serve different purposes and have distinct use cases.

## Decorator Design Pattern

1. Purpose:

- The Decorator pattern is used to add new functionality to an object dynamically without altering its structure.
- It is focused on extending or enhancing the behavior of an object by wrapping it with one or more decorator classes.

2. Structure:

- The core component and the decorators share a common interface or base class.
- Decorator classes have a reference to the component they decorate.

  3.Example:

- Adding new features to a text editor (e.g., bold, italic, underline) without modifying the base text editor class.

4. Key Characteristics:

- Multiple decorators can be stacked to provide a cumulative effect.
- Decorators and the core component adhere to the same interface or base class.

## Proxy Design Pattern

1. Purpose:

- The Proxy pattern is used to control access to an object. It acts as a surrogate or placeholder for another object to control access to it.
- It is often used for lazy loading, access control, logging, or monitoring.

2. Structure:

- The proxy class has the same interface as the real subject (object being controlled).
- The proxy holds a reference to the real subject and delegates operations to it.

3. Example:

- Controlling access to a sensitive resource (e.g., a database) by using a proxy that checks permissions before allowing the real subject to perform an operation.

4. Key Characteristics:

- The proxy and the real subject implement the same interface.
- The proxy controls access to the real subject by intercepting requests.

## Summary

Decorator Pattern:

- Focuses on adding new responsibilities or behaviors dynamically.
- Acts as a wrapper around the core component.
- Multiple decorators can be combined.

Proxy Pattern:

- Focuses on controlling access to an object.
- Acts as a substitute for the real subject.
- Provides a level of indirection for controlling access.

In essence, the Decorator pattern is more about enhancing or extending functionality, while the Proxy pattern is more about controlling access and providing a level of indirection.
