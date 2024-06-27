## NodeJs 30 Conceptual Questions

#### [1] Worker Threads

Worker Threads are lightweight threads **within the same Node.js process** that allow for the **parallel execution of JavaScript code**, leveraging **multi-core systems** to improve performance. They provide an efficient way to perform **CPU-intensive tasks** without blocking the event loop, thereby maintaining the responsiveness of the application.

By sharing memory within the same process, worker threads enable fast in-process communication and data sharing. This makes them ideal for scenarios where tasks require heavy computation or need to operate concurrently without interfering with the main event loop's execution.

#### [2] Child Process

Child process refers to the nodejs processes, created from another nodejs process that allows
us to execute other programs, scripts, or commands from within our application like any other nodejs appplications.
This feature allows us to run **multiple proceses concurrently** or in parallel, which helps in load balancing as well.
Also, using child processes give us full access to the system's CPU cores, allowing us to parallelize tasks and maximize computational efficiency by leveraging multiple cores simultaneously.

#### [3] Cluster Module:

The Cluster module in Node.js enables the creation of child processes to distribute incoming network traffic,
**providing a form of load balancing** and improving the application's overall scalability.

#### [4] Buffer:

Simply put, It's like an array of integers corresponds to raw memory allocation outside the v8 heap, a Buffer is a way to store and manipulate binary data in Node. js. Binary data refers to data that consists of binary values, as opposed to text data, which consists of characters and symbols. Examples of binary data include images, audio and video files, and raw data from a network

#### [5] Streams:

Streams in Node.js are objects that allow reading or writing data continuously. They enable efficient handling of large data sets or data that arrives in chunks, without needing to load the entire data into memory at once. Examples include Readable, Writable, Duplex, and Transform streams.

#### [6] Why NodeJs Single-threated

Node.js is single-threaded because it follows an event-driven architecture based on JavaScript's event loop. 
This event-driven architechture allows Node.js to handle asynchronous I/O operations efficiently and scale well with concurrent requests while maintaining simplicity and performance.

#### [7] What is concurrency in NodeJs?

Concurrency in Node.js refers to the ability of the runtime environment **to handle multiple tasks simultaneously**.
Node.js is inherently single-threaded, meaning it processes JavaScript code using a single main thread.
However, Node.js achieves concurrency through **non-blocking I/O operations and event-driven architecture**, rather than traditional multi-threading.

#### [8] Event Loop:

The event loop is the mechanism that enables Node.js to achieve non-blocking I/O and event-driven concurrency despite JavaScript being single-threaded.

In Node.js, most operations are executed asynchronously. 
When asynchronous functions complete, they get popped out of the call stack firing an event and their callbacks are pushed into the event queue sequentially.

As the callbacks get pushed onto the event queue, the Event Loop processes them completing their event cycles one by one as they come out the other end in a FIFO pattern and constantly checks the queue to see if any callbacks are still waiting to be processed. If there are, it takes each callback one by one and processes them, thus making Node.js asynchronous.

#### [9] Event-Emitter

In Node.js, an EventEmitter is a **built-in class** that **facilitates communication** between objects in a **publisher-subscriber pattern.**
It allows certain objects called "emitters" to emit named events that cause associated functions called "listeners" or "handlers" to be called when the event occurs.

#### [10] Middlewares:

In the context of Node.js, middleware refers to the functions that have access to the request and response objects in the HTTP request-response cycle.
These functions can modify the request and response objects, execute any code, end the request-response cycle, and call the next middleware function in the stack.

#### [11] Promisification:

Promisification is the process of **converting callback-based asynchronous functions** into functions that return Promises. It allows developers to work with asynchronous code in a more modern and readable way, using Promise-based APIs instead of traditional callback-based APIs. Promisification can be done manually by wrapping existing functions with Promise constructors or using utility libraries like util.promisify() in Node.js.

#### [12] Error-First Callbacks:

Error-first callbacks are a common pattern in Node.js for handling asynchronous operations. According to this pattern, callback functions are expected to take two parameters: the first parameter represents an error object (if any), and the second parameter contains the result or data returned by the operation. Developers check the error parameter first and handle any errors accordingly before proceeding with the operation's result.

