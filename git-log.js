import { $parseCommits } from './helpers/parse-commits.js';
import { commander } from './commander.js';

export async function logs() {
  const rawText = await commander('git log');

  return $parseCommits(rawText);
}
