export const VENDORS_QUERY_KEYS = {
  all: ["vendors"] as const,
  list: (filters?: unknown) => ["vendors", "list", filters] as const,
  detail: (id: string) => ["vendors", id] as const,
};
