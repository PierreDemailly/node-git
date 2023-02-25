import { commander } from '../commander.js'

/**
 * Execute `git commit` command with the message `--message` (alias `-m`)
 * flag for each given message.
 * @example
 * commit("hello") // exec. git commit -m "hello"
 * commit(["hello", "world"]) // exec. git commit -m "hello" -m "world"
 *
 * @param {string|string[]} message
 * @param {Object} options commit options
 * @param {boolean} options.skipHooks set true to skip any git hook
 *
 * @todo
 * We may returns the number of indexed files before before the commit.
 * But it would need to refactor the lib to be able to call "plugins" weither
 * given options. Also it could be well to have multiple custom error implementations
 * e.g: NotAGitRepositoryError, NoIndexedFileError, IdentityUnknownError...
 */
export async function commit (message, options) {
  const stringifiedMessages = (Array.isArray(message) ? message : [message]).flatMap((msg) => {
    if (!msg) {
      return []
    }

    if (typeof msg === 'string') {
      return `-m "${msg}"`
    }

    throw new TypeError(`Expected string or string[], got ${typeof msg}`)
  }).join(' ')

  if (!stringifiedMessages) {
    throw new Error('No message given')
  }

  let command = `git commit ${stringifiedMessages}`

  if (options?.skipHooks) {
    command += ' -n'
  }

  await commander(command)
}
