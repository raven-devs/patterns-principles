# Open-Closed Principle (OCP)

The Open-Closed Principle (OCP) states that software entities (classes, modules, methods, etc.) should be open for extension, but closed for modification. This means that you should be able to add new functionality to a class without altering its existing code.

In practice, this means creating software entities whose behavior can be changed without the need to edit and recompile the code itself. The simplest way to demonstrate this principle is to consider a method that does one thing. Let's say it writes to a particular file, the name of which is hard-coded into the method. If the requirements change, and the filename now needs to be different in certain situations, we must open up the method to change the filename. If, on the other hand, the filename had been passed in as a parameter, we would be able to modify the behavior of this method without changing its source, keeping it closed to modification.

The Open-Closed Principle can also be achieved in many other ways, including through the use of inheritance or through compositional design patterns like the Strategy pattern.

Since we are relying on abstractions, we don’t have to make changes on our calling code, if we wish to change an implementation.

The dependency inversion principle can help you design your code in a way that is open for extension but closed for modification. By depending on abstractions rather than concrete implementations, you can more easily extend the functionality of your code without modifying existing code.

In TypeScript, you can follow the Open-Closed Principle by using techniques such as inheritance, interfaces, and abstract classes.

```typescript
// Example without following OCP
class Rectangle {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}

class AreaCalculator {
  // The AreaCalculator class is closed for modification because if you want to add a new shape, you would need to modify the AreaCalculator class. This violates the Open-Closed Principle.
  calculateArea(rectangle: Rectangle): number {
    return rectangle.getWidth() * rectangle.getHeight();
  }
}

// Example following OCP
// Shape interface representing a shape with an area
interface Shape {
  calculateArea(): number;
}

// Rectangle class implements the Shape interface
class Rectangle implements Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

// Circle class implements the Shape interface
class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius(): number {
    return this.radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// AreaCalculator class now works with any shape that implements the Shape interface
class AreaCalculator {
  // The AreaCalculator class is open for extension. You can add new shapes by creating classes that implement the Shape interface, and the AreaCalculator class can work with any shape that adheres to this interface. This way, you can add new shapes without modifying the existing code.
  calculateArea(shape: Shape): number {
    return shape.calculateArea();
  }
}

// Client code
const rectangle = new Rectangle(5, 10);
const circle = new Circle(7);

const areaCalculator = new AreaCalculator();

console.log(areaCalculator.calculateArea(rectangle)); // Output: 50
console.log(areaCalculator.calculateArea(circle)); // Output: ~153.938...
```
