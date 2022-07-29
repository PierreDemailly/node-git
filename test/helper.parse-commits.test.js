import { parseCommits } from "../helpers/parse-commits.js";

import tap from "tap";


const rawCommits = `
commit 95c72462f57323785ddce8355e8424f58a03f1d6
Author: PierreD <39910767+PierreDemailly@users.noreply.github.com>
Date:   Tue Jul 12 16:30:01 2022 +0200

    feat(git-api): add git push handler (#6)

commit 1cabcd6bf41184efceedbbd18968a7dc13a554c3
Author: PierreD <39910767+PierreDemailly@users.noreply.github.com>
Date:   Tue Jul 12 14:10:03 2022 +0200

    feat(git-api): add git-commit handler (#5)

`;
tap.equal(parseCommits(rawCommits).length, 2, "Should have 2 commits");
tap.same(parseCommits(rawCommits), [{
  commit: "95c72462f57323785ddce8355e8424f58a03f1d6",
  merged: null,
  author: {
    name: "PierreD",
    email: "<39910767+PierreDemailly@users.noreply.github.com>"
  },
  date: "Tue Jul 12 16:30:01 2022 +0200",
  message: [
    "feat(git-api): add git push handler (#6)"
  ]
}, {
  commit: "1cabcd6bf41184efceedbbd18968a7dc13a554c3",
  merged: null,
  author: {
    name: "PierreD",
    email: "<39910767+PierreDemailly@users.noreply.github.com>"
  },
  date: "Tue Jul 12 14:10:03 2022 +0200",
  message: [
    "feat(git-api): add git-commit handler (#5)"
  ]
}]);
