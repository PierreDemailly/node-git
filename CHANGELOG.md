# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to Semantic Versioning.

## [Unreleased]

### Changed
- Updated repository: migrated from `tap` to `test_runner`, updated deps & GA, docs, ci, imports
- Cleaned up TODOs

## [1.2.0] - 2023-06-27

### Added

- Added function `init()` to the API to initialize a Git. This function prompt for confirmation if git is already initialized.

## [1.1.1] - 2023-03-22

### Fixed

- `currentBranch()` doesn't include EOL anymore

## [1.1.0] - 2023-03-21

### Added

- Added function `currentBranch()` to the API to get the current branch name.

## [1.0.4] 2023-02-26

### What's Changed

- `skipHooks` now take a boolean (`commit`)
- Added docs
- Update dependencies
- Added license

## [1.0.3] - 2023-02-08

### What's Changed

- Make `indexAll` options optional

## [1.0.2] - 2023-02-06

### What's Changed

- Removed unsafe regexs
- Added docs folder to .gitignore
- Added standard

## [1.0.3] - 2023-02-08 ##

### What's Changed

* chore: added changelog check
* fix(types): make indexAll options optional

## [1.0.1] - 2022-12-13

### What's Changed

* chore: add release-it config to .gitignore (d09452c)
* bump dependencies (#25) (9b053b1)
* fix: update indexAll type (#26) (3a77ac8)

## [1.0.0]

### What's Changed
* refacto: promisify child_process.exec by @PierreDemailly in https://github.com/PierreDemailly/node-git/pull/21
* feat: bypass git hooks by @PierreDemailly in https://github.com/PierreDemailly/node-git/pull/24

## [0.1.2-beta.1] - 2022-08-12

### Added

- Added type declarations to be TypeScript friendly.
- Added documentation [here](https://pierredemailly.github.io/node-git/modules.html)

## [0.1.1-beta.1] - 2022-08-05

### Fixed

- Fixed a bug that made `indexAll()` to not call `add()`.
- Fixed a bug that triggered `add()` twice.

## [0.1.0-beta.1] - 2022-07-29

### Added

- Added function `logs()` to the API. We can nicely parse all the commits from the current branch.
- Added function `commits` to the API. It allows to commit from one or multiples messages (`string|string[]`).
- Added function `push` to the API. It allows to execute `git push`.
- Added functions `indexAll`, `indexAllCurrentDirectory`, `indexFilesOrDirectories` & `indexFileOrDirectory` to the API. All of this help to add files to the git staging area with different options (omit new files, omit deleted files, and more)
- Added functions `changesCount` and `stage count` to the API. It allows to get all changes count &/or the staged one.
- Added function `restore` to the API. It allows to remove a given file from the git staging area.
