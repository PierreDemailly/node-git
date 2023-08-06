// Import Node.js Dependencies
import fs from "node:fs";
import { confirm } from "@topcli/prompts";

// Import Internal Dependencies
import { commander } from "../commander.js";

export async function init() {
  if (fs.existsSync(".git")) {
    const answer = await confirm("Are you sure you want to reinitialize this repository?");
    if (!answer) {
      return;
    }
  }

  await commander("git init");
}
