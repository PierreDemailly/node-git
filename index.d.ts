export interface IndexAllOptions {
  /**
   * Whether omit to index new files.
   * Setting it to `true` will execute `git add -u`.
   */
  omitNewFiles: boolean;
}
export interface indexAllCurrentDirectoryOptions {
  /**
   * Whether omit to index deleted files.
   * Setting it to `true` will execute `git add . --ignore-removal`.
   *
   */
  ignoreRemovals: boolean;
}
/**
 * Represents the result of a merge commit.
 */
export interface CommitMergeResult {
  /**
   * The branch that was merged into the current branch.
   */
  from: string;
  /**
   * The base branch.
   */
  to: string;
}
/**
 * Represents a commit author: name & email.
 */
export interface CommitAuthor {
  name: string;
  email: string;
}

/**
 * Represent a commit.
 */
export interface Commit {
  commit: string,
  /**
   * If null, it means the commit is not a merge commit.
   */
  merged: null | CommitMergeResult,
  author: CommitAuthor,
  date: string,
  message: string[]
}
/**
 * Get the count of changes.
 *
 * It does include changes that have been staged, which haven't.
 *
 * It does not include changes that are untracked.
 */
export function changesCount(): Promise<number>;
/**
 * Get the count of changes that have been staged.
 */
export function stagedCount(): Promise<number>;
/**
 * Create a commit given one or multiple commit message(s).
 *
 * @example
 * ```ts
 * await commit("My Commit"); // execute `git commit -m "My Commit"`.
 * await commit(["My Commit", "My Second Commit"]); // execute `git commit -m "My Commit" -m "My Second Commit"`.
 * ```
 */
export function commit(message: string | string[], options?: { skipHooks: boolean }): Promise<void>;

/**
 * Add current changes to the git staging area.
 *
 * Changes that are not
 *
 * @see {@link IndexAllOptions} for existing options.
 */
export function indexAll(options?: IndexAllOptions): Promise<void>;
/**
 * Add current changes of the current working directory to the git staging area.
 *
 * This method should not be used with Git V2.x without `ignoreRemovals: true`, because Git V2.x does include deleted files
 * by default. Git V1.x side, it doesn't support `--ignore-removal` flag, deleted files are
 * omitted as expected behavior.
 *
 * @see {@link indexAllCurrentDirectoryOptions} for existing options.
 */
export function indexAllCurrentDirectory(options: indexAllCurrentDirectoryOptions): Promise<void>;
/**
 * Add standalone file or directory to the git staging area.
 */
export function indexFileOrDirectory(fileOrDirectory: string): Promise<void>;
/**
 * Add multiple files or directories to the git staging area.
 */
export function indexFilesOrDirectories(filesOrDirectories: string[]): Promise<void>;
/**
 * Get the list of all commits for the current branch.
 */
export function logs(): Promise<Commit[]>;
/**
 * Push to remote.
 */
export function push(): Promise<void>;
/**
 * Remove given file from the git staging area.
 */
export function restoreFile(file: string): Promise<void>;
/**
 * Get the current branch name
 */
export function currentBranch(): Promise<string>;
