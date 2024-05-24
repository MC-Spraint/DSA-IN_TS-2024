abstract class Component {
  abstract operation(): void;
}

class Leaf extends Component {
  operation(): void {
    console.log("Leaf operation");
  }
}

class Composite extends Component {
  private children: Component[] = [];

  add(component: Component): void {
    this.children.push(component);
  }

  remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  operation(): void {
    console.log("Composite operation");
    this.children.forEach((child) => child.operation());
  }
}

// Usage
const leaf1 = new Leaf();
const leaf2 = new Leaf();
const composite = new Composite();

composite.add(leaf1);
composite.add(leaf2);

composite.operation(); // Composite operation \n Leaf operation \n Leaf operation
