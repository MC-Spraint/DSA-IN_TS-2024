//main.js
import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';
import routes from './routes.js'; // Import the routes

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart the worker
  });
} else {
  // Workers share the TCP connection
  const app = express();

  app.use(express.json()); // For parsing application/json

  // Use the routes defined in routes.js
  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.send('Hello from worker ' + process.pid);
  });

  app.listen(8000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}