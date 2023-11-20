/**
 * In the Decorator Design Pattern, multiple decorators can be stacked to provide a cumulative effect. Each decorator adds its own behavior while preserving the ability to combine them in various ways.
 */

// Component interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return 'Simple Coffee';
  }
}

// Decorator abstract class
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Concrete decorator class 1
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 2;
  }

  description(): string {
    return super.description() + ', Milk';
  }
}

// Concrete decorator class 2
class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return super.cost() + 1;
  }

  description(): string {
    return super.description() + ', Sugar';
  }
}

// Client code
const simpleCoffee = new SimpleCoffee();
console.log(`Cost: $${simpleCoffee.cost()}, Description: ${simpleCoffee.description()}`);

const milkCoffee = new MilkDecorator(simpleCoffee);
console.log(`Cost: $${milkCoffee.cost()}, Description: ${milkCoffee.description()}`);

const sweetMilkCoffee = new SugarDecorator(milkCoffee);
console.log(`Cost: $${sweetMilkCoffee.cost()}, Description: ${sweetMilkCoffee.description()}`);

export {};
