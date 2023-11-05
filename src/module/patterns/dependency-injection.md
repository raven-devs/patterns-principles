# Dependency Injection (DI)

Dependency injection is a technique that allows us to decouple high-level modules from low-level modules by providing an abstraction for the low-level modules.

Dependency injection is a technique for achieving dependency inversion. In dependency injection, a class or module receives its dependencies as arguments to its constructor or functions rather than creating them themselves. This allows the dependencies to be replaced with mock implementations during testing and makes it easier to change them at runtime.

- Using a constructor method.
- Using a setter method.

```typescript
class ShoppingCartService {
  private paymentProcessor: PaymentProcessor;

  // injecting using a constructor method
  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  public checkout(cart: Cart) {
    // do some logic
    this.paymentProcessor.processPayment(cart);
  }
}
```

```typescript
class ShoppingCartService {
  private paymentProcessor: PaymentProcessor;

  // injecting using a setter method
  setPaymentProcessor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  public checkout(cart: Cart) {
    // do some logic
    this.paymentProcessor.processPayment(cart);
  }
}
```
