import { commander } from "./commander.js";

/**
 * Execute `git commit` command with the message `--message` (alias `-m`) 
 * flag for each given message.
 * @example
 * commit("hello") // exec. git commit -m "hello"
 * commit(["hello", "world"]) // exec. git commit -m "hello" -m "world"
 * 
 * @param {string|string[]} message
 * 
 * @todo
 * We may returns the number of indexed files before before the commit.
 * But it would need to refactor the lib to be able to call "plugins" weither
 * given options. Also it could be well to have multiple custom error implementations
 * e.g: NotAGitRepositoryError, NoIndexedFileError, IdentityUnknownError...
 */
export async function commit(message) {
  let inlineMessageForGit!;

  if (Array.isArray(message)) {
    inlineMessageForGit = message.map(msg => `-m ${msg}`).join(" ");
  } else if (typeof message !== "string") {
    throw new TypeError("message must be a string or a string array");
  } else if (message === "") {
    throw new Error("message cannot be empty");
  } else {
    inlineMessageForGit = `-m ${message}`;
  }

  try {
    await commander(`git commit ${inlineMessageForGit}`)
  } catch (error) {
    throw error;
  }
}
