import { parsePhoneNumberWithError } from "libphonenumber-js";

export function isValidSaudiPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();
  try {
    const parsed = parsePhoneNumberWithError(trimmed, "SA");
    return parsed.isValid() && parsed.country === "SA";
  } catch {
    return false;
  }
}

export function normalizeSaudiPhone(phone: string): string {
  const trimmed = phone.trim();
  try {
    const parsed = parsePhoneNumberWithError(trimmed, "SA");
    if (parsed && parsed.isValid() && parsed.country === "SA") {
      return parsed.format("E.164");
    }
  } catch {
    // fallback if parsing fails
  }
  return trimmed;
}

export function formatSaudiPhoneDisplay(phone: string): string {
  if (!phone) return "";
  try {
    const parsed = parsePhoneNumberWithError(phone.trim(), "SA");
    if (parsed && parsed.isValid()) {
      return parsed.formatInternational();
    }
  } catch {
    // return raw
  }
  return phone;
}
