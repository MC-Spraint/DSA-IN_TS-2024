// main.ts

import * as express from "express";
import * as http from "http";
import * as path from "path";
import { Worker } from "worker_threads";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to process image
app.post("/process-image", (req, res) => {
  // Create a new worker thread
  const worker = new Worker(path.resolve(__dirname, "worker.js"));

  // Example image buffer (replace with your actual image buffer logic)
  const imageBuffer = Buffer.from("example image buffer");

  // Send data to the worker thread
  worker.postMessage({ imageBuffer });

  // Listen for messages from the worker thread
  worker.on("message", (result) => {
    if (result.success) {
      const { outputBuffer } = result;
      // Assuming the processed image is sent back as a buffer
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(outputBuffer);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  // Handle errors from the worker thread
  worker.on("error", (error) => {
    console.error("Worker thread error:", error);
    res.status(500).json({ error: "Internal server error" });
  });

  // Handle worker thread exit
  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

// Create HTTP server
const server = http.createServer(app);

// Define port
const PORT = 8000;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
