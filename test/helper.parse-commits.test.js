// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { parseCommits } from "../src/helpers/parse-commits.js";

// CONSTANTS
const kRawCommits = `
commit 95c72462f57323785ddce8355e8424f58a03f1d6
Author: PierreD <dummy@email.com>
CommitDate:   Tue Jul 12 16:30:01 2022 +0200

    feat(git-api): add git push handler (#6)

commit 1cabcd6bf41184efceedbbd18968a7dc13a554c3
Author: PierreD <dummy@email.com>
CommitDate:   Tue Jul 12 14:10:03 2022 +0200

    feat(git-api): add git-commit handler (#5)

`;

describe("parseCommits", () => {
  it("should have 2 commits", () => {
    const parsed = [...parseCommits(kRawCommits)];

    assert.strictEqual(parsed.length, 2);
    assert.deepStrictEqual(parsed, [{
      commit: "95c72462f57323785ddce8355e8424f58a03f1d6",
      author: {
        name: "PierreD",
        email: "dummy@email.com"
      },
      date: "Tue Jul 12 16:30:01 2022 +0200",
      message: [
        "feat(git-api): add git push handler (#6)"
      ]
    }, {
      commit: "1cabcd6bf41184efceedbbd18968a7dc13a554c3",
      author: {
        name: "PierreD",
        email: "dummy@email.com"
      },
      date: "Tue Jul 12 14:10:03 2022 +0200",
      message: [
        "feat(git-api): add git-commit handler (#5)"
      ]
    }]);
  });
});
