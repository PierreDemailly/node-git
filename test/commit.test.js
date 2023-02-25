import { commit } from '../src/api/git-commit.js'
import { stagedCount } from '../src/api/git-changes.js'

import tap from 'tap'

try {
  await commit(13.4)
} catch (error) {
  tap.equal(error.message, 'Expected string or string[], got number')
}

try {
  await commit()
} catch (error) {
  tap.equal(error.message, 'No message given')
}

tap.test('should add "-n" flag', async (t) => {
  const sc = await stagedCount()
  if (sc > 0) {
    throw Error('staged changes would be commited, test canceled')
  }

  try {
    await commit('my awesome commit', { skipHooks: true })
    // it will throw because they are no staged changes.
  } catch (e) {
    t.equal(e.cmd, 'git commit -m "my awesome commit" -n')
  }
})
