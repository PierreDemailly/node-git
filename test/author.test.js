// Import Node.js Dependencies
import { describe, it, before } from "node:test";
import assert from "node:assert";
import { execSync } from "node:child_process";

// Import Third-party Dependencies
import isCI from "is-ci";

// Import Internal Dependencies
import { currentAuthor } from "../src/api/git-author.js";

describe("currentAuthor", () => {
  before(() => {
    if (isCI) {
      execSync("git config user.email \"foo@bar.com\"");
      execSync("git config user.name \"Foo\"");
    }
  });

  it("should return the current author", async() => {
    const author = await currentAuthor();

    assert.match(author, /[^<]+ (<[^@]+@[^>]+>){1}$/);

    if (isCI) {
      assert.equal(author, "Foo <foo@bar.com>");
    }
  });
});
