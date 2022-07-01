/**
 * Yield commits as pretty objects from the git log lines.
 * Lines represents each command line output as:
 * ```
 * [
 *    "commit hashhashhashhash",
 *    "Author: PierreD <e@mail.com>",
 *    "Date:    The Date",
 *    "",
 *    "    feat: my commit message",
 *    "",
 *    ...
 * ]
 * ```
 * The prettier object look like this:
 * ```
 * [{
 *   hash: "hashhashhashhash",
 *   author: {
 *     name: "PierreD",
 *     email: "e@mail.com",
 *   },
 *   date: "The Date",
 *   message: "feat: my commit message",
 * }, ...]
 * ```
 */
export function $parseCommits(text) {
  const rawCommits = text.match(/commit.*?(?=commit\ |$)/gs);
  const commits = [];

  for(const rawCommit of rawCommits) {
    const [input, commit, merged, author, date, msg] = rawCommit.match(/commit(.*?)(?:Merge(.*?))?Author(.*?)Date(.*?)\\n(.*?)$/s);
    commits.push({ input, commit, merged, author, date, msg });
  }

  return commits;
}
