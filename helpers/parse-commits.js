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
    const commitData = rawCommit.match(/commit (.*?)(?:Merge: (.*?))?Author: (.*?)Date: (.*?)\n(.*?)$/s)

    const [, commit, rawMerged, rawAuthor, date, msg] = commitData.map(data => {
      if (!data) {
        return null;
      }

      return data.replace(/^\n|\n+$|\t| + /g, '');
    });

    let merged = null;
    if (rawMerged) {
      const mergedData = rawMerged.split(" ");
      
      merged =  {
        from: mergedData[0],
        to: mergedData[1]
      }
    }

    const authorData = rawAuthor.split(" ");

    commits.push({
      commit,
      merged,
      author : {
        name: authorData[0],
        email: authorData[1]
      },
      date,
      message: msg.split(/\n\n/)
    });
  }

  return commits;
}
