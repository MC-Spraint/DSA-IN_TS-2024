
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

#### [1] Factory Method Pattern
Factory Method Pattern introduces the concept of factory methods and how subclasses can determine which class to instantiate.

#### [2] Abstract Factory
Builds on the Factory Method to create families of related objects.

#### [3] Builder
Useful for creating complex objects step by step.

#### [4] Prototype
Explores cloning objects and the concept of copying existing objects to create new ones.

#### [5] Singleton
Singleton Pattern is a simple and frequently used pattern to ensure a class has only one instance.


## **[Javascript Questions]**

### [1] IIFE(Immediately Invoked Function Expression):

An Immediately Invoked Function Expression (IIFE) is a JavaScript function that is defined and executed immediately after its creation. It is a way to encapsulate code within a function to avoid polluting the global scope.

### [2] Promise Chaining:

Promise chaining is a technique in JavaScript that involves chaining multiple promises together to **handle a sequence of asynchronous operations** in a more readable and organized manner. It is a way to express a series of asynchronous tasks one after the other, making the code easier to understand and maintain.

### [3] Closure:

 A closure is formed when a function is defined within another function, allowing the inner function to access the outer function's variables and parameters, even after the outer function has finished executing.
 it is a fundamental concept in programming, particularly in languages that support first-class functions or function values.

### [4] Currying:

The term "currying" refers to a process in functional programming where a function is transformed into a sequence of functions, each taking a single argument. In other words, a curried function is a function that returns another function with one or more arguments "pre-filled."
Instead of taking all arguments at once, a curried function takes one argument at a time and returns a new function that takes the next argument, and so on, until all arguments are consumed and the final result is produced.

### [5] Hoisting:

Hoisting is a JavaScript behavior in which variable and function declarations are moved to the top of their containing scope during the compilation phase, before code execution begins. This means that variables and functions can be referenced before they are declared in the code. It's important to note that only declarations are hoisted, not initializations.


### [6] Higher-order Functions

Higher-order functions are functions that take other functions as arguments or return functions as results. They enable functional programming paradigms such as function composition, currying, and callback-based asynchronous programming.

### [7] What are the differences between let, var, and const?

1. var: var is function-scoped and can be re-declared and updated throughout the function.
2. let: let is block-scoped, can be updated but not re-declared in the same scope.
3. const: const is block-scoped, cannot be updated or re-declared once initialized.

### [8] Event Delegation
Event delegation is a technique in which a single event listener is attached to a parent element to handle events for multiple child elements. It improves performance and reduces memory consumption by avoiding the need to attach event listeners to each individual element.


### [9] Explain call, apply, and bind!
call: The call method allows you to call a function 
with a specified this value and arguments provided individually.

apply: Similar to call, the apply method allows you to call a function
with a specified this value and an array of arguments.

bind: The bind method creates a new function 
with a specified this value, without calling the original function immediately.

Bind is particularly useful for creating a new function 
with a fixed this value, which can be called later.
#### Example:
````Typescript
function greet() {
  return "Hello, " + this.name + "!";
}

const person = { name: "Alice" };
const greetWithCall = greet.call(person);
const greetWithApply = greet.apply(person);
const greetWithBind = greet.bind(person);
console.log(greetWithCall()); // Output: Hello, Alice!
console.log(greetWithApply()); // Output: Hello, Alice!
console.log(greetWithBind()); // Output: Hello, Alice!
````
### [10] Generators:

Answer: Generators are functions that can be exited and later re-entered, with their context (variable bindings) saved across re-entrances. Generators are particularly useful for managing asynchronous programming in a more synchronous fashion, especially before async/await was introduced.

#### Example: 
````javascript
function* idGenerator() 
{
     let id = 1; 
     while (true)  yield id++; 
} 
const gen = idGenerator(); 
// "Generator { }" console.log(gen.next().value); 
// 1 console.log(gen.next().value); 
// 2 console.log(gen.next().value);

````





