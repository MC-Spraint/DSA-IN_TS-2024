import { ThreadPool } from "./thread_pool";

// Create a thread pool with 4 workers
const threadPool = new ThreadPool(4);

// Example tasks
const tasks = [
  { number: 5 },
  { number: 10 },
  { number: 15 },
  { number: 20 },
  { number: 25 }
];

// Function to execute tasks using the thread pool
async function executeTasks() {
  for (let task of tasks) {
    try {
      const result = await threadPool.executeTask(task);
      console.log(`Task completed with result:`, result);
    } catch (err) {
      console.error('Error executing task:', err);
    }
  }
}

// Run the example
executeTasks().catch(err => console.error('Error in executeTasks:', err));

// Received message from worker: { taskId: '1719549664471', result: { result: 10 } }
// Task completed with result: [object Object]
// Received message from worker: { taskId: '1719549665924', result: { result: 20 } }
// Task completed with result: [object Object]
// Received message from worker: { taskId: '1719549665928', result: { result: 30 } }
// Task completed with result: [object Object]
// Received message from worker: { taskId: '1719549665946', result: { result: 40 } }
// Task completed with result: [object Object]
// Received message from worker: { taskId: '1719549665946', result: { result: 50 } }
// Task completed with result: [object Object]