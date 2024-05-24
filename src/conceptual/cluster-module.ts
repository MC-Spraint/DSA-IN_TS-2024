import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import { fork } from 'child_process';


const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);


  // Execute a child process
  const childProcess = fork('child_script.js');

  childProcess.on('message', (message) => {
    console.log('Message from child process:', message);
  });

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}
