# Static Factory

You can implement the Static Factory pattern by defining a static method within a class to create instances of that class. Here's an example of the Static Factory Pattern:

```typescript
class Product {
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static createProductA(): Product {
    return new Product('Product A');
  }

  public static createProductB(): Product {
    return new Product('Product B');
  }

  public getName(): string {
    return this.name;
  }
}

// Using the static factory methods
const productA = Product.createProductA();
console.log(productA.getName()); // Output: Product A

const productB = Product.createProductB();
console.log(productB.getName()); // Output: Product B
```
