// Observer interface
interface Observer {
  update(message: string): void;
}

// Subject class
class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      return;
    }
    this.observers.splice(index, 1);
  }

  notifyObservers(message: string) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

// Concrete observer classes
class ConcreteObserverA implements Observer {
  update(message: string) {
    console.log(`Observer A received message: ${message}`);
  }
}

class ConcreteObserverB implements Observer {
  update(message: string) {
    console.log(`Observer B received message: ${message}`);
  }
}

// Usage
const subject = new Subject();

const observerA = new ConcreteObserverA();
const observerB = new ConcreteObserverB();

subject.addObserver(observerA);
subject.addObserver(observerB);

subject.notifyObservers("Hello observers!");

subject.removeObserver(observerA);

subject.notifyObservers("Hello again!");
