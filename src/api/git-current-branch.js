import { commander } from "../commander.js";

export async function currentBranch() {
  const rawText = await commander("git rev-parse --abbrev-ref HEAD");

  return rawText.replace("\n", "");
}
