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
export function* parseCommits(text) {
  const rawCommits = text.match(/commit.*?(?=\ncommit |$)/gs);
  for (const rawCommit of rawCommits) {
    const lines = rawCommit.split("\n");
    let commit = null;
    let merged = null;
    let author = null;
    let date = null;
    const messages = new Set();

    for (const line of lines) {
      const startsWith = line.slice(0, 7);
      if (startsWith === "commit ") {
        commit = line.substring(7);
      }
      else if (startsWith === "Merge: ") {
        const mergedData = line.substring(7).split(" ");
        merged = { from: mergedData[0], to: mergedData[1] };
      }
      else if (startsWith === "Author:") {
        const authorData = line.substring(8).split(" ");
        author = { name: authorData[0], email: authorData[1] };
      }
      else if (startsWith === "Date:  ") {
        date = line.substring(8);
      }
      else {
        const msg = line.trim();
        if (msg) {
          messages.add(msg);
        }
      }
    }
    yield ({
      commit,
      merged,
      author,
      date,
      messages: [...messages]
    });
  }
}
