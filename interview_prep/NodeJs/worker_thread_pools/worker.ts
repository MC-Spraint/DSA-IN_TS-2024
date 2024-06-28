import { parentPort } from 'worker_threads';

if (parentPort) {
  parentPort.on('message', (message) => {
    const { taskId, taskData } = message;
    const result = heavyCalculation(taskData.number);
    parentPort?.postMessage({ taskId, result });

  });
}

function heavyCalculation(data: number): any {
  // Perform heavy calculation here
  return { result: data * 2 };
}
