// Component interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 2;
  }

  description(): string {
    return "Simple coffee";
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

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 1;
  }

  description(): string {
    return this.coffee.description() + ", with milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.5;
  }

  description(): string {
    return this.coffee.description() + ", with sugar";
  }
}

// Usage
const coffee = new SimpleCoffee();
console.log(coffee.description()); // Output: Simple coffee
console.log(coffee.cost()); // Output: 2

const coffeeWithMilk = new MilkDecorator(coffee);
console.log(coffeeWithMilk.description()); // Output: Simple coffee, with milk
console.log(coffeeWithMilk.cost()); // Output: 3

const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
console.log(coffeeWithMilkAndSugar.description()); // Output: Simple coffee, with milk, with sugar
console.log(coffeeWithMilkAndSugar.cost()); // Output: 3.5
