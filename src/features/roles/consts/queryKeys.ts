export const ROLES_QUERY_KEYS = {
  all: ["roles"] as const,
  list: () => ["roles", "list"] as const,
  detail: (id: string) => ["roles", id] as const,
};
