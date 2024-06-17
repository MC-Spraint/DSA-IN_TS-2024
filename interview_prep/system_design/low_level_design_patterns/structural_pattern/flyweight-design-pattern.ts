class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  operation(uniqueState: any): void {
    console.log(
      `Flyweight: ${JSON.stringify(this.sharedState)}, ${JSON.stringify(
        uniqueState
      )}`
    );
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  getFlyweight(sharedState: any): Flyweight {
    const key = JSON.stringify(sharedState);
    if (!this.flyweights[key]) {
      this.flyweights[key] = new Flyweight(sharedState);
    }
    return this.flyweights[key];
  }

  listFlyweights(): void {
    console.log(Object.keys(this.flyweights).length);
  }
}

// Usage
const factory = new FlyweightFactory();
const flyweight1 = factory.getFlyweight({ sharedState: "state1" });
const flyweight2 = factory.getFlyweight({ sharedState: "state2" });

flyweight1.operation({ uniqueState: "state1" }); // Flyweight: {"sharedState":"state1"}, {"uniqueState":"state1"}
flyweight2.operation({ uniqueState: "state2" }); // Flyweight: {"sharedState":"state2"}, {"uniqueState":"state2"}

factory.listFlyweights(); // 2
