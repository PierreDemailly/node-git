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
export function * parseCommits (text) {
  const tab = '    '
  const rawCommits = text.match(/commit.*?(?=\ncommit |$)/gs)
  const commits = rawCommits.map(
    (commit) => commit.split('\n').flatMap(
      (commitChunk) => {
        if (!commitChunk) {
          return []
        }

        if (commitChunk !== tab && commitChunk.startsWith(tab)) {
          return commitChunk.replace(tab, 'Message: ')
        }

        return commitChunk.trim()
      }
    )
  )

  for (const commit of commits) {
    const result = {
      commit: commit[0].split(' ')[1],
      message: []
    }

    for (const line of commit.slice(1)) {
      if (line.startsWith('Merge:')) {
        const [, from, to] = line.split(' ')
        result.merge = {
          from,
          to
        }
      } else if (line.startsWith('Author:')) {
        const author = line.replace('Author:', '').trim()
        const [name, email] = author.split(' ')
        result.author = {
          name,
          email: email.slice(1, -1)
        }
      } else if (line.startsWith('CommitDate:')) {
        const date = line.replace('CommitDate:', '').trim()
        result.date = date
      } else if (line.startsWith('Message:')) {
        const message = line.replace('Message:', '').trim()
        result.message.push(message)
      }
    }

    yield result
  }
}
