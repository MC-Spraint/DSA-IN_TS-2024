## **[Behavioral Patterns]**

### **<span style="color: maroon;">1. State Pattern</span>**
State pattern allows an object to alter its behaviour when its internal state changes.

@startuml
scale 0.8
interface SwitchState {
  + switchOn(): void
  + switchOff(): void
}

class ConcreteOnState implements SwitchState {
  + switchOn(): void
  + switchOff(): void
}

class ConcreteOffState implements SwitchState {
  + switchOn(): void
  + switchOff(): void
}

class SwitchContext {
  - state: SwitchState
  + setState(state: SwitchState): void
  + switchOn(): void
  + switchOff(): void
}


SwitchContext -right-> SwitchState : has-a >
@enduml



### **<span style="color: maroon;">2. Observer Pattern</span>**
In **<u>Observer Pattern</u>**, an object known as **observable** maintains a list of its dependents, called **observers**, and notifies them of any state change, usually by calling one of their methods.

@startuml
scale 0.8
interface Observer {
  + update(message: string): void
}

class Subject {
  - observers: Observer[]
  + addObserver(observer: Observer): void
  + removeObserver(observer: Observer): void
  + notifyObservers(message: string): void
}

class ConcreteObserverA {
  + update(message: string): void
}

class ConcreteObserverB {
  + update(message: string): void
}

Observer <|.. ConcreteObserverA
Observer <|.. ConcreteObserverB

Subject -right-> Observer : has-many>
@enduml


<!-- <div style="page-break-after: always;"></div> -->

### **<span style="color: maroon;">3. Strategy Pattern</span>**
**<u>Strategy Pattern</u>** allows us to define multiple algorithms to perform a specific task and select one depending on the situation or context. It encapsulates each algorithm and makes them interchangeable.

@startuml
scale 0.8
interface PaymentStrategy {
  + pay(amount: number): void
}

class CreditCardPayment {
  + pay(amount: number): void
}

class PayPalPayment {
  + pay(amount: number): void
}

class BankTransferPayment {
  + pay(amount: number): void
}

class PaymentContext {
  - paymentStrategy: PaymentStrategy
  + PaymentContext(paymentStrategy: PaymentStrategy)
  + setPaymentStrategy(paymentStrategy: PaymentStrategy): void
  + executePayment(amount: number): void
}

PaymentStrategy <|.. CreditCardPayment 
PaymentStrategy <|.. PayPalPayment 
PaymentStrategy <|.. BankTransferPayment 
PaymentContext "1" *-right-> "1" PaymentStrategy : has-a >
@enduml

<div style="page-break-after: always;"></div>

### **<span style="color: maroon;">4. Chain of Responsibility Pattern</span>**
**<u>Chain of Responsibility Pattern</u>** allows multiple objects to handle a request without the sender needing to know which object will process it ultimately.

@startuml
scale 0.8

interface Handler {
  + setNext(handler: Handler): Handler
  + handle(request: string): string | null
}

abstract class AbstractHandler {
  - nextHandler: Handler
  + setNext(handler: Handler): Handler
  + handle(request: string): string | null
}

class ConcreteHandler1 {
  + handle(request: string): string | null
}

class ConcreteHandler2 {
  + handle(request: string): string | null
}

class ConcreteHandler3 {
  + handle(request: string): string | null
}

Handler <|.. AbstractHandler
AbstractHandler <|-- ConcreteHandler1 : extends >
AbstractHandler <|-- ConcreteHandler2 : extends >
AbstractHandler <|-- ConcreteHandler3 : extends >
@enduml




### **<span style="color: maroon;">5. Template Pattern</span>**
The **<u>Template Pattern</u>** ensures that a number of classes follow specific steps to perform an operation but allows each step to have its own logic in that specific step.

@startuml
scale 0.8

abstract class AbstractClass {
  {abstract} +requiredOperation1(): void
  {abstract} +requiredOperation2(): void
  #baseOperation1(): void
  #baseOperation2(): void
  #baseOperation3(): void
  #hook1(): void
  #hook2(): void
  +templateMethod(): void
}

class ConcreteClass {
  +requiredOperation1(): void
  +requiredOperation2(): void
  +hook1(): void
}

AbstractClass <|-left- ConcreteClass
@enduml



### **<span style="color: maroon;">6. Interpreter Pattern</span>**
**<u>Interpreter Pattern</u>** defines a context to interpret or evaluate an expression.

@startuml
scale 0.8

interface Expression {
  + interpret(context: Context): number
}

class NumberExpression implements Expression{
  - number: number
  + interpret(context: Context): number
}

class VariableExpression  implements Expression{
  - name: string
  + interpret(context: Context): number
}

class AddExpression  implements Expression{
  - left: Expression
  - right: Expression
  + interpret(context: Context): number
}

