# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to Semantic Versioning.

## [Unreleased]

### Added

- Added type declarations to be TypeScript friendly.

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
