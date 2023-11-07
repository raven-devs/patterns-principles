# Flags Over Objects

The "Flags Over Objects" anti-pattern refers to a situation where the usage of flags (boolean values or enum-like values) is used to control the behavior of an object, instead of using polymorphism or other object-oriented design patterns. This can result in code that is hard to understand, maintain, and extend. Let's consider an example in TypeScript to illustrate this anti-pattern:

```typescript
enum ShapeType {
  Circle,
  Square,
}

class Shape {
  private type: ShapeType;
  private radius: number;
  private sideLength: number;

  constructor(type: ShapeType, radius: number, sideLength: number) {
    this.type = type;
    this.radius = radius;
    this.sideLength = sideLength;
  }

  public calculateArea(): number {
    if (this.type === ShapeType.Circle) {
      return Math.PI * this.radius * this.radius;
    } else if (this.type === ShapeType.Square) {
      return this.sideLength * this.sideLength;
    } else {
      throw new Error('Invalid shape type');
    }
  }
}
```

In this example, we have a Shape class that has a type property of type ShapeType which represents different shapes. The calculateArea method checks the type of the shape to perform the appropriate area calculation. This approach can lead to issues when new shapes are added, as the calculateArea method needs to be updated each time, violating the open-closed principle.

A better approach would be to use inheritance and create separate classes for each type of shape:

```typescript
abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  private sideLength: number;

  constructor(sideLength: number) {
    super();
    this.sideLength = sideLength;
  }

  calculateArea(): number {
    return this.sideLength * this.sideLength;
  }
}
```

By using inheritance and creating separate classes for each shape, we adhere to the open-closed principle, making it easier to add new shapes without modifying existing code. This approach leads to more maintainable and extensible code.
