export function getInitials(name?: string | null): string {
  if (!name || typeof name !== "string") return "";

  const cleanName = name.replace(/\(.*?\)/g, "").trim();
  const words = cleanName.split(/\s+/).filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) {
    return words[0].slice(0, 2);
  }

  return `${words[0].charAt(0)} ${words[1].charAt(0)}`;
}
