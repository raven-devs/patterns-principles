// npx ts-node src/module/patterns/creational/factory-method.ts

/**
 * The Factory Method pattern is an object creation pattern. It enables us to define an interface or abstract class for
 * creating an object, leaving the specific details to the implementations. The Factory Method pattern allows for loose
 * coupling and enhanced flexibility with regards to creating objects in code. It also allows you to encapsulate the
 * potential complexity of object creation.
 */

interface Product {
  displayDetails(): void;
}

class MentoringOpportunity implements Product {
  displayDetails(): void {
    console.log('This is a mentoring opportunity.');
  }
}

class TrainingOffering implements Product {
  displayDetails(): void {
    console.log('This is a training offering.');
  }
}

interface ProductFactory {
  createProduct(): Product;
}

class MentoringFactory implements ProductFactory {
  createProduct(): Product {
    return new MentoringOpportunity();
  }
}

class TrainingFactory implements ProductFactory {
  createProduct(): Product {
    return new TrainingOffering();
  }
}

function main() {
  const productFactory: ProductFactory = new MentoringFactory();
  const productItem: Product = productFactory.createProduct();
  productItem.displayDetails();

  const productFactory2: ProductFactory = new TrainingFactory();
  const productItem2: Product = productFactory2.createProduct();
  productItem2.displayDetails();
}

main();

export {};
