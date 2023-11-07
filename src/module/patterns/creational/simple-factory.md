# Simple Factory

A Simple Factory is a creational design pattern that provides a centralized method for creating objects. It is not a formal design pattern but rather a programming idiom. Here's a simple example of a Simple Factory in TypeScript:

```typescript
// Product interface
interface Product {
  operation(): string;
}

// Concrete Products
class ConcreteProductA implements Product {
  operation(): string {
    return 'ConcreteProductA';
  }
}

class ConcreteProductB implements Product {
  operation(): string {
    return 'ConcreteProductB';
  }
}

// Simple Factory
class SimpleFactory {
  createProduct(type: string): Product {
    if (type === 'A') {
      return new ConcreteProductA();
    } else if (type === 'B') {
      return new ConcreteProductB();
    } else {
      throw new Error('Invalid product type');
    }
  }
}

// Client code
const factory = new SimpleFactory();

const productA = factory.createProduct('A');
console.log(productA.operation()); // Output: ConcreteProductA

const productB = factory.createProduct('B');
console.log(productB.operation()); // Output: ConcreteProductB
```
