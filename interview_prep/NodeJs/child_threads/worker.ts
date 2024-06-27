//worker.js
import { parentPort } from 'worker_threads';
import sharp from 'sharp'; // Example image processing library

parentPort?.on('message', (data) => {
  const { imageBuffer } = data;

  // Perform some image processing
  sharp(imageBuffer)
    .resize(200, 200)
    .toBuffer()
    .then((outputBuffer) => {
      parentPort?.postMessage({ success: true, outputBuffer });
    })
    .catch((error) => {
      parentPort?.postMessage({ success: false, error: error.message });
    });
});