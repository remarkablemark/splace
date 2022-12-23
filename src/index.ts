/**
 * Split and replace string.
 *
 * @param string - String.
 * @param replace - Key-value pairs to replace.
 * @param excludeEmpty - Exclude empty string.
 * @returns - Array of items.
 */
export function splace(string: string, replace: object, excludeEmpty = true) {
  if (typeof string !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (!(replace instanceof Object)) {
    throw new TypeError('Second argument must be an object');
  }

  const pattern = Object.keys(replace)
    .map((string) => `${escape(string)}`)
    .join('|');

  const regex = new RegExp(`(${pattern})`, 'g');
  const strings = string.split(regex);

  const result = strings.map((string: string) =>
    Object.prototype.hasOwnProperty.call(replace, string)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (replace as Record<string, any>)[string]
      : string
  );

  if (excludeEmpty) {
    return result.filter((string) => string !== '');
  }

  return result;
}

const SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;

/**
 * Escape special characters in regular expression.
 *
 * @param string - String.
 * @returns - Escaped regular expression.
 */
function escape(string: string) {
  return string.replace(SPECIAL_CHARACTERS, '\\$&');
}
