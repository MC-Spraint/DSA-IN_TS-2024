// Originator class
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }
  // Save current state to Memento
  saveToMemento(): Memento {
    return new Memento(this.state);
  }

  // Restore state from Memento
  restoreFromMemento(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Restored state: ${this.state}`);
  }

  // Set the state
  setState(state: string): void {
    console.log(`Setting state to: ${state}`);
    this.state = state;
  }

  // Get the state
  getState(): string {
    return this.state;
  }
}

// Memento class
class Memento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

// Caretaker class
class Caretaker {
  private mementos: Memento[] = [];

  addMemento(memento: Memento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): Memento {
    return this.mementos[index];
  }
}

// Usage
const originator = new Originator("Initial state");
const caretaker = new Caretaker();

// Save initial state
caretaker.addMemento(originator.saveToMemento());

// Change state
originator.setState("New state");

// Save new state
caretaker.addMemento(originator.saveToMemento());

// Restore to initial state
originator.restoreFromMemento(caretaker.getMemento(0));
