// Abstract class defining the template method
abstract class AbstractClass {
    // Template method defining the algorithm
    templateMethod(): void {
      this.baseOperation1();
      this.requiredOperation1();
      this.baseOperation2();
      this.hook1();
      this.requiredOperation2();
      this.baseOperation3();
      this.hook2();
    }
  
    // Abstract methods to be implemented by subclasses
    protected abstract requiredOperation1(): void;
    protected abstract requiredOperation2(): void;
  
    // Base operations with default implementation
    protected baseOperation1(): void {
      console.log("AbstractClass: baseOperation1");
    }
  
    protected baseOperation2(): void {
      console.log("AbstractClass: baseOperation2");
    }
  
    protected baseOperation3(): void {
      console.log("AbstractClass: baseOperation3");
    }
  
    // Hooks with empty default implementation, to be optionally overridden by subclasses
    protected hook1(): void { }
    protected hook2(): void { }
  }
  
  // Concrete subclass implementing required operations
  class ConcreteClass extends AbstractClass {
    protected requiredOperation1(): void {
      console.log("ConcreteClass: requiredOperation1");
    }
  
    protected requiredOperation2(): void {
      console.log("ConcreteClass: requiredOperation2");
    }
  
    // Optionally override hooks
    protected hook1(): void {
      console.log("ConcreteClass: hook1");
    }
  
    // hook2 is left unimplemented
  }
  
  // Usage
  const concreteClass = new ConcreteClass();
  concreteClass.templateMethod();
  