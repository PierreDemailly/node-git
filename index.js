import { logs } from "./git-log.js";
import { commit } from "./git-commit.js";
import { push } from "./git-push.js";

export const NodeGit = Object.freeze({
  logs,
  commit,
  push
});
