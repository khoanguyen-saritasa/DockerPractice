/**
 * Compose query as axios param of post method.
 * @param query Query need to be sent.
 */
export function composeQuery(query: string): {query: string;} {
  return {
    query,
  };
}
