interface Prototype {
    clone(): Prototype;
  }
  
  class ConcretePrototype1 implements Prototype {
    primitive: number;
    component: object;
    circularReference: ComponentWithBackReference;
  
    constructor() {
      this.primitive = 0;
      this.component = {};
      this.circularReference = new ComponentWithBackReference(this);
    }
  
    clone(): Prototype {
      const clone = Object.create(this);
  
      clone.component = Object.create(this.component);
      clone.circularReference = Object.create(this.circularReference);
  
      return clone;
    }
  }
  
  class ComponentWithBackReference {
    prototype;
  
    constructor(prototype: Prototype) {
      this.prototype = prototype;
    }
  }
  
  // Usage
  const prototype = new ConcretePrototype1();
  const clone = prototype.clone();
  