/**
 * @param {string} text Represents the whole output of `git log` command as a single string.
 * @returns {{
 *   commit: string,
 *   merged: null|{from: string, to: string},
 *   author: {name: string, email: string},
 *   date: string,
 *   message: string[]
 * }[]} All commits in the log.
 */
export function parseCommits(text) {
  const rawCommits = text.match(/commit.*?(?=commit |$)/gs);
  const commits = [];

  for (const rawCommit of rawCommits) {
    const commitData = rawCommit.match(
      /commit (.*?)(?:Merge: (.*?))?Author: (.*?)Date: (.*?)\n(.*?)$/s
    );

    const [, commit, rawMerged, rawAuthor, date, msg] = commitData.map(
      (data) => {
        if (!data) {
          return null;
        }

        return data.replace(/^\n|\n+$|\t| + /g, "");
      }
    );

    let merged = null;
    if (rawMerged) {
      const mergedData = rawMerged.split(" ");

      merged = {
        from: mergedData[0],
        to: mergedData[1]
      };
    }

    const authorData = rawAuthor.split(" ");

    commits.push({
      commit,
      merged,
      author: {
        name: authorData[0],
        email: authorData[1]
      },
      date,
      message: msg.split(/\n\n/)
    });
  }

  return commits;
}
