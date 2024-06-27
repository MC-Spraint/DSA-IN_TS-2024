// child.js

// Listen for messages from the parent process
process.on('message', (message: any) => {
  console.log('Message from parent:', message);

  const { number } = message;

  // Simulate some task (e.g., processing)
  setTimeout(() => {
    const result = number * 2; // Example processing: double the number

    // Send response back to parent process
    process.send?.({ result });
  }, 1000); // Simulate processing time of 1 second
});

  
// // main.js

// import { Worker, isMainThread, parentPort } from 'worker_threads';
// import path from 'path';

// if (isMainThread) {
//   // Code intended for the main thread
//   console.log('Running in the main thread');

//   // Example of how to communicate with a worker thread
//   parentPort?.on('message', (data) => {
//     const worker = new Worker(path.resolve(__dirname, 'worker.js'));

//     worker.postMessage(data);

//     worker.on('message', (result) => {
//       parentPort?.postMessage(result);
//     });

//     worker.on('error', (error) => {
//       parentPort?.postMessage({ success: false, error: error.message });
//     });

//     worker.on('exit', (code) => {
//       if (code !== 0) {
//         parentPort?.postMessage({ success: false, error: `Worker stopped with exit code ${code}` });
//       }
//     });
//   });
// } else {
//   // Code intended for the worker thread
//   parentPort?.on('message', (data) => {
//     const worker = new Worker(path.resolve(__dirname, 'imageProcessor.js'));

//     worker.postMessage(data);

//     worker.on('message', (result) => {
//       parentPort?.postMessage(result);
//     });

//     worker.on('error', (error) => {
//       parentPort?.postMessage({ success: false, error: error.message });
//     });

//     worker.on('exit', (code) => {
//       if (code !== 0) {
//         parentPort?.postMessage({ success: false, error: `Worker stopped with exit code ${code}` });
//       }
//     });
//   });
// }
