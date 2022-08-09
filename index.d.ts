export function changesCount(): Promise<number>;
export function stagedCount(): Promise<number>;
export function commit(message: string | string[]): Promise<void>;
export function indexAll(options: { withoutNewFiles: boolean }): Promise<void>;
export function indexAllCurrentDirectory(options: { ignoreRemovals: boolean }): Promise<void>;
export function indexFileOrDirectory(fileOrDirectory: string): Promise<void>;
export function indexFilesOrDirectories(filesOrDirectories: string[]): Promise<void>;
export function logs(): Promise<{
  commit: string,
  merged: null | { from: string, to: string },
  author: { name: string, email: string },
  date: string,
  message: string[]
}[]>;
export function push(): Promise<void>;
export function restoreFile(file: string): Promise<void>;
