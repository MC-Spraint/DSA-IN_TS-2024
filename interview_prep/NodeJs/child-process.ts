import { exec } from 'child_process';
const command: string = 'ls -la';

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error('Error executing command:', err);
    return;
  }
  console.log('Command output:', stdout);
});
