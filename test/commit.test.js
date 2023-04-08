import dns from 'node:dns/promises'
import tap from 'tap'

async function resolveMxWithResolver (domain) {
  const resolver = new dns.Resolver({
    timeout: 1000,
    tries: 1
  })

  const mxRecords = await resolver.resolveMx(domain)
    .catch((err) => new Error(
      err.code === 'ENOTFOUND'
        ? 'Domain not found'
        : err.message))

  if (mxRecords instanceof Error) {
    return {
      error: mxRecords.message,
      context: mxRecords
    }
  }

  return mxRecords.map(({ exchange }) => exchange)
}

async function resolveMxWithoutResolver (domain) {
  const mxRecords = await dns.resolveMx(domain)
    .catch((err) => new Error(
      err.code === 'ENOTFOUND'
        ? 'Domain not found'
        : err.message))

  if (mxRecords instanceof Error) {
    return {
      error: mxRecords.message,
      context: mxRecords
    }
  }

  return mxRecords.map(({ exchange }) => exchange)
}

tap.test('resolveMxWithResolver', async (t) => {
  t.plan(2)

  const mxRecords = await resolveMxWithResolver('google.com')

  t.ok(Array.isArray(mxRecords), 'should return an array')
  t.ok(mxRecords.length > 0, 'should have at least one record')
})

tap.test('resolveMxWithResolver wrong domain', async (t) => {
  const mxRecords = await resolveMxWithResolver('aaa')

  t.equal(mxRecords.error, 'queryMx ENODATA aaa')
})

tap.test('resolveMxWithoutResolver wrong domain', async (t) => {
  t.plan(1)

  const mxRecords = await resolveMxWithoutResolver('aaa')

  t.equal(mxRecords.error, 'queryMx ENODATA aaa')
})
