/**
 * In this example, the ShoppingCart class is no longer tightly coupled to a specific payment processing
 * implementation. Instead, it depends on the PaymentProcessor interface, allowing different payment processing
 * strategies to be used interchangeably without modifying the ShoppingCart class. This approach promotes better code
 * maintainability and flexibility, making it easier to extend and modify the code in the future.
 */

interface PaymentProcessor {
  processPayment(items: string[]): void;
}

// ShoppingCart class is now decoupled from the specific payment processing logic
class ShoppingCart {
  private items: string[] = [];

  public addItem(item: string) {
    this.items.push(item);
  }

  public checkout(paymentProcessor: PaymentProcessor) {
    // Process the payment using the provided payment processor
    paymentProcessor.processPayment(this.items);
  }
}

// Implementation of the PaymentProcessor interface
class CreditCardPaymentProcessor implements PaymentProcessor {
  public processPayment(items: string[]) {
    // Logic to process the payment via credit card
    console.log(`Processing credit card payment for items: ${items.join(', ')}`);
  }
}

// Implementation of a different PaymentProcessor
class PayPalPaymentProcessor implements PaymentProcessor {
  public processPayment(items: string[]) {
    // Logic to process the payment via PayPal
    console.log(`Processing PayPal payment for items: ${items.join(', ')}`);
  }
}

// Example usage of the loosely coupled classes
const cart = new ShoppingCart();
cart.addItem('Laptop');
cart.addItem('Headphones');

const creditCardProcessor = new CreditCardPaymentProcessor();
const payPalProcessor = new PayPalPaymentProcessor();

cart.checkout(creditCardProcessor);
cart.checkout(payPalProcessor);

export {};
