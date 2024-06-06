
## **[S.O.L.I.D Principles]**

#### [1] Single Responsibility
The Single Responsibility Principle (SRP) states that a class should have only one reason to change, meaning it should have only one responsibility or job.

#### [2] Open/Closed Principle (OCP)
The Open/Closed Principle (OCP) suggests that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means that new functionality should be added through extension rather than by altering existing code.

#### [3] Liskov Substitution Principle (LSP)
The Liskov Substitution Principle (LSP) asserts that objects of a superclass should be replaceable with objects of a subclass, without affecting the correctness of the program.

#### [4] Interface Segregation Principle (ISP)
The Interface Segregation Principle (ISP) advises that clients should not be forced to depend on interfaces they do not use. Instead, interfaces should be segregated based on the behavior they define.

#### [5] Dependency Inversion Principle (DIP)
The Dependency Inversion Principle (DIP) advocates for high-level modules not to depend on low-level modules. Both should depend on abstractions, and abstractions should not depend on details.


## **[Behavioral Pattern]**

#### [1] State Pattern
State pattern allows an object to alter its behaviour when its internal state changes.

#### [2] Observer Pattern
In Observer Pattern, an object known as observable maintains a list of its dependents, called observers, and notifies them of any state change, usually by calling one of their methods.

#### [3] Strategic Pattern
Strategic Pattern allows us to define multiple algorithm to perform a specific task and select one from them depending on the situation or context. It encapsulates each algorithm and makes them interchangeable.

#### [4] Chain Of Responsiblity Pattern
Chain Of Responsiblity Pattern allows multiple objects to handle a request without the sender needing to know which object will process it ultimately

#### [5] Template Pattern
When a number of classes need to follow some specific number of steps to perform an operation but allows each step to have its own logic in that specific step.

#### [6] Interpreter Pattern
Interpreter Pattern defines a context to interpret or evaluate an expression.

#### [7] Command Pattern
Command Pattern turns request commands into objects, allowing us to either parameterize or queue them.
This helps in decoupling the request sender and the receiver

#### [8] Iterator Pattern
That provide a way to access elements of a collection sequencially without exposing the underlying
representation of the collection.

#### [9] Visitor Pattern
Visitor Pattern allows adding operations to existing classes without changing them, encouraging open/close principal of SOLID.

#### [10] Mediator Pattern
Mediator Pattern encourages loose coupling by keeping two objects from refering each other through a mediator object.

#### [11] Memento Pattern
___

## **[Structural Pattern]**
#### [1] Decorator Pattern
The Decorator pattern is a structural design pattern that allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. It is often used to extend the functionality of objects in a flexible and reusable way.

#### [2] Proxy Pattern
The Proxy pattern provides a surrogate or placeholder for an object, to control access to it by another object. 
It acts as an intermediary between the two object, providing additional functionality 
such as lazy initialization, access control, logging, etc.

#### [3] Composite Pattern
The Composite pattern helps to compose objects into tree structures to represent their hierarchies,treating each node and the entire tree uniformly. 

#### [4] Adapter pattern
The Adapter pattern allows incompatible interfaces to work together. It wraps an existing class with a new interface so that it becomes compatible with another class.

#### [5] Bridge Pattern
The Bridge pattern decouples abstraction from implementation so that they can vary independently. It uses composition instead of inheritance to achieve this.

#### [6] Facade Pattern
The Facade pattern provides a unified interface to a set of interfaces in a subsystem. It simplifies complex systems by providing a higher-level interface.

#### [7] Flyweight Pattern
The Flyweight pattern is used to minimize memory usage or computational expenses by sharing as much as possible with similar objects.
___

## **[Creational Pattern]**
#### [1] Singleton
Singleton Pattern is a simple and frequently used pattern to ensure a class has only one instance.

#### [2] Factory Method Pattern
Factory Method Pattern introduces the concept of factory methods and how subclasses can determine which class to instantiate.

#### [3] Abstract Factory
Builds on the Factory Method to create families of related objects.

#### [4] Builder
Useful for creating complex objects step by step.

#### [5] Prototype
Explores cloning objects and the concept of copying existing objects to create new ones.