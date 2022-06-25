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
export function* $parseCommits(lines) {
  const currentCommit = [];

  for (const line of lines) {
    const length = currentCommit.length;
    if (line.startsWith('commit') && length) {
      const hash = currentCommit[0].split('commit ')[1];
      // from "Author: PierreD <e@mail.com>" to ["Author: PierreD", "e@mail.com>"]
      const authorStr = currentCommit[1].split(' <');
      // remove "Author: "
      const name = authorStr[0].split('Author: ')[1];
      // need to slice without last character ">" of the email
      const email = authorStr[1].slice(0, -1);
      const date = currentCommit[2].split('Date:')[1].trimStart();
      // currentCommit[3] is always a blank line
      const message = currentCommit[4].trimStart();

      yield {
        hash,
        author: {
          name,
          email,
        },
        date,
        message,
      };
      yield* $parseCommits(lines.slice(length));

      return;
    }
    currentCommit.push(line);
  }
}
