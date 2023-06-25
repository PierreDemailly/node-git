> Simple Git API for Node.js (ESM).

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=for-the-badge)](#contributors-)
[![npm version](https://img.shields.io/npm/v/@pierred/node-git.svg?style=for-the-badge)](https://npmjs.com/package/@pierred/node-git)
[![last commit](https://img.shields.io/github/last-commit/pierredemailly/node-git.svg?style=for-the-badge)](https://github.com/PierreDemailly/node-git/commits/main)

## Installation

```
npm i @pierred/node-git
```

## API

### `changesCount()`
Get the count of changes.

It does include changes that have been staged, which haven't.

It does not include changes that are untracked.

```ts
changesCount(): Promise<number>
```

### `stagedCount()`

Get the count of changes that have been staged.

```ts
stagedCount(): Promise<number>
```

### `commit(message[, options])`
Create a commit given one or multiple commit message(s).

```ts
commit(message: string | string[], options?: { skipHooks: boolean }): Promise<void>
```
Example usage:

```ts
await commit("My Commit"); // execute `git commit -m "My Commit"`.
await commit(["My Commit", "My Second Commit"]); // execute `git commit -m "My Commit" -m "My Second Commit"`.
```

### `indexAll([options])`
Add current changes to the git staging area.

```ts
indexAll(options?: IndexAllOptions): Promise<void>
```
### `indexAllCurrentDirectory(options)`
Add current changes of the current working directory to the git staging area.

```ts
indexAllCurrentDirectory(options: indexAllCurrentDirectoryOptions): Promise<void>
```
This method should not be used with Git V2.x without ignoreRemovals: true, because Git V2.x does include deleted files
by default. Git V1.x side, it doesn't support --ignore-removal flag, deleted files are
omitted as expected behavior.

### `indexFileOrDirectory(fileOrDirectory)`
Add standalone file or directory to the git staging area.

```ts
indexFileOrDirectory(fileOrDirectory: string): Promise<void>
```

### `indexFilesOrDirectories(filesOrDirectories)`
Add multiple files or directories to the git staging area.

```ts
indexFilesOrDirectories(filesOrDirectories: string[]): Promise<void>
```
### `logs()`
Get the list of all commits for the current branch.

```ts
logs(): Promise<Commit[]>
```

### `push()`
Push to remote.

```ts
push(): Promise<void>
```

### `restoreFile(file)`
Remove given file from the git staging area.

```ts
restoreFile(file: string): Promise<void>
```

### `currentBranch()`
Retrieve current branch name.

```ts
currentBranch(): Promise<string>
```

### `init()`
Initialize a git repository.
If git is already initialized, it will prompt for a confirmation.

```ts
init(): Promise<void>;
```

## Types

### IndexAllOptions
```ts
interface IndexAllOptions {
  omitNewFiles: boolean;
}
```
Whether omit to index new files.
Setting it to true will execute git add -u.

### indexAllCurrentDirectoryOptions
```ts
interface indexAllCurrentDirectoryOptions {
  ignoreRemovals: boolean;
}
```
Whether omit to index deleted files.
Setting it to true will execute git add . --ignore-removal.

### CommitMergeResult
```ts
interface CommitMergeResult {
  from: string;
  to: string;
}
```
Represents the result of a merge commit.

### CommitAuthor
```ts
interface CommitAuthor {
  name: string;
  email: string;
}
```
Represents a commit author: name & email.

### Commit
```ts
interface Commit {
  commit: string,
  merged: null | CommitMergeResult,
  author: CommitAuthor,
  date: string,
  message: string[]
}
```
Represent a commit.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=80" width="80px;" alt="PierreD"/><br /><sub><b>PierreD</b></sub></a><br /><a href="https://github.com/PierreDemailly/node-git/commits?author=PierreDemailly" title="Code">💻</a> <a href="https://github.com/PierreDemailly/node-git/commits?author=PierreDemailly" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SofianD"><img src="https://avatars.githubusercontent.com/u/39944043?v=4?s=80" width="80px;" alt="Yefis"/><br /><sub><b>Yefis</b></sub></a><br /><a href="https://github.com/PierreDemailly/node-git/commits?author=SofianD" title="Code">💻</a> <a href="https://github.com/PierreDemailly/node-git/pulls?q=is%3Apr+reviewed-by%3ASofianD" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