#### [13] Explain the difference between process.nextTick() and setImmediate().

Both functions are part of Node.js's event loop. process.nextTick() schedules a callback function to be invoked at the end of the current operation, before the next event loop tick starts. It effectively queues the callback to be executed after the current script but before any I/O events or timers.

setImmediate(), on the other hand, schedules a callback to be executed on the next iteration of the event loop, allowing I/O operations to proceed. It is designed to execute a script once the current poll phase completes.

#### [14] Callback-hell:

Callback hell, often called "Pyramid of Doom," refers to a 
problem in JavaScript where multiple nested callbacks create complex, hard-to-read code. This situation typically arises in asynchronous programming, involving operations like network requests or file operations that depend on the results of previous operations.

Callback hell can be avoided by using techniques such as
modularization, promises, async/await, or using libraries like async.js.

#### [15] Promises in Node.js

A promise is an object that represents the eventual completion or failure of an asynchronous operation. It's a core part of JavaScript and is used extensively in Node.js for managing asynchronous operations. A promise can be in one of three states:

Pending: The initial state of a promise. The operation has not completed yet.
Fulfilled: The operation has completed successfully and the promise now holds the resulting value.
Rejected: The operation has failed and the promise holds the reason for the failure.

#### [16] Libuv:

Libuv is a **multi-platform support library** that provides asynchronous I/O operations and abstracts operating system-specific functionalities, such as networking, file system access, and concurrency primitives.
It serves as the core component of Node.js's event loop implementation, handling tasks such as managing I/O events, timers, and callbacks. Libuv enables Node.js to achieve non-blocking I/O and event-driven concurrency by efficiently handling asynchronous operations on various platforms, including Linux, macOS, and Windows. Its cross-platform nature ensures consistent behavior and performance across different operating systems.

#### [17] REPL

In short, a REPL (Read-Eval-Print Loop) is an interactive programming environment that reads, evaluates, and prints user inputs, allowing for quick experimentation and execution of code snippets. It's commonly used for testing small pieces of code, exploring language features, and debugging.

#### [18] Reactor Pattern

Reactor pattern is a deign pattern for handling asynchronous I/O operations. It allows event-driven sytems to handle multiple clients concurrently without creating seperate thread for each clients;

#### [19] Socket.IO:

Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients and servers. It's commonly used for building applications that require real-time updates.

#### [20] Greenlet:

Greenlet is a lightweight, efficient library for running code in a separate thread-like context within a Node.js application. It's often used for parallel processing.

#### [21] TLS (Transport Layer Security)

Transport Layer Security (TLS) is a cryptographic protocol that ensures privacy between communicating applications and users on the Internet. It provides secure communication over a computer network, such as the internet.

#### [22] Explain some of the cluster methods in Node.js

Fork(): It creates a new child process from the master. The isMaster returns true if the current process is master or else false.

isWorker: It returns true if the current process is a worker or else false.

process: It returns the child process which is global.

send(): It sends a message from worker to master or vice versa.

kill(): It is used to kill the current worker.

#### [23] How does Node.js handle child threads?

Node.js is designed to be single-threaded, which means it executes code on a single thread, the main event loop. However, for performing CPU-intensive tasks, Node.js can spawn child threads using the child_process module (via spawn, fork, exec, etc.) to execute other Node.js processes or other applications in separate processes.


#### [24] Polling
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

Even though Node.js is single-threaded, it operates on a non-blocking I/O and event-driven architecture, allowing code to execute asynchronously. 

Asynchronous functions return promises, which represent eventual success or failure of the program. 
Node.js assigns callbacks to these asynchronous functions instead of waiting for their completion before proceeding to the next, contributing to its non-blocking nature.

When these functions complete, they get popped out of the call stack firing an event and their callbacks are pushed into the event queue sequentially. 

This asynchronous nature of Node.js is powered by its 'Event Loop', which also acts as the heart of Node.js and is responsible for managing these callbacks and their events.

After pushing these callbacks into the event queue, the Event Loop processes them completing their event cycles one by one as they come out the other end in a FIFO pattern and constantly checks the queue to see if any callbacks are still waiting to be processed. If there are, it takes each callback one by one and processes them, thus making Node.js asynchronous.