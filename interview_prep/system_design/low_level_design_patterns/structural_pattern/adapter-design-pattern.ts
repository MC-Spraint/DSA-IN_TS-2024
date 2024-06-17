interface Target {
  request(): void;
}

class Adaptee {
  specificRequest(): void {
    console.log("Adaptee specific request");
  }
}

class Adapter implements Target {
  

  constructor(private adaptee: Adaptee) {}

  request(): void {
    console.log("Adapter request");
    this.adaptee.specificRequest();
  }
}

// Usage
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

adapter.request(); // Adapter request \n Adaptee specific request
