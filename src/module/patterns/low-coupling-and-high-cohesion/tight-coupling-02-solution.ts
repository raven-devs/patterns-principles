/**
 * To reduce coupling and make the code more maintainable, it's a good practice to introduce abstractions and use
 * interfaces or dependency injection to decouple the classes. This allows for easier substitution of different payment
 * methods or modifications without affecting the Order class.
 */

interface PaymentProcessor {
  processPayment(amount: number): void;
}

class Order {
  private paymentProcessor: PaymentProcessor | null = null;

  // dependency injection
  setPaymentProcessor(processor: PaymentProcessor) {
    this.paymentProcessor = processor;
  }

  processOrder(amount: number) {
    if (this.paymentProcessor) {
      this.paymentProcessor.processPayment(amount);
      console.log('Order processed successfully.');
    } else {
      console.log('No payment processor associated with this order.');
    }
  }
}

class CreditCardPaymentProcessor implements PaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processed credit card payment of ${amount} dollars.`);
  }
}

const order = new Order();
const creditCardProcessor = new CreditCardPaymentProcessor();
order.setPaymentProcessor(creditCardProcessor);
order.processOrder(100);

export {};
