import { parentPort } from 'worker_threads';

if (parentPort) {
  parentPort.on('message', async (message) => {
    const { taskId, taskData } = message;
    
    try {
      if(taskData.number === 20) throw new Error('v');
      const result = await heavyCalculation(taskData.number);
      parentPort?.postMessage({ taskId, result });

    } catch (error: any) {
      parentPort?.postMessage({ taskId, error: error.message });
    }
  });
}

async function heavyCalculation(data: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: data * 2 });
    }, 1000); // Simulating delay for heavy computation
  });
}
