

//router.js(child caller)
import express from 'express';
import { fork } from 'child_process';
import path from 'path';

// Fork a new child process
// Send data to the child process
// Listen for messages from the child process
// Handle errors from the child process
// Handle child process exit
const router = express.Router();

router.post('/', (req, res) => {
  const { number } = req.body;

  const child = fork(path.resolve(__dirname, 'child.js'));

  child.send({ number });

  child.on('message', (data) => {
    if (data.error) {
      res.status(500).send({ error: data.error });
    } else {
      res.status(200).send({ data });
    }
  });

  child.on('error', (error) => {
    res.status(500).send({ error: error.message });
  });
  
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Child process stopped with exit code ${code}`);
    }
  });
});

export default router;