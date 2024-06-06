interface AbstractProductA {
    usefulFunctionA(): string;
  }

  class ConcreteProductA1 implements AbstractProductA {
    usefulFunctionA(): string {
      return 'The result of the product A1.';
    }
  }
  class ConcreteProductA2 implements AbstractProductA {
    usefulFunctionA(): string {
      return 'The result of the product A2.';
    }
  }

  interface AbstractProductB {
    usefulFunctionB(): string;
  }
  
  class ConcreteProductB1 implements AbstractProductB {
    usefulFunctionB(): string {
      return 'The result of the product B1.';
    }
  }
  
  class ConcreteProductB2 implements AbstractProductB {
    usefulFunctionB(): string {
      return 'The result of the product B2.';
    }
  }
  
  //Abstract factory pattern
  interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
  }
  
  class ConcreteFactory1 implements AbstractFactory {
    createProductA(): AbstractProductA {
      return new ConcreteProductA1();
    }
  
    createProductB(): AbstractProductB {
      return new ConcreteProductB1();
    }
  }
  
  class ConcreteFactory2 implements AbstractFactory {
    createProductA(): AbstractProductA {
      return new ConcreteProductA2();
    }
  
    createProductB(): AbstractProductB {
      return new ConcreteProductB2();
    }
  }
  
  // Usage
  function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productA.usefulFunctionA());
    console.log(productB.usefulFunctionB());
  }
  
  const factory1 = new ConcreteFactory1();
  clientCode(factory1);
  
  const factory2 = new ConcreteFactory2();
  clientCode(factory2);
  