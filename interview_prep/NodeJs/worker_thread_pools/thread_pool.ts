// threadPool.ts
import { Worker } from 'worker_threads';
import * as path from 'path';

export class ThreadPool {
  poolSize: number;
  workers: Worker[];
  taskQueue: any[];

  constructor(poolSize: number) {
    this.poolSize = poolSize;
    this.workers = [];
    this.taskQueue = [];
    this.initializePool();
  }

  initializePool() {
    for (let i = 0; i < this.poolSize; i++) {

      const worker = new Worker(path.resolve(__dirname, './worker.ts'));

      worker.on('message', (message) => {
        console.log('Received message from worker:', message);
        const { taskId, result } = message;
        const taskIndex = this.taskQueue.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          const { resolve } = this.taskQueue[taskIndex];
          resolve(result);
          this.taskQueue.splice(taskIndex, 1);
        } else {
          console.error(`Task with ID ${taskId} not found in task queue`);
          // Optionally handle cases where the task is not found
        }
      });
      worker.on('exit', (code) => {
        console.log(`Worker process exited with code ${code}`);
        // Replace the exited worker with a new one
        // this.replaceWorker(worker);
      });
      worker.on('error', (err) => {
        console.error('Worker thread error:', err);
        // Handle error scenarios, e.g., retrying tasks, logging errors, etc.
      });
      

      this.workers.push(worker);
    }
  }

  async executeTask(taskData: any): Promise<void> {
    const freeWorker = this.getFreeWorker();
    const taskId = Date.now().toString();

    if (!freeWorker) {
      throw new Error('All workers are busy');
    }
    return new Promise((resolve, reject) => {
      if(taskData.number === 20) reject(new Error('v'));
      freeWorker.postMessage({ taskId, taskData });
      this.taskQueue.push({ id: taskId, resolve });
    });
  }

  getFreeWorker(): Worker | undefined {
    return this.workers.find(worker => !this.isWorkerBusy(worker));
  }

  isWorkerBusy(worker: Worker): boolean {
    // Simplified check if the worker is busy
    // You might need a more sophisticated check based on your application's logic
    return this.taskQueue.some(task => task.id === worker.threadId.toString());
  }
  // replaceWorker(workerToReplace: Worker) {
  //   const index = this.workers.indexOf(workerToReplace);
  //   if (index !== -1) {
  //     const newWorker = new Worker(path.resolve(__dirname, './worker.ts'));
  //     this.workers[index] = newWorker;

  //     newWorker.on('message', (message) => {
  //       const { taskId, result } = message;
  //       const taskIndex = this.taskQueue.findIndex(task => task.id === taskId);
  //       if (taskIndex !== -1) {
  //         const { resolve } = this.taskQueue[taskIndex];
  //         resolve(result);
  //         this.taskQueue.splice(taskIndex, 1); // Remove the task from the queue
  //       }
  //     });

  //     newWorker.on('error', (err) => {
  //       console.error('Worker process error:', err);
  //     });

  //     newWorker.on('exit', (code) => {
  //       console.log(`Worker process exited with code ${code}`);
  //       // Replace the exited worker with a new one recursively
  //       this.replaceWorker(newWorker);
  //     });
  //   }
  // }
}