class SubtractExpression  implements Expression{
  - left: Expression
  - right: Expression
  + interpret(context: Context): number
}

class Context {
  - variables: Map<string, number>
  + setVariable(name: string, value: number): void
  + lookup(name: string): number
}
NumberExpression -up-> Context : uses >
VariableExpression -up-> Context : uses >
AddExpression -up-> Context : uses >
SubtractExpression -up-> Context : uses >

@enduml


<div style="page-break-after: always;"></div>

### **<span style="color: maroon;">7. Command Pattern</span>**
**<u>Command Pattern</u>** turns request commands into objects, allowing us to either parameterize or queue them. This helps in decoupling the request sender and the receiver.

@startuml
scale 0.8

interface Command {
  + execute(): void
  + undo(): void
}

class LightOnCommand implements Command {
  - light: Light
  + execute(): void
  + undo(): void
}

class LightOffCommand implements Command {
  - light: Light
  + execute(): void
  + undo(): void
}

class Light {
  + on(): void
  + off(): void
}

class RemoteControl {
  - command: Command
  + setCommand(command: Command): void
  + pressButton(): void
  + pressUndo(): void
}


LightOnCommand --> Light : has-a >
LightOffCommand --> Light : has-a >
RemoteControl -right-> Command : has-a >
@enduml



### **<span style="color: maroon;">8. Iterator Pattern</span>**
**<u>Iterator Pattern</u>** provides a way to access elements of a collection sequentially without exposing the underlying representation of the collection.

@startuml
scale 0.8

interface Iterator<T> {
  + hasNext(): boolean
  + next(): IteratorResult<T>
}

interface Aggregate<T> {
  + createIterator(): Iterator<T>
}

class ArrayIterator<T> implements Iterator<T> {
  - index: number
  - collection: T[]
  + hasNext(): boolean
  + next(): IteratorResult<T>
}

class ArrayCollection<T> implements Aggregate<T> {
  - collection: T[]
  + createIterator(): Iterator<T>
}

interface IteratorResult<T> {
  + done: boolean
  + value: T
}
ArrayCollection -left-> ArrayIterator : creates >
@enduml

<div style="page-break-after: always;"></div>


### **<span style="color: maroon;">9. Visitor Pattern</span>**
**<u>Visitor Pattern</u>** allows adding operations to existing classes without changing them, encouraging the open/close principle of SOLID.

@startuml
scale 0.8
interface Visitor {
    + visitConcreteElementA(ConcreteElementA)
    + visitConcreteElementB(ConcreteElementB)
}

class ConcreteVisitor1 implements Visitor {
    + visitConcreteElementA(ConcreteElementA)
    + visitConcreteElementB(ConcreteElementB)
}

class ConcreteVisitor2 implements Visitor {
    + visitConcreteElementA(ConcreteElementA)
    + visitConcreteElementB(ConcreteElementB)
}

interface Visitable {
    + accept(Visitor)
}

class ConcreteElementA implements Visitable {
    + accept(Visitor)
}

class ConcreteElementB implements Visitable {
    + accept(Visitor)
}

ConcreteElementA --> Visitor : uses >
ConcreteElementB --> Visitor : uses >


@enduml


### **<span style="color: maroon;">10. Mediator Pattern</span>**
**<u>Mediator Pattern</u>** encourages loose coupling by keeping two objects from referencing each other through a mediator object.

@startuml
scale 0.8
interface Mediator {
  + notify(sender: Colleague, event: string): void
}

interface Colleague {
  + setMediator(mediator: Mediator): void
  + send(event: string): void
  + receive(event: string): void
}

class ConcreteMediator implements Mediator {
  - colleagues: Colleague[]
  + addColleague(colleague: Colleague): void
  + notify(sender: Colleague, event: string): void
}

class ConcreteColleague implements Colleague {
  - mediator: Mediator
  + setMediator(mediator: Mediator): void
  + send(event: string): void
  + receive(event: string): void
}
ConcreteMediator -up-> Colleague : has-many + uses >
ConcreteColleague -up-> Mediator : has-a + uses >
@enduml

<div style="page-break-after: always;"></div>


### **<span style="color: maroon;">11. Memento Pattern</span>**
**<u>Memento Pattern</u>** provides the ability to revert an object to its previous state.

@startuml
scale 0.8
class Originator {
  - state: string
  + setState(state: string): void
  + getState(): string
  + saveToMemento(): Memento
  + restoreFromMemento(memento: Memento): void
}

class Memento {
  - state: string
  + getState(): string
}

class Caretaker {
  - mementos: Memento[]
  + addMemento(memento: Memento): void
  + getMemento(index: number): Memento
}

Originator --> Memento : creates >
Originator --> Caretaker : uses >
Caretaker -right-> Memento : has-many + uses >





@enduml
