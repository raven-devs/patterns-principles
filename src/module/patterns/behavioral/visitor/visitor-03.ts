// An interface that custom Visitors should implement
interface Visitor {
  visit(part: Part): void;
}

// An interface the concrete objects should implement that allows
// the visitor to traverse a hierarchical structure of objects
interface Visitable {
  accept(visitor: Visitor): void;
}

// a.k.a Element. An Object that can be part of any hierarchy
class Part implements Visitable {
  name: string;
  value: number;
  parts: Set<Part>;

  constructor(name: string, value: number, parent?: Part) {
    this.name = name;
    this.value = value;
    this.parts = new Set();
    if (parent) {
      parent.parts.add(this);
    }
  }

  // required by the Visitor that will traverse
  accept(visitor: Visitor) {
    this.parts.forEach((part) => {
      part.accept(visitor);
    });
    visitor.visit(this);
  }
}

// The Client
// Creating an example object hierarchy.
const Part_A = new Part('A', 101);
const Part_B = new Part('B', 305, Part_A);
const Part_C = new Part('C', 185, Part_A);
const Part_D = new Part('D', -30, Part_B);

// Now rather than changing the Part class to support custom
// operations, we can utilise the accept method that was
// implemented in the Part class because of the addition of
// the Visitable interface

// Create a visitor that prints the part names
class PrintPartNamesVisitor implements Visitor {
  visit(part: Part) {
    console.log(part.name);
  }
}

// Using the PrintPartNamesVisitor to traverse the object hierarchy
Part_A.accept(new PrintPartNamesVisitor());

// Create another visitor that totals the part values
class CalculatePartTotalsVisitor implements Visitor {
  totalValue = 0;
  visit(part: Part) {
    this.totalValue += part.value;
  }
}
// Using the CalculatePartTotalsVisitor to traverse the object hierarchy
const calculatePartTotalsVisitor = new CalculatePartTotalsVisitor();
Part_A.accept(calculatePartTotalsVisitor);

console.log(calculatePartTotalsVisitor.totalValue);

export {};
