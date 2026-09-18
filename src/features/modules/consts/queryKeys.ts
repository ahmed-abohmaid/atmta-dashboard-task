export const MODULES_QUERY_KEYS = {
  all: ["modules"] as const,
  list: () => ["modules", "list"] as const,
  detail: (id: string) => ["modules", id] as const,
};
