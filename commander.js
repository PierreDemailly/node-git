import { exec } from 'node:child_process';

export function commander(command, options = {}) {
  return new Promise((resolve) => {
    exec(command, (_, stdout, stderr) => {
      if (options.split) {
        stdout = stdout.split('\n');
      }

      resolve(stdout || stderr);
    });
  });
}
