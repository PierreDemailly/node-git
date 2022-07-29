import { getRawLength } from "../helpers/get-raw-length.js";

import tap from "tap";

tap.equal(getRawLength("foo\nbar\n"), 2, "should have 2 raws");

tap.equal(getRawLength(`
    one
    two
    three`), 3, "should have 3 rows");
