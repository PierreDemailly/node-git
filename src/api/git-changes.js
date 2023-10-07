// Import Internal Dependencies
import { commander } from "../commander.js";
import { getRawLength } from "../helpers/get-raw-length.js";

/**
 * @typedef {import("./index").stagedCount} StagedCount
 * @typedef {import("./index").changesCount} ChangesCount
 */

/**
 * @see {@link StagedCount}
 */
export async function stagedCount() {
  const rawText = await commander("git diff --cached --numstat");

  return getRawLength(rawText);
}

/**
 * @see {@link ChangesCount}
 */
export async function changesCount() {
  const rawText = await commander("git status -s");

  return getRawLength(rawText);
}
