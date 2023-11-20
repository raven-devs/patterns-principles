/**
 * The Composite Design Pattern is a structural pattern that allows you to compose objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.
 */

// Component interface
interface Graphic {
  draw(): void;
}

// Leaf class (implements Graphic)
class Circle implements Graphic {
  draw(): void {
    console.log('Drawing a circle');
  }
}

// Leaf class (implements Graphic)
class Square implements Graphic {
  draw(): void {
    console.log('Drawing a square');
  }
}

// Composite class (implements Graphic)
class CompositeGraphic implements Graphic {
  private children: Graphic[] = [];

  add(child: Graphic): void {
    this.children.push(child);
  }

  remove(child: Graphic): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  draw(): void {
    console.log('Drawing a composite graphic:');
    for (const child of this.children) {
      child.draw();
    }
  }
}

// Client code
const circle = new Circle();
const square = new Square();

const compositeGraphic = new CompositeGraphic();
compositeGraphic.add(circle);
compositeGraphic.add(square);

compositeGraphic.draw();

export {};
