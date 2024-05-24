## NodeJs Backend Generic Questions

## [1] Asynchronous Programming

Asynchronous programming allows operations to occur independently of the main application thread. This means the program can initiate an operation and move on to another one before the previous one finishes. This is known as non-blocking execution because the initiation of one operation does not block the execution of subsequent operations.

## [2] Synchronous Programming

Synchronous programming is straightforward: operations execute sequentially one after another, meaning that each operation must complete before the next one can begin. This is known as blocking execution because each step blocks the next one from starting until it is finished.

## [3] Single Threaded Applications

Single-threaded applications have only one sequence of instructions (thread) executing at any given time.
They can perform only one task at a time, and all operations are executed sequentially.
If one operation takes a long time (e.g., reading data from a slow disk), it can block the entire application until it completes.
They are simpler to design and reason about because there is no need to manage concurrent access to shared resources.

## [4] Multi-treaded Applications

Multi-threaded applications can execute multiple threads concurrently.
Each thread can perform its own tasks independently of others, potentially speeding up overall performance by taking advantage of multiple CPU cores.
Threads can share resources and communicate with each other, but this introduces complexities such as the need for synchronization to prevent data corruption or race conditions.
They can improve responsiveness in applications by allowing tasks to be performed in the background while the main thread handles user interaction.
They require careful design and management to avoid issues like deadlock, livelock, and race conditions.

## [5] Load Balancer:

Definition: A Load Balancer is a device or software application that distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed, optimizing resource utilization.

## [6] Reverse Proxy:

Definition: A Reverse Proxy is a server that sits between client devices and a web server, forwarding client requests to the web server and returning the server's responses to clients. It's commonly used for load balancing and improving security.

## [7] HAProxy:

Definition: HAProxy is a widely-used open-source load balancer and proxy server. It is known for its high performance and is often used in Node.js deployments to distribute traffic across multiple servers.

## [8] Zero-Downtime Deployment:

Definition: Zero-Downtime Deployment refers to the ability to update or deploy an application without causing any interruption or downtime in service. It ensures continuous availability during the deployment process.

## [9] NGINX:

Definition: NGINX is a popular open-source web server that can also be used as a reverse proxy, load balancer, and HTTP cache. It's often employed in Node.js deployments for its efficiency in handling concurrent connections.


## [10] Horizontal Scalling & Vertical Scalling

Horizontal Scaling (Scaling Out): Adding more servers to distribute the workload across multiple machines.
Vertical Scaling (Scaling Up): Increasing the capacity of a single server by adding more resources (CPU, RAM, storage).