## **[NodeJs Conceptual Questions]**

## 

#### [1] Worker Threads

Worker Threads are a feature in Node.js that allows you to run JavaScript code in parallel, taking advantage of multi-core systems. They provide a way to perform CPU-intensive tasks without blocking the event loop.

#### [2] Child Process

Child Processes in Node.js allows us to excecute external system commands or scripts.
child processes give us full access to the system's CPU cores, allowing us to parallelize tasks and maximize computational efficiency by leveraging multiple cores simultaneously.

#### [3] Event Loop:

The event loop is the mechanism that enables Node.js to perform non-blocking I/O operations, despite JavaScript being single-threaded.
In Node.js, most operations like network and file operations are executed asynchronously. When these operations complete and
get popped out of the call stack, they push their results onto the event queue. The event loop runs in the same thread as Node.js and constantly checks this queue to see if any events are waiting to be processed. If there are, it takes each event one by one and processes them. Thus, it allows Node.js to handle a high volume of operations simultaneously.

#### [4] TLS (Transport Layer Security)

Transport Layer Security (TLS) is a cryptographic protocol that ensures privacy between communicating applications and users on the Internet. It provides secure communication over a computer network, such as the internet.

#### [5] Buffer:

Simply put, It's like an array of integers corresponds to raw memory allocation outside the v8 heap, a Buffer is a way to store and manipulate binary data in Node. js. Binary data refers to data that consists of binary values, as opposed to text data, which consists of characters and symbols. Examples of binary data include images, audio and video files, and raw data from a network

#### [6] Streams:

Streams are a fundamental concept in Node. js applications, enabling efficient data handling by reading or writing input and output sequentially. They are handy for file operations, network communications, and other forms of end-to-end data exchange.

#### [7] Callback-hell:

Callback hell, often called "Pyramid of Doom," refers to a 
problem in JavaScript where multiple nested callbacks create complex, hard-to-read code. This situation typically arises in asynchronous programming, involving operations like network requests or file operations that depend on the results of previous operations.

Callback hell can be avoided by using techniques such as
modularization, promises, async/await, or using libraries like async.js.

#### [8] Middlewares:

In the context of Node.js, middleware refers to the functions that have access to the request and response objects in the HTTP request-response cycle.
These functions can modify the request and response objects, execute any code, end the request-response cycle, and call the next middleware function in the stack.

#### [9] Socket.IO:

Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients and servers. It's commonly used for building applications that require real-time updates.

#### [10] Greenlet:

Greenlet is a lightweight, efficient library for running code in a separate thread-like context within a Node.js application. It's often used for parallel processing.

#### [11] What is concurrency in NodeJs?

Concurrency in Node.js refers to the ability of the runtime environment **to handle multiple tasks simultaneously**.
Node.js is inherently single-threaded, meaning it processes JavaScript code using a single main thread.
However, Node.js achieves concurrency through **non-blocking I/O operations and event-driven architecture**, rather than traditional multi-threading.

#### [12] Cluster Module:

The Cluster module in Node.js enables the creation of child processes to distribute incoming network traffic,
**providing a form of load balancing** and improving the application's overall scalability.

#### [13] Explain some of the cluster methods in Node.js

Fork(): It creates a new child process from the master. The isMaster returns true if the current process is master or else false.

isWorker: It returns true if the current process is a worker or else false.

process: It returns the child process which is global.

send(): It sends a message from worker to master or vice versa.

kill(): It is used to kill the current worker.

#### [14] Promises in Node.js

A promise is an object that represents the eventual completion or failure of an asynchronous operation. It's a core part of JavaScript and is used extensively in Node.js for managing asynchronous operations. A promise can be in one of three states:

Pending: The initial state of a promise. The operation has not completed yet.
Fulfilled: The operation has completed successfully and the promise now holds the resulting value.
Rejected: The operation has failed and the promise holds the reason for the failure.

#### [15] How does Node.js handle child threads?

