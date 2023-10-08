// Import Internal Dependencies
import { commander } from "../commander.js";

/**
 * Execute `git add` command.
 *
 */
async function add(path) {
  await commander(`git add ${path}`);
}

export async function indexFileOrDirectory(path) {
  if (!path) {
    throw Error("Please provide a file or a directory to index.");
  }

  if (typeof path !== "string") {
    throw new TypeError(`Expected string, got ${typeof path}.`);
  }

  await add(path);
}

export async function indexFilesOrDirectories(paths) {
  if (!Array.isArray(paths)) {
    throw TypeError(`Expected array, got ${typeof paths}.`);
  }

  if (!paths) {
    throw Error("No file neither directory given.");
  }

  for (const path of paths) {
    await indexFileOrDirectory(path);
  }
}

export async function indexAll(options) {
  if (options.omitNewFiles) {
    await add("-u");

    return;
  }

  await add("--all");
}

export async function indexAllCurrentDirectory(options) {
  if (options.ignoreRemovals) {
    await add(". --ignore-removal");

    return;
  }

  await add(".");
}
