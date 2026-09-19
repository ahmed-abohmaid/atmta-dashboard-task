export const CATEGORIES_QUERY_KEYS = {
  all: ["categories"] as const,
  list: () => ["categories", "list"] as const,
  detail: (id: string) => ["categories", id] as const,
  lookup: (excludeId?: string) => ["categories", "lookup", excludeId] as const,
};
