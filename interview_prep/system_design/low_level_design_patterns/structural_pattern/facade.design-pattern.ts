class SubsystemA {
  operationA(): void {
    console.log("Subsystem A operation");
  }
}

class SubsystemB {
  operationB(): void {
    console.log("Subsystem B operation");
  }
}

class Facade {
  private subsystemA: SubsystemA;
  private subsystemB: SubsystemB;

  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
  }

  operation(): void {
    console.log("Facade operation");
    this.subsystemA.operationA();
    this.subsystemB.operationB();
  }
}

// Usage
const facade = new Facade();
facade.operation(); // Facade operation \n Subsystem A operation \n Subsystem B operation