Node.js is designed to be single-threaded, which means it executes code on a single thread, the main event loop. However, for performing CPU-intensive tasks, Node.js can spawn child threads using the child_process module (via spawn, fork, exec, etc.) to execute other Node.js processes or other applications in separate processes. Additionally, Node.js supports multi-threading for specific tasks through the worker_threads module, allowing it to execute JavaScript in parallel on multiple threads.

#### [16] Explain the difference between process.nextTick() and setImmediate().

Both functions are part of Node.js's event loop. process.nextTick() schedules a callback function to be invoked at the end of the current operation, before the next event loop tick starts. It effectively queues the callback to be executed after the current script but before any I/O events or timers.

setImmediate(), on the other hand, schedules a callback to be executed on the next iteration of the event loop, allowing I/O operations to proceed. It is designed to execute a script once the current poll phase completes.

#### [17] Error-First Callbacks:

Error-first callbacks are a common pattern in Node.js for handling asynchronous operations. According to this pattern, callback functions are expected to take two parameters: the first parameter represents an error object (if any), and the second parameter contains the result or data returned by the operation. Developers check the error parameter first and handle any errors accordingly before proceeding with the operation's result.

#### [18] Promisification:

Promisification is the process of **converting callback-based asynchronous functions** into functions that return Promises. It allows developers to work with asynchronous code in a more modern and readable way, using Promise-based APIs instead of traditional callback-based APIs. Promisification can be done manually by wrapping existing functions with Promise constructors or using utility libraries like util.promisify() in Node.js.

#### [19] Libuv in Node.js:

Libuv is a multi-platform support library that provides asynchronous I/O operations and abstracts operating system-specific functionalities, such as networking, file system access, and concurrency primitives.
It serves as the core component of Node.js's event loop implementation, handling tasks such as managing I/O events, timers, and callbacks. Libuv enables Node.js to achieve non-blocking I/O and event-driven concurrency by efficiently handling asynchronous operations on various platforms, including Linux, macOS, and Windows. Its cross-platform nature ensures consistent behavior and performance across different operating systems.

#### [20] REPL

In short, a REPL (Read-Eval-Print Loop) is an interactive programming environment that reads, evaluates, and prints user inputs, allowing for quick experimentation and execution of code snippets. It's commonly used for testing small pieces of code, exploring language features, and debugging.

#### [21] Why NodeJs Single-threated

Node.js is single-threaded because it follows an event-driven architecture based on JavaScript's event loop. 
This event-driven architechture allows Node.js to handle asynchronous I/O operations efficiently and scale well with concurrent requests while maintaining simplicity and performance.

#### [22] Event-Emitter

In Node.js, an EventEmitter is a built-in class that facilitates communication between objects in a **publisher-subscriber pattern.**
It allows certain objects called "emitters" to emit named events that cause associated functions called "listeners" or "handlers" to be called when the event occurs.

#### [23] Reactor Pattern

Reactor pattern is a deign pattern for handling asynchronous I/O operations. It allows event-driven sytems to handle multiple clients concurrently without creating seperate thread for each clients;

#### [24] Polling
 b 
In Node.js, polling refers to the process of periodically checking for changes or updates in files, directories, or other resources by repeatedly querying their state. This technique is often used for tasks such as monitoring file system changes, watching for updates in databases, or checking for new messages in network sockets.

#### [25] Controll Flow

In Node.js, control flow refers to the order in which statements and functions are executed in your code. Node.js operates on a single-threaded, event-driven model, which means that it executes JavaScript code in a non-blocking, asynchronous manner.
Controll flow in NodeJs includes -

#### [26] Call-Stack

In Node.js, the call stack is a data structure that tracks the execution of functions in a program. It keeps track of the sequence of function calls that are currently being executed, allowing the JavaScript runtime to manage function invocation and control flow.

#### [27] Tracing

Tracing in Node.js refers to the process of monitoring and recording the execution flow of a Node.js application, including function calls, asynchronous operations, and external service interactions, to gain insight into its behavior and performance.
There are two main types of tracing commonly used in Node.js:

