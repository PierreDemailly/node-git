import {commander} from './commander.js';
import { $parseCommits } from './helpers/parse-commits.js';

export async function logs() {
  const lines = await commander('git log');
  return [...$parseCommits(lines)];
}
