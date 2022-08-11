import { commander } from "../commander.js";

/**
 * Execute `git push` command.
 *
 * @todo
 * Add options/params/handler for set the upstream / remote.
 * Also we can protect the user from pushing to a non-existing remote.
 */
export async function push() {
  try {
    await commander("git push");
  }
  catch (error) {
    throw error;
  }
}
