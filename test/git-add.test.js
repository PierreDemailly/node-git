import { changesCount, stagedCount } from "../git-changes.js";
import { unlink, writeFile } from "node:fs/promises";
import { indexFileOrDirectory } from "../git-add.js";
import { restaureFile } from "../git-restore.js";
import tap from "tap";

tap.test("git add tests", async(t) => {
  const count = await changesCount();
  const sCount = await stagedCount();

  await writeFile("dummy.txt", "utf-8");

  const countAfterNewFile = await changesCount();
  const sCountAfterNewFile = await stagedCount();

  t.equal(countAfterNewFile, count + 1, "should have changes diff with the new file");
  t.equal(sCountAfterNewFile, sCount, "staged count should not increment because dummy file is not indexed");

  await indexFileOrDirectory("dummy.txt");

  const sCountAfterIndexedFile = await stagedCount();

  t.equal(sCountAfterIndexedFile, sCount + 1, "should have changes diff with the indexed file");

  await unlink("dummy.txt");
  await restaureFile("dummy.txt");

  tap.end();
});
