import { changesCount, stagedCount } from "../git-changes.js";
import { unlink, writeFile } from "node:fs/promises";

import { commander } from "../commander.js";
import { commit } from "../git-commit.js";
import { indexFileOrDirectory } from "../git-add.js";
import { logs } from "../git-log.js";
import { restoreFile } from "../git-restore.js";

import tap from "tap";

tap.test("e2e tests", async(t) => {
  const count = await changesCount();
  const sCount = await stagedCount();
  console.log("scount", sCount);
  if (sCount >= 1) {
    throw new Error("Git staging area must be empty before executing the tests");
  }

  await writeFile("dummy.txt", "utf-8");

  const countAfterNewFile = await changesCount();
  const sCountAfterNewFile = await stagedCount();

  t.equal(countAfterNewFile, count + 1, "after creating a file, `changesCount` should be incremented by 1.");
  t.equal(
    sCountAfterNewFile,
    sCount,
    "after creating a file `stagedCount` should be the same because the file is not yet staged.");

  await indexFileOrDirectory("dummy.txt");

  const sCountAfterIndexedFile = await stagedCount();

  t.equal(sCountAfterIndexedFile, sCount + 1, "after indexing a file, `stagedCount` should be incremented by 1.");

  await restoreFile("dummy.txt");

  const sCountAfterRestoredFile = await stagedCount();

  t.equal(
    sCountAfterRestoredFile,
    sCountAfterIndexedFile - 1,
    "after restoring the file, `stageCount` should be decremented by 1."
  );

  await indexFileOrDirectory("dummy.txt");
  await commit(["1 Commit message", "2 Commit message"]);

  const commits = await logs();

  tap.equal(commits[0].message.length, 2, "should have 2 commit messages");
  tap.equal(commits[0].message[0], "1 Commit message", "first message should be the same as the one provided.");
  tap.equal(commits[0].message[1], "2 Commit message", "second message should be the same as the one provided.");

  // revert the commit
  await commander("git reset HEAD~1");
  // restore the file
  await restoreFile("dummy.txt");
  // delete the created file
  await unlink("dummy.txt");

  tap.end();
});
