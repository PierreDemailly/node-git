import { changesCount, stagedCount } from "./git-changes.js";
import { indexAll, indexAllCurrentDirectory, indexFileOrDirectory, indexFilesOrDirectories } from "./git-add.js";
import { commit } from "./git-commit.js";
import { logs } from "./git-log.js";
import { push } from "./git-push.js";
import { restoreFile } from "./git-restore.js";

export {
  changesCount,
  commit,
  indexAll,
  indexAllCurrentDirectory,
  indexFilesOrDirectories,
  indexFileOrDirectory,
  logs,
  push,
  stagedCount,
  restoreFile
};
