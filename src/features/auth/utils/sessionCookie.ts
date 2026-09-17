import Cookies, { type CookieAttributes } from "js-cookie";
import { STORAGE_KEYS } from "@/consts/storage";
import { SessionPayload } from "@/features/auth/@types/auth";

const COOKIE_OPTIONS: CookieAttributes = {
  expires: 7,
  sameSite: "lax",
  path: "/",
};

export function getSessionCookie(): SessionPayload | null {
  try {
    const raw = Cookies.get(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    return JSON.parse(raw) as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(session: SessionPayload): void {
  Cookies.set(STORAGE_KEYS.SESSION, JSON.stringify(session), COOKIE_OPTIONS);
}

export function removeSessionCookie(): void {
  Cookies.remove(STORAGE_KEYS.SESSION, { path: "/" });
}
