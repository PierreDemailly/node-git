import {exec} from 'node:child_process';

export function commander(command) {
  return new Promise(resolve => {
    exec(command, (_, stdout, stderr) => {
      resolve(stdout ? stdout.split('\n') : stderr);
    });
  });
}