1. Loging-based and 2. Instrumentation-based

#### [28] Test Pyramid

The test pyramid represents the ideal distribution of different types of tests within a testing strategy, emphasizing a balanced mix of tests at different levels of granularity.
The levels are Unit Tests, Integration Tests and End-To-End Tests

#### [29] Stubs

Stubs are simplified versions of real dependencies used in testing to simulate their behavior. They help isolate code under test, control testing conditions, and efficiently verify specific scenarios without relying on actual external services or components.

#### [30] Assert

In Node.js, the assert module is a built-in module that provides a set of assertion functions for writing tests. These assertion functions help developers verify that certain conditions hold true during the execution of their code. The assert module is particularly useful when writing unit tests to ensure that functions and components behave as expected under various conditions.



#### [31] How NodeJs becomes asynchronous

Even though Node.js is single-threaded, it operates on a non-blocking I/O and event-driven architecture, allowing code to execute asynchronously. Asynchronous functions return promises, which represent eventual success or failure of the program. Node.js assigns callbacks to these functions instead of waiting for their completion before proceeding to the next, thus contributing to its non-blocking nature.

When this functions complete, they get popped out of the call stack, and their corresponding events are pushed into the event queue sequentially. This asynchronous nature of Node.js is powered by its 'Event Loop', which also acts as the heart of Node.js, is responsible for managing these events.
After pushing these events into the event queue, the Event Loop processes them one by one as they come out the other end in a FIFO pattern and it constantly checks the queue to see if any events are still waiting to be processed. If there are, it takes each event one by one and processes them, thus making Node.js asynchronous.

## [32] Asynchronous Programming

Asynchronous programming allows operations to occur independently of the main application thread. This means the program can initiate an operation and move on to another one before the previous one finishes. This is known as non-blocking execution because the initiation of one operation does not block the execution of subsequent operations.

## [33] Synchronous Programming

Synchronous programming is straightforward: operations execute sequentially one after another, meaning that each operation must complete before the next one can begin. This is known as blocking execution because each step blocks the next one from starting until it is finished.

## [34] Single Threaded Applications

Single-threaded applications have only one sequence of instructions (thread) executing at any given time.
They can perform only one task at a time, and all operations are executed sequentially.
If one operation takes a long time (e.g., reading data from a slow disk), it can block the entire application until it completes.
They are simpler to design and reason about because there is no need to manage concurrent access to shared resources.

## [35] Multi-treaded Applications

Multi-threaded applications can execute multiple threads concurrently.
Each thread can perform its own tasks independently of others, potentially speeding up overall performance by taking advantage of multiple CPU cores.
Threads can share resources and communicate with each other, but this introduces complexities such as the need for synchronization to prevent data corruption or race conditions.
They can improve responsiveness in applications by allowing tasks to be performed in the background while the main thread handles user interaction.
They require careful design and management to avoid issues like deadlock, livelock, and race conditions.


## **[SQL Questions(Postgresql)]**

### [1] What are the types of SQL statements?

SQL statements include Data Definition Language (DDL), Data Manipulation Language (DML), Data Control Language (DCL), and Transaction Control Language (TCL).

### [2] What is a primary key?

A primary key is a unique identifier for each record in a table. It ensures that there are no duplicate records and provides a way to uniquely identify each record.

### [3] What is a foreign key?

A foreign key is a field in a table that refers to the primary key in another table. It establishes a relationship between two tables by enforcing referential integrity.

### [4] What is normalization?

Normalization is the process of organizing data in a database to reduce redundancy and dependency by dividing large tables into smaller tables and defining relationships between them.

### [5] What is denormalization?

Denormalization is the process of adding redundant data to a database to improve performance by avoiding costly joins, especially in read-heavy applications.

### [6] What is a JOIN in SQL?

A JOIN is used to combine rows from two or more tables based on a related column between them.

### [7] What are the different types of JOINs?

INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.

### [8] What is an index?

An index is a database object that improves the speed of data retrieval operations on a table by providing quick access to the rows.

### [9] What is the difference between clustered and non-clustered index?

In a clustered index, the physical order of the rows in the table matches the order of the key values, while in a non-clustered index, the physical order of the rows does not match the key values.

### [10] What is a subquery?

A subquery is a query nested inside another query. It can be used to return data that will be used in the main query.

**Important Concepts**

### [11] What is a stored procedure?

A stored procedure is a prepared SQL code that can be saved and reused. It allows for better performance and code reusability.

```postgresql
CREATE OR REPLACE PROCEDURE get_high_salary_employees (IN threshold NUMERIC)
AS $$
BEGIN
    SELECT first_name, last_name
    FROM employees
    WHERE salary > threshold;
END;
$$ LANGUAGE plpgsql;

CALL get_high_salary_employees(60000);
```

### [12] What is a trigger?

A trigger is a set of SQL statements that automatically "fires" or executes when certain events occur in a database, such as INSERT, UPDATE, or DELETE operations on a table.
````postgresql
-- Create a trigger function
CREATE OR REPLACE FUNCTION update_salary()
RETURNS TRIGGER AS $$
BEGIN
    NEW.salary := NEW.salary * 1.1; -- Increase salary by 10%
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger function to the employees table
CREATE TRIGGER update_salary_trigger
BEFORE INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION update_salary();
````
### [13] What is the difference between DELETE and TRUNCATE?

DELETE removes rows from a table based on a condition, while TRUNCATE removes all rows from a table without considering any conditions. DELETE is a DML command, while TRUNCATE is a DDL command.

### [14] What is a view?

A view is a virtual table based on the result of a SELECT query. It allows users to query the data in the view as if it were a normal table.

### [15] What is ACID in SQL?

ACID stands for Atomicity, Consistency, Isolation, and Durability, which are the four properties that ensure database transactions are processed reliably.

### [16] What is the purpose of the TRANSACTION keyword?

The TRANSACTION keyword is used to define a set of SQL statements that are treated as a single unit of work. It ensures data consistency and integrity by allowing changes to be rolled back if an error occurs.

```postgresql
-- Perform database operations
BEGIN TRANSACTION;

-- Perform database operations
UPDATE employees SET salary = salary * 1.1 WHERE department = 'Sales';
DELETE FROM orders WHERE order_date < '2023-01-01';
INSERT INTO audit_log (action, timestamp) VALUES ('Data cleanup', NOW());

-- Check if operations were successful
-- If successful, commit the transaction
COMMIT TRANSACTION;

-- If any errors occurred, rollback the transaction
-- This will undo all changes made within the transaction
ROLLBACK TRANSACTION;
```

### [17] What is the difference between UNION and UNION ALL?

UNION merges the results of two or more SELECT queries and removes duplicate rows, while UNION ALL does the same but retains duplicate rows.

```postgresql
-- UNION keyword
SELECT name, department FROM employees
UNION
SELECT name, department FROM managers;
```



### [18] What is the purpose of the DISTINCT keyword?

The DISTINCT keyword is used to retrieve unique values from a query result set, eliminating duplicate rows.

### [19] What is the CHECK constraint?

The CHECK constraint is used to enforce domain integrity by limiting the values that can be stored in a column. It specifies a condition that must be true for each row in the table.

### [20] What is the purpose of the ORDER BY clause?

The ORDER BY clause is used to sort the result set of a SELECT statement in ascending or descending order based on one or more columns.

```postgresql
--ORDER BY clause
SELECT * FROM students ORDER BY grade ASC, age DESC;
```

### [20] What is the difference between CASCADE and SET NULL in foreign key constraints?

CASCADE automatically deletes or updates related rows in child tables when a parent row is deleted or updated, while SET NULL sets the foreign key columns in child tables to NULL when the corresponding parent row is deleted or updated.





