import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export async function commander (command, options = {}) {
  const { stdout, stderr } = await execAsync(command)

  if (stdout && options.split) {
    return stdout.split('\n')
  }

  return stdout || stderr
}
