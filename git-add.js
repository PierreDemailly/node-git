import { commander } from "./commander.js";

/**
 * @typedef {import("./index").indexAll} IndexAll
 * @typedef {import("./index").indexFileOrDirectory} indexFileOrDirectory
 * @typedef {import("./index").indexFilesOrDirectories} indexFilesOrDirectories
 * @typedef {import("./index").indexAllCurrentDirectory} indexAllCurrentDirectory
 */

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

/**
 * @see {@link indexFileOrDirectory}
 */
export async function indexFileOrDirectory(path) {
  if (!path) {
    throw Error("Please provide a file or a directory to index.");
  }

  if (typeof path !== "string") {
    throw new TypeError(`Expected string, got ${typeof path}.`);
  }

  await add(path);
}

/**
 * @see {@link indexFilesOrDirectories}
 */
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

/**
 * @see {@link IndexAll}
 */
export async function indexAll(options) {
  if (options.omitNewFiles) {
    await add("-u");

    return;
  }

  await add("--all");
}

/**
 * @see {@link indexAllCurrentDirectory}
 */
export async function indexAllCurrentDirectory(options) {
  if (options.ignoreRemovals) {
    await add(". --ignore-removal");

    return;
  }

  await add(".");
}
