import { commander } from "./commander.js";

/**
 * Execute `git add` command.
 *
 */
async function add(path) {
  try {
    await commander(`git add ${path}`);
  }
  catch (error) {
    throw error;
  }
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
  if (!paths) {
    throw Error("No file neither directory found.");
  }

  for (const path of paths) {
    if (typeof path !== "string") {
      throw new TypeError(`Expected string, got ${typeof path}.`);
    }

    await add(path);
  }
}

export async function indexAll(options) {
  if (options.withoutNewFiles) {
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
