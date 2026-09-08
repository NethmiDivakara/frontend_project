export function buildQueryString<T extends object>(query: T = {} as T): string {
  const searchParams = new URLSearchParams()

  Object.entries(query as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return

    if (typeof value === "boolean") {
      searchParams.set(key, value ? "1" : "0")
    } else {
      searchParams.set(key, String(value))
    }
  })

  return searchParams.toString()
}