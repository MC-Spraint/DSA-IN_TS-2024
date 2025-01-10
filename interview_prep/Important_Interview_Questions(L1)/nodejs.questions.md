## NodeJs 30 Conceptual Questions

#### [1] Worker Threads

Worker Threads are lightweight threads **within the same Node.js process** that allow for the **parallel execution of JavaScript code**.
They provide an efficient way to perform **CPU-intensive tasks** without blocking the event loop, thereby maintaining the responsiveness of the application.

By sharing memory within the same process, worker threads enable fast in-process communication and data sharing. This makes them ideal for scenarios where tasks require heavy computation or need to operate concurrently without interfering with the main event loop's execution.
  
#### [2] Child Process

Child process refers to the nodejs process created from another nodejs process that allows
us to execute other programs, scripts, or commands from within the application like any other nodejs appplications.

#### [3] Cluster Module:

In NodeJs, the Cluster module enables the creation of **worker processes** to distribute incoming network traffic, **providing a form of load balancing** and improving the application's overall scalability.

#### [4] How does Node.js handle child threads?

Node.js is designed to be single-threaded, which means it executes code on a single thread, the main event loop. However, for performing CPU-intensive tasks, Node.js can spawn child threads using the child_process module (via spawn, fork, exec, etc.) to execute other Node.js processes or other applications in separate processes.

#### [5] Streams and Buffers:

##### -Streams
Streams in Node.js are objects that allow reading or writing data continuously. They enable efficient handling of large data sets or data that arrives in chunks, without needing to load the entire data into memory at once. 
There are in total four type of streams: 
(1) Readable (2) Writable (3) Duplex (4) Transform

##### -Buffers
Simply put, Buffer is like an array of integers corresponds to raw memory allocation outside the v8 heap, a Buffer is a way to store and manipulate **binary data** in Node. js.
Examples of binary data include images, audio and video files, and raw data from a network.

#### [6] Why NodeJs Single-threated

NodeJs follows an **event-driven architecture** based on JavaScript's event loop, which utilizes **reactor design pattern** that has the ability of handling multiple clients **concurrently** without creating seperate threads for each client. This event-driven architechture allows NodeJs to handle **asynchronous I/O operations** efficiently and scale well with concurrent requests, while maintaining simplicity and performance.
This is the reason beind Nodejs being single-threaded.

#### [7] What is concurrency in NodeJs and how is it achieved?

Concurrency refers to the ability of the runtime environment to handle multiple tasks **simultaneously**.
Node.js achieves concurrency through **non-blocking I/O operations** and **event-driven architecture**, rather than traditional multi-threading, despite being inheritentlty single threaded.

#### [8] How NodeJs becomes asynchronous

Even though Node.js is single-threaded, it operates on a **non-blocking I/O** and **event-driven architecture**, allowing code to execute asynchronously. 

When asynchronous functions initialize, their associated callback functions are registered and added to the callback queue (a.k.a event queue) in sequence, where they wait to be processed by the event loop. 

The event loop continuously monitors the callback queue for callbacks that are waiting to be processed. When callbacks are present in the queue, the even loop takes them one by one and processes them, thus making NodeJs asynchronous.
#### [9] Event Loop:

The event loop is the mechanism that enables Node.Js to achieve **non-blocking I/O** and **event-driven concurrency**, handling asynchronous operations efficiently despite Node.Js being single-threaded.

In Node.js, most operations are executed asynchronously.
When asynchronous functions initialize, their associated callback functions are registered and added to the callback queue (a.k.a event queue) in sequence, where they wait to be processed by the event loop. 

The event loop continuously monitors the callback queue for callbacks that are waiting to be processed. When callbacks are present in the queue, the even loop takes them one by one and processes them, thus making NodeJs asynchronous.

##### -Event Loop Phases

**Timers:** This phase checks if any timers (set by setTimeout() or setInterval()) are ready to execute. If a timer’s threshold time has passed, its associated callback is pushed to the callback queue.

**I/O Callbacks:** This phase handles most of the system operations like reading files, network requests, and database queries that are non-blocking in nature. The I/O callbacks that are ready are executed here.

**Idle, Prepare:** This phase is mostly used internally for preparing and managing other parts of the event loop. Developers typically don’t interact with this phase.

**Poll:** The poll phase is where the event loop spends most of its time. In this phase, the event loop waits for new I/O events. If there are no timers to process, it will wait for new events to arrive or for the callback queue to be populated.

**Check:** The check phase invokes any setImmediate() callbacks that have been added to the queue. As the code is executed, the event loop will eventually reach the poll phase. However, if a callback has been scheduled using setImmediate() and the poll phase becomes idle, the event loop will proceed directly to the check phase instead of waiting for poll events to occur.

**Close Callbacks:** This phase is where callbacks related to closing events (like socket.on('close')) are executed. When a socket or handle is closed suddenly, the close event is emitted in this phase However, if the closure is not immediate, the close event will be emitted using process.nextTick().

#### [10] Libuv:

Libuv is a **multi-platform support library** written in C that provides **asynchronous I/O operations** and abstracts operating system-specific functionalities, such as networking, file system access, and concurrency primitives. It serves as the core component of Node.js's event loop implementation, handling tasks such as managing I/O events, timers, and callbacks. 
Libuv enables Node.js to achieve **non-blocking I/O** and **event-driven concurrency** by efficiently handling asynchronous operations on various platforms, including Linux, macOS, and Windows. Its cross-platform nature ensures consistent behavior and performance across different operating systems.

#### [11] Event-Emitter

EventEmitter is a **built-in class** that **facilitates communication** between objects in a **publisher-subscriber pattern.**
It allows certain objects called "emitters" to emit named events that cause associated functions called "listeners" or "handlers" to be called when the event occurs.

#### [12] Difference between Call-backs and Promises

##### -Call-back
A callback is a function passed as an argument to another function, which is executed after the completion of a task, enabling the task to be asynchronous in nature.

##### -Promise
A promise is an object that represents the eventual completion or failure of an asynchronous operation. 

A promise can be in one of three states:
Pending: The initial state of a promise. The operation has not completed yet.
Fulfilled: The operation has completed successfully and the promise now holds the resulting value.
Rejected: The operation has failed and the promise holds the reason for the failure.

#### [13] Error-First Callbacks:

Error-first callbacks are a common pattern in Node.js for handling asynchronous operations. According to this pattern, callback functions are expected to take two parameters: the first parameter represents an error object (if any), and the second parameter contains the result or data returned by the operation. Developers check the error parameter first and handle any errors accordingly before proceeding with the operation's result.

#### [14] Callback-hell:

Callback hell, often called "Pyramid of Doom," refers to a 
problem in JavaScript where multiple nested callbacks create complex, hard-to-read code. This situation typically arises in asynchronous programming, involving operations like network requests or file operations that depend on the results of previous operations.

Callback hell can be avoided by using techniques such as
modularization, promises, async/await, or using libraries like async.js.

#### [15] Promisification:

Promisification is the process of **converting callback-based asynchronous functions** into functions that return Promises, allowing developers to work with asynchronous code in a more modern and readable way. 

Promisification can be done manually by wrapping existing functions with Promise constructors or using utility libraries like util.promisify() in Node.js.

#### [16] Call-Stack Vs Callback-queue

##### Call-stack
The call stack is a data structure that keeps track of the current execution of functions calls, allowing the runtime to manage function invocation and control flow.
The call stack handles operations synchronously so if an operation is blocking, it can freeze the entire call stack causing the program to become unresponsive.

When a function is invoked, it is pushed onto the top of the call stack.
When the function is finished executing, it is popped out of the stack.

##### Callback-queue

When an asynchronous operation is done executing, it's callback is pushed into a data structure called callback-queue, awaiting to be either fulfilled or rejected by the event-lopp.


#### [17] Explain the difference between process.nextTick() and setImmediate().

process.nextTick() schedules a callback function to be invoked at the end of the current operation, before the next event loop tick starts. It effectively queues the callback to be executed after the current script but before any I/O events or timers.

setImmediate(), on the other hand, schedules a callback to be executed on the next iteration of the event loop, allowing I/O operations to proceed. It is designed to execute a script once the current poll phase completes.

#### [18] Middlewares:

In the context of Node.js, middleware refers to the functions that have access to the request and response objects in the HTTP request-response cycle.
These functions can modify the request and response objects, execute any code, end the request-response cycle, and call the next middleware function in the stack.

#### [19] Reactor Pattern

Reactor pattern is a deign pattern for handling asynchronous I/O operations. It allows event-driven sytems to handle multiple clients concurrently without creating seperate thread for each clients;

#### [20] Socket.IO:

Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients and servers. It's commonly used for building applications that require real-time updates.

#### [21] Greenlet:

Greenlet is a lightweight, efficient library for running code in a separate thread-like context within a Node.js application. It's often used for parallel processing.

#### [22] TLS (Transport Layer Security)

Transport Layer Security (TLS) is a cryptographic protocol that ensures privacy between communicating applications and users on the Internet. It provides secure communication over a computer network, such as the internet.

#### [23] Explain some of the cluster methods in Node.js

Fork(): It creates a new child process from the master. The isMaster returns true if the current process is master or else false.

isWorker: It returns true if the current process is a worker or else false.

process: It returns the child process which is global.

send(): It sends a message from worker to master or vice versa.

kill(): It is used to kill the current worker.


#### [24] Polling
In Node.js, polling refers to the process of periodically checking for changes or updates in files, directories, or other resources by repeatedly querying their state. This technique is often used for tasks such as monitoring file system changes, watching for updates in databases, or checking for new messages in network sockets.

#### [25] Controll Flow

In Node.js, control flow refers to the order in which statements and functions are executed in your code. Node.js operates on a single-threaded, event-driven model, which means that it executes JavaScript code in a non-blocking, asynchronous manner.

#### [26] REPL

In short, a REPL (Read-Eval-Print Loop) is an interactive programming environment that reads, evaluates, and prints user inputs, allowing for quick experimentation and execution of code snippets. It's commonly used for testing small pieces of code, exploring language features, and debugging.


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

