/**
 * Splits `text` around the first case-insensitive occurrence of `query`.
 * Used to render live search matches with the matched substring in white
 * and the rest in grey (app/search.tsx, app/author-search.tsx).
 */
export function splitOnMatch(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) {
    return null;
  }
  return { before: text.slice(0, index), match: text.slice(index, index + query.length), after: text.slice(index + query.length) };
}
