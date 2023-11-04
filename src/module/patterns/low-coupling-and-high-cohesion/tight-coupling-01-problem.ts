/**
 * In this example, the ShoppingCart class is tightly coupled to the PaymentProcessor class, as it directly
 * depends on it for payment processing. If you were to change the payment processing logic or use a different payment
 * processing method, you would need to modify the ShoppingCart class, which violates the principle of loose coupling.
 * This can make the codebase more rigid and difficult to maintain and extend in the long run.
 */

// A tightly coupled class that depends on another class
class ShoppingCart {
  private items: string[] = [];

  public addItem(item: string) {
    this.items.push(item);
  }

  public checkout(paymentProcessor: PaymentProcessor) {
    // Process the payment using the specific payment processor
    paymentProcessor.processPayment(this.items);
  }
}

// Another class that the ShoppingCart class is tightly coupled to
class PaymentProcessor {
  public processPayment(items: string[]) {
    // Logic to process the payment
    console.log(`Processing payment for items: ${items.join(', ')}`);
  }
}

// Example usage of the tightly coupled classes
const cart = new ShoppingCart();
cart.addItem('Laptop');
cart.addItem('Headphones');

const paymentProcessor = new PaymentProcessor();
cart.checkout(paymentProcessor);

export {};
