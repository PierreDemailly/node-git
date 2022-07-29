import { commander } from "./commander.js";

export async function restoreFile(file) {
  if (typeof file !== "string") {
    throw new TypeError(`string param required. ${typeof file} given.`);
  }

  try {
    await commander(`git restore --staged ${file}`);
  }
  catch (error) {
    throw error;
  }
}
