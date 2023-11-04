# The Law of Demeter (LoD)

The Law of Demeter defines, how objects interact with each other. It says that you should talk only to the object that you directly know. Sometimes you can hear about it as a "shy programming" or "don’t talk to strangers" rule.
That allows to write the the code that is properly isolated and hidden behind abstraction and thus following the modularity approach.

The Law of Demeter, also known as the principle of least knowledge, is a design guideline for developing software, especially object-oriented programs. It promotes loose coupling between objects by limiting the knowledge that one object should have about the structure of other objects. This helps in improving the maintainability and flexibility of the codebase.

The Law of Demeter is a software design principle that states that a module should not know about the inner workings of the objects it manipulates. In other words, a module should only communicate with its immediate neighbors and not with the objects that they manipulate. When it comes to code, the Law of Demeter means that an object should only call methods or access properties of objects that it directly owns, rather than accessing properties or methods of objects that are several levels down in the hierarchy. By following the Law of Demeter, code can be more modular, maintainable, and easier to test.

Reasons, why you should follow the law, are not so visible in the beginning, but in time it will pay back with easier code maintenance. The law of Demeter simplifies methods by limiting the number of used types inside them. It promotes information hiding with proper abstraction and narrow interfaces. It's a restriction for operating only on types that you directly have access to distils the knowledge and responsibility of every object. That separation simplifies changes needed to be done in the future during code extension or maintenance.

A method of an object may only call methods of:

- The object itself.
- An argument of the method.
- Any object created within the method.
- Any direct properties/fields of the object.

The Law of Demeter defines only two requirements, but they need to be fulfilled by every method in the code. A single method can only operate on objects that are:

1. Passed as arguments to the method.
2. Values of fields defined in this class.

That means - no method chaining, when methods return different objects during chaining. (It is different for the "fluent interface", when methods return current and signle object each time).

While writing new code, we should only use objects that are directly available. It means only the ones that are defined within the current class or provided as arguments to the method.

Its basic premise is you should only hand over (and on the other side, only ask for) precisely what you need to hand over (or ask for). The idea is that your classes should ask for as little as possible and refuse to accept more than they need. Code smells example:

```js
Transaction.Customer.FormOfPayment.CreditCardNumber.ProcessCreditCard();
```
