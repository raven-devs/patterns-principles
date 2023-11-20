# How do the Proxy, Decorator, Adapter, and Bridge Patterns differ

Proxy, Decorator, Adapter, and Bridge are all variations on "wrapping" a class. But their uses are different.

- Proxy could be used when you want to lazy-instantiate an object, or hide the fact that you're calling a remote service, or control access to the object.

- Decorator is also called "Smart Proxy." This is used when you want to add functionality to an object, but not by extending that object's type. This allows you to do so at runtime.

- Adapter is used when you have an abstract interface, and you want to map that interface to another object which has similar functional role, but a different interface.

- Bridge is very similar to Adapter, but we call it Bridge when you define both the abstract interface and the underlying implementation. I.e. you're not adapting to some legacy or third-party code, you're the designer of all the code but you need to be able to swap out different implementations.

- Proxy and Decorator both have the same interface as their wrapped types, but the proxy creates an instance under the hood, whereas the decorator takes an instance in the constructor.

- Adapter and Facade both have a different interface than what they wrap. But the adapter derives from an existing interface, whereas the facade creates a new interface.

- Bridge and Adapter both point at an existing type. But the bridge will point at an abstract type, and the adapter might point to a concrete type. The bridge will allow you to pair the implementation at runtime, whereas the adapter usually won't.

All four patterns have a lot in common, all four are sometimes informally called wrappers, or wrapper patterns. All use composition, wrapping subject and delegating the execution to the subject at some point, do mapping one method call to another one. They spare client the necessity of having to construct a different object and copy over all relevant data. If used wisely, they save memory and processor.

- Adapter adapts subject (adaptee) to a different interface. This way we can add object be placed to a collection of nominally different types. Adapter expose only relevant methods to client, can restrict all others, revealing usage intents for particular contexts, like adapting external library, make it appear less general and more focused on our application needs. Adapters increase readability and self description of our code. Adapter helps to get around limitation of only single inheritance. It can combine several adaptees under one envelope giving impression of multiple inheritance. Code wise, Adapter is “thin”. It should not add much code to the adaptee class, besides simply calling the adaptee method and occasional data conversions necessary to make such calls.

- Decorator not only delegate, not only maps one method to another, they do more, they modify behaviour of some subject methods, it can decide not call subject method at all, delegate to a different object, a helper object. Decorators typically add (transparently) functionality to wrapped object like logging, encryption, formatting, or compression to subject. This New functionality may bring a lot of new code. Hence, decorators are usually much “fatter” then Adapters. Decorator must be a sub-class of subject's interface. They can be used transparently instead of its subjects. See BufferedOutputStream, it is still OutputStream and can be used as such. That is a major technical difference from Adapters.

- Proxy is not a typical wrapper. The wrapped object, the proxy subject, may not yet exist at the time of proxy creation. Proxy often creates it internally. It may be a heavy object created on demand, or it is a remote object. It does not have to necessary wrap or delegate to another object at all. Most typical examples are remote proxies, heavy object initializers and access proxies.
- Remote Proxy – subject is on remote server.
- Lazy Load Proxy – fully initialize object only the first usage or first intensive usage.
- Access Proxy – control access to subject.

- Bridge is a more complex variant of Adapter pattern where not only implementation varies but also abstraction. It adds one more indirection to the delegation. The extra delegation is the bridge. It decouples Adapter even from adapting interface. It increases complexity more than any other of the other wrapping patterns, so apply with care.
