// Visitable interface representing elements to be visited
interface Visitable {
    accept(visitor: Visitor): void;
}

// Concrete visitables implementing the Visitable interface
class ConcreteElementA implements Visitable {
    accept(visitor: Visitor): void {
        visitor.visitConcreteElementA(this);
    }

    operationA(): void {
        console.log("ConcreteElementA operation");
    }
}

class ConcreteElementB implements Visitable {
    accept(visitor: Visitor): void {
        visitor.visitConcreteElementB(this);
    }

    operationB(): void {
        console.log("ConcreteElementB operation");
    }
}

// Visitor interface defining visit methods for each concrete element
interface Visitor {
    visitConcreteElementA(element: ConcreteElementA): void;
    visitConcreteElementB(element: ConcreteElementB): void;
}

// Concrete visitor implementing the Visitor interface
class ConcreteVisitor implements Visitor {
    visitConcreteElementA(element: ConcreteElementA): void {
        console.log("Visitor is visiting ConcreteElementA");
        element.operationA();
    }

    visitConcreteElementB(element: ConcreteElementB): void {
        console.log("Visitor is visiting ConcreteElementB");
        element.operationB();
    }
}

// Usage
const concreteElementA = new ConcreteElementA();
const concreteElementB = new ConcreteElementB();

const visitor = new ConcreteVisitor();

// Accepting visitors
concreteElementA.accept(visitor);
concreteElementB.accept(visitor);
