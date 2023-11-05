# SOLID

## Single-responsibility principle

Define interfaces / classes that take care of one thing only.

The dependency inversion principle helps to adhere to the single-responsibility principle by allowing you to separate concerns into different modules. For example, the high-level module can provide a more abstract interface, while the low-level module can focus on implementing the details.

## Open-closed principle

The Open-Closed Principle (OCP) states that software entities (classes, modules, methods, etc.) should be open for extension, but closed for modification.

In practice, this means creating software entities whose behavior can be changed without the need to edit and recompile the code itself. The simplest way to demonstrate this principle is to consider a method that does one thing. Let's say it writes to a particular file, the name of which is hard-coded into the method. If the requirements change, and the filename now needs to be different in certain situations, we must open up the method to change the filename. If, on the other hand, the filename had been passed in as a parameter, we would be able to modify the behavior of this method without changing its source, keeping it closed to modification.

The Open-Closed Principle can also be achieved in many other ways, including through the use of inheritance or through compositional design patterns like the Strategy pattern.

Since we are relying on abstractions, we don’t have to make changes on our calling code, if we wish to change an implementation.

The dependency inversion principle can help you design your code in a way that is open for extension but closed for modification. By depending on abstractions rather than concrete implementations, you can more easily extend the functionality of your code without modifying existing code.

## Liskov substitution principle

The Liskov Substitution Principle (LSP) states that subtypes must be substitutable for their base types. When this principle is violated, it tends to result in a lot of extra conditional logic scattered throughout the application, checking to see the specific type of an object. This duplicate, scattered code becomes a breeding ground for bugs as the application grows.

Most introductions to object-oriented development discuss inheritance, and explain that one object can inherit from another if it has an "IS-A" relationship with the inherited object. However, this is necessary, but not sufficient. It is more appropriate to say that one object can be designed to inherit from another if it always has an "IS-SUBSTITUTABLE-FOR" relationship with the inherited object.

A very common violation of this principle is the partial implementation of interfaces or base class functionality, leaving unimplemented methods or properties to throw an exception (e.g. NotImplementedException). In code that you know is only going to be used by one client that you control, this is fine, but if such classes are going to be in a shared codebase, or worse, framework code that is shipped to third parties, such implementations should be avoided. If a given interface has more features than you require, follow the Interface Segregation Principle and create a new interface that includes only the functionality your client code requires, and which you can implement fully.

A common code smell that frequently indicates an LSP violation is the presence of type checking code within a code block that should be polymorphic. For instance, if you have a foreach loop over a collection of objects of type Foo, and within this loop there is a check to see if Foo is in fact Bar (subtype of Foo), then this is almost certainly an LSP violation. If instead you ensure Bar is in all ways substitutable for Foo, there should be no need to include such a check.

We can replace any of our objects by another one as long as they implement the same interface.

The dependency inversion principle can help you adhere to the Liskov substitution principle by allowing you to substitute different implementations of a module without affecting the high-level module.

## Interface segregation principle

Create a custom interface that extends a base interface, and we’re using that one to bind our implementation. That way, we keep our base interface clean and we can add custom methods on our custom interfaces.

The dependency inversion principle promotes the use of small, specific interfaces that only expose the methods that are needed by the high-level module. This can help you adhere to the interface segregation principle by not forcing the high-level module to depend on unnecessary methods.

## Dependency inversion principle

We’re relying on interfaces everywhere.

The dependency inversion principle helps you design more maintainable and scalable software by promoting loose coupling between components and adhering to the SOLID principles.
