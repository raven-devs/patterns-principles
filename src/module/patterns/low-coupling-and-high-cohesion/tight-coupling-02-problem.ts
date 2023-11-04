/**
 * In this example, the Order class directly creates an instance of the Payment class and calls its methods. This
 * creates tight coupling between the two classes because Order depends directly on the concrete implementation of
 * Payment. If you were to change the Payment class or create a different payment method, it could lead to issues and
 * require modifications in the Order class.
 */

class Order {
  private payment: Payment | null = null;

  createPayment(amount: number) {
    this.payment = new Payment(amount); // tight coupling
  }

  processOrder() {
    if (this.payment) {
      this.payment.processPayment();
      console.log('Order processed successfully.');
    } else {
      console.log('No payment associated with this order.');
    }
  }
}

class Payment {
  constructor(private amount: number) {}

  processPayment() {
    console.log(`Processed payment of ${this.amount} dollars.`);
  }
}

const order = new Order();
order.createPayment(100);
order.processOrder();

export {};
