import { exec } from 'child_process';

exec('ls -la', (err, stdout, stderr) => {
  if (err) {
    console.error('Error executing command:', err);
    return;
  }
  console.log('Command output:', stdout);
});
