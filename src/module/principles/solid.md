# SOLID

## Single-responsibility principle

Define interfaces / classes that take care of one thing only.

The dependency inversion principle helps to adhere to the single-responsibility principle by allowing you to separate concerns into different modules. For example, the high-level module can provide a more abstract interface, while the low-level module can focus on implementing the details.

## Open-closed principle

Since we are relying on abstractions, we don’t have to make changes on our calling code, if we wish to change an implementation.

The dependency inversion principle can help you design your code in a way that is open for extension but closed for modification. By depending on abstractions rather than concrete implementations, you can more easily extend the functionality of your code without modifying existing code.

## Liskov substitution principle

We can replace any of our objects by another one as long as they implement the same interface.

The dependency inversion principle can help you adhere to the Liskov substitution principle by allowing you to substitute different implementations of a module without affecting the high-level module.

## Interface segregation principle

Create a custom interface that extends a base interface, and we’re using that one to bind our implementation. That way, we keep our base interface clean and we can add custom methods on our custom interfaces.

The dependency inversion principle promotes the use of small, specific interfaces that only expose the methods that are needed by the high-level module. This can help you adhere to the interface segregation principle by not forcing the high-level module to depend on unnecessary methods.

## Dependency inversion principle

We’re relying on interfaces everywhere.

The dependency inversion principle helps you design more maintainable and scalable software by promoting loose coupling between components and adhering to the SOLID principles.
