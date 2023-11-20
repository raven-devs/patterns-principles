/**
 - Use the Abstract Factory when your code needs to work with various families of related products, but you don’t want it to depend on the concrete classes of those products—they might be unknown beforehand or you simply want to allow for future extensibility.

 The Abstract Factory provides you with an interface for creating objects from each class of the product family. As long as your code creates objects via this interface, you don’t have to worry about creating the wrong variant of a product which doesn’t match the products already created by your app.

 - Consider implementing the Abstract Factory when you have a class with a set of Factory Methods that blur its primary responsibility.

 In a well-designed program each class is responsible only for one thing. When a class deals with multiple product types, it may be worth extracting its factory methods into a stand-alone factory class or a full-blown Abstract Factory implementation.

 - Abstract Factory classes are often based on a set of Factory Methods.

 - Abstract Factory can serve as an alternative to Facade when you only want to hide the way the subsystem objects are created from the client code.

 - Abstract Factories can all be implemented as Singletons.
 */

export {};
