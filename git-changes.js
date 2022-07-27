import { commander } from "./commander.js";
import { getRawLength } from "./helpers/get-raw-length.js";

export async function stagedCount(message) {
  const rawText = await commander("git diff --cached --numstat");

  return getRawLength(rawText);
}

export async function changesCount() {
  const rawText = await commander("git status -s");

  return getRawLength(rawText);
}
