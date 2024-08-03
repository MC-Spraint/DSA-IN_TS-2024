class Product {
  parts: string[] = [];

  addPart(part: string) {
    this.parts.push(part);
  }

  listParts() {
    console.log(`Product parts: ${this.parts.join(", ")}`);
  }
}

interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder implements Builder {
  private product: Product;

  constructor() {
    this.reset();
  }

  reset() {
    this.product = new Product();
  }

  producePartA() {
    this.product.addPart("PartA1");
  }

  producePartB() {
    this.product.addPart("PartB1");
  }

  producePartC() {
    this.product.addPart("PartC1");
  }

  getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  setBuilder(builder: Builder) {
    this.builder = builder;
  }

  buildMinimalViableProduct() {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

// Usage
const director = new Director();
const builder = new ConcreteBuilder();
director.setBuilder(builder);

console.log("Standard basic product:");
director.buildMinimalViableProduct();
builder.getProduct().listParts();

console.log("Standard full featured product:");
director.buildFullFeaturedProduct();
builder.getProduct().listParts();
