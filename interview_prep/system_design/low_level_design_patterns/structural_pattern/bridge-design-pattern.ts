interface Implementor {
  operationImpl(): void;
}

class ConcreteImplementorA implements Implementor {
  operationImpl(): void {
    console.log("Concrete Implementor A operation");
  }
}

class ConcreteImplementorB implements Implementor {
  operationImpl(): void {
    console.log("Concrete Implementor B operation");
  }
}

abstract class Abstraction {
  protected implementor: Implementor;

  constructor(implementor: Implementor) {
    this.implementor = implementor;
  }

  operation(): void {
    console.log("Abstraction operation");
    this.implementor.operationImpl();
  }
}

class RefinedAbstraction extends Abstraction {
  operation(): void {
    super.operation();
    console.log("Refined Abstraction operation");
  }
}

// Usage
const implementorA = new ConcreteImplementorA();
const implementorB = new ConcreteImplementorB();

const abstractionA = new RefinedAbstraction(implementorA);
abstractionA.operation(); // Abstraction operation \n Concrete Implementor A operation \n Refined Abstraction operation

const abstractionB = new RefinedAbstraction(implementorB);
abstractionB.operation(); // Abstraction operation \n Concrete Implementor B operation \n Refined Abstraction operation
