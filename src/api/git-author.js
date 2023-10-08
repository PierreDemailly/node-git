// Import Internal Dependencies
import { commander } from "../commander.js";

export async function currentAuthor() {
  const author = {
    name: (await commander("git config user.name")).toString().replace(/\r?\n/, ""),
    email: (await commander("git config user.email")).toString().replace(/\r?\n/, "")
  };

  return author.name ? `${author.name} <${author.email}>` : "";
}
