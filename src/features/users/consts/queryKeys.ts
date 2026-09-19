export const USERS_QUERY_KEYS = {
  all: ["users"] as const,
  list: (filters?: unknown) => ["users", "list", filters] as const,
  detail: (id: string) => ["users", id] as const,
};
