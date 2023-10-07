// Import Node.js Dependencies
import fs from "node:fs";
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { changesCount, stagedCount } from "../src/api/git-changes.js";
import { commander } from "../src/commander.js";
import { commit } from "../src/api/git-commit.js";
import { indexFileOrDirectory } from "../src/api/git-add.js";
import { logs } from "../src/api/git-log.js";
import { restoreFile } from "../src/api/git-restore.js";

test("e2e tests", async() => {
  const count = await changesCount();
  const sCount = await stagedCount();

  if (sCount >= 1) {
    throw new Error("Git staging area must be empty before executing the tests");
  }

  fs.writeFileSync("dummy.txt", "utf-8");

  const countAfterNewFile = await changesCount();
  const sCountAfterNewFile = await stagedCount();

  assert.equal(countAfterNewFile, count + 1, "after creating a file, `changesCount` should be incremented by 1.");
  assert.equal(
    sCountAfterNewFile,
    sCount,
    "after creating a file `stagedCount` should be the same because the file is not yet staged."
  );

  await indexFileOrDirectory("dummy.txt");

  const sCountAfterIndexedFile = await stagedCount();

  assert.equal(sCountAfterIndexedFile, sCount + 1, "after indexing a file, `stagedCount` should be incremented by 1.");

  await restoreFile("dummy.txt");

  const sCountAfterRestoredFile = await stagedCount();

  assert.equal(
    sCountAfterRestoredFile,
    sCountAfterIndexedFile - 1,
    "after restoring the file, `stageCount` should be decremented by 1."
  );

  await indexFileOrDirectory("dummy.txt");
  await commit(["1st message", "2nd message"]);

  const commits = await logs();

  assert.equal(commits[0].message.length, 2, "should have 2 commit messages");
  assert.equal(commits[0].message[0], "1st message", "first message should be the same as the one provided.");
  assert.equal(commits[0].message[1], "2nd message", "second message should be the same as the one provided.");

  // revert the commit
  await commander("git reset HEAD~1");
  // delete the created file
  fs.unlinkSync("dummy.txt");
});
