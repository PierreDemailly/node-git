import { commander } from './commander.js';

async function log() {
  const lines = await commander('git log');
  for (const line of parseCommits(lines)) {
    console.log(line);
  }
}

function* parseCommits(lines) {
  const currentCommit = [];

  for (const line of lines) {
    const length = currentCommit.length;
    if (line.startsWith('commit') && length) {
      yield currentCommit;
      yield *parseCommits(lines.slice(length));
      return;
    }
    currentCommit.push(line);
  }
}

log();
