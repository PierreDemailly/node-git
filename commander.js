import { exec } from "node:child_process";

export function commander(command, options = {}) {
  return new Promise((resolve) => {
    exec(command, (_, stdout, stderr) => {
      let result = stdout || stderr;

      if (options.split && stdout) {
        result = result.split("\n");
      }

      resolve(result);
    });
  });
}
