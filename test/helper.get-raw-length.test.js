// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import { getRawLength } from "../src/helpers/get-raw-length.js";

describe("getRawLength", () => {
  it("should have 2 rows", () => {
    assert.strictEqual(getRawLength("foo\nbar\n"), 2);
  });

  it("should have 3 rows", () => {
    assert.strictEqual(getRawLength(`
      one
      two
      three`), 3);
  });
});
