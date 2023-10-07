// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { commit } from "../src/api/git-commit.js";
import { stagedCount } from "../src/api/git-changes.js";

test("should expect string or string[]", async() => {
  await assert.rejects(async() => await commit(13.4), {
    name: "TypeError",
    message: "Expected string or string[], got number"
  });
});

test("message should be required", async() => {
  await assert.rejects(async() => await commit(), {
    name: "Error",
    message: "No message given"
  });
});

test("should add \"-n\" flag", async() => {
  const sc = await stagedCount();
  if (sc > 0) {
    throw Error("staged changes would be commited, test canceled");
  }

  await assert.rejects(async() => {
    // it will throw because there is no staged changes.
    await commit("my awesome commit", { skipHooks: true });
  }, {
    message: "Command failed: git commit -m \"my awesome commit\" -n\n",
    cmd: "git commit -m \"my awesome commit\" -n"
  });
});
