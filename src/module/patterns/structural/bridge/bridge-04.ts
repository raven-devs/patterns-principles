/**
 * The Bridge Design Pattern is a structural pattern that separates abstraction from implementation so that both can vary independently. It involves creating a bridge interface that contains a reference to an implementation interface. This allows the abstraction and implementation to evolve independently without binding them permanently.
 */

// Abstraction interface
interface Shape {
  draw(): void;
}

// Concrete Implementor interface
interface DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void;
}

// Concrete Implementor class
class DrawingAPI1 implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`API1 is drawing a circle at (${x},${y}) with radius ${radius}`);
  }
}

// Another Concrete Implementor class
class DrawingAPI2 implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`API2 is drawing a circle at (${x},${y}) with radius ${radius}`);
  }
}

// Refined Abstraction class
class Circle implements Shape {
  private x: number;
  private y: number;
  private radius: number;
  private drawingAPI: DrawingAPI;

  constructor(x: number, y: number, radius: number, drawingAPI: DrawingAPI) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.drawingAPI = drawingAPI;
  }

  draw(): void {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  }
}

// Client code
const circle1 = new Circle(1, 2, 3, new DrawingAPI1());
const circle2 = new Circle(4, 5, 6, new DrawingAPI2());

circle1.draw();
circle2.draw();

// In this example:

// Shape is the abstraction interface, and Circle is the refined abstraction class.
// DrawingAPI is the implementor interface, and DrawingAPI1 and DrawingAPI2 are concrete implementor classes.
// The Circle class has a reference to a DrawingAPI object, and its draw method delegates to the appropriate method of the DrawingAPI object.
// This pattern allows you to vary the abstraction and implementation independently. For example, you can easily add new shapes without modifying the existing drawing APIs or vice versa. It promotes flexibility and enables you to create different combinations of abstractions and implementations.
// The draw method in the Circle class serves as the bridge between the abstraction and the implementor, allowing the two to vary independently.
