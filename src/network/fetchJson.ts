const BASE_URL = process.env.BASE_URL || '';
if (!BASE_URL) {
  throw new Error('No BASE_URL set in src/network/fetchJson.ts');
}

interface QueryObject {
  [param: string]: string | boolean | number | void | null
}

/**
 * Generates a query string from an object. The types of values are mapped as such:
 *
 * - value: 123 -> "value=123"
 * - value: "something" -> "value=something"
 * - value: "" -> "value="
 * - value: true -> "value"
 * - value: false -> ""
 * - value: null -> ""
 * - value: undefined -> ""
 */
function createQueryString(queryObject: QueryObject = {}) {
  return Object.entries(queryObject)
    .map(([key, value]) => (value === true ? key : `${key}=${value}`))
    .join("&")
}

interface FetchJsonOptions {
  method?: "get" | "post" | "patch" | "delete" | "put"
  query?: QueryObject
}

export async function fetchJson<T = unknown>(
  endpoint: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  const { query, method } = options

  const queryString = query ? `?${createQueryString(query)}` : ""

  const response = await fetch(`${BASE_URL}/${endpoint}${queryString}`, { method })
  const data = await response.json()

  if (!response.ok) {
    throw new Error((data.error && data.error.message) || "Unknown network error")
  }

  return data
}
