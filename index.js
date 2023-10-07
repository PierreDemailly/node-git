// Import Internal Dependencies
import { changesCount, stagedCount } from "./src/api/git-changes.js";
import { indexAll, indexAllCurrentDirectory, indexFileOrDirectory, indexFilesOrDirectories } from "./src/api/git-add.js";
import { commit } from "./src/api/git-commit.js";
import { logs } from "./src/api/git-log.js";
import { push } from "./src/api/git-push.js";
import { restoreFile } from "./src/api/git-restore.js";
import { currentBranch } from "./src/api/git-current-branch.js";
import { init } from "./src/api/git-init.js";

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
  restoreFile,
  currentBranch,
  init
};
