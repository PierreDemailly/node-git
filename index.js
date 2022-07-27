import { add, indexAll, indexAllCurrentDirectory, indexFileOrDirectory, indexFilesOrDirectories } from "./git-add.js";
import { changesCount, stagedCount } from "./git-changes.js";
import { commit } from "./git-commit.js";
import { logs } from "./git-log.js";
import { push } from "./git-push.js";

export {
  add,
  changesCount,
  commit,
  indexAll,
  indexAllCurrentDirectory,
  indexFilesOrDirectories,
  indexFileOrDirectory,
  logs,
  push,
  stagedCount
};
