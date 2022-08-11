/**
 * Get number of lines separated with newlines "\n" in the string.
 *
 * @param {string} rawText
 * @returns
 */
export function getRawLength(rawText) {
  if (typeof rawText !== "string") {
    throw new TypeError(`string param required. ${typeof rawText} given.`);
  }

  return rawText.split("\n").length - 1;
}
