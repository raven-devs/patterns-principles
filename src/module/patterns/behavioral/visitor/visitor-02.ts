/**
 * The Visitor design pattern is a behavioral design pattern that allows you to define a new operation without changing the classes of the elements on which it operates. This pattern is useful when you have a set of classes representing elements in a structure, and you want to perform operations on these elements without modifying their class hierarchy.
 */

// Define the Visitor interface with visit methods for each element type
interface Visitor {
  visitElementA(element: ElementA): void;
  visitElementB(element: ElementB): void;
}

// Define the Element interface that elements in the structure will implement
interface Element {
  accept(visitor: Visitor): void;
}

// Implement concrete elements that implement the Element interface
class ElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementA(this);
  }

  operationA(): string {
    return 'Operation A of Element A';
  }
}

class ElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitElementB(this);
  }

  operationB(): string {
    return 'Operation B of Element B';
  }
}

// Implement concrete Visitor that implements the Visitor interface
class ConcreteVisitor implements Visitor {
  visitElementA(element: ElementA): void {
    console.log(`Visiting ${element.operationA()}`);
  }

  visitElementB(element: ElementB): void {
    console.log(`Visiting ${element.operationB()}`);
  }
}

// Client code
const elementA = new ElementA();
const elementB = new ElementB();

const visitor = new ConcreteVisitor();

elementA.accept(visitor); // Output: Visiting Operation A of Element A
elementB.accept(visitor); // Output: Visiting Operation B of Element B

export {};
