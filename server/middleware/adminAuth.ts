import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

declare module "express-session" {
  interface SessionData {
    admin: boolean;
  }
}

// In-memory token store (token → expiry timestamp)
const tokenStore = new Map<string, number>();

const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24h

export function generateAdminToken(): string {
  const token = crypto.randomBytes(32).toString("hex");
  tokenStore.set(token, Date.now() + TOKEN_TTL);
  return token;
}

export function validateAdminToken(token: string): boolean {
  const expiry = tokenStore.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    tokenStore.delete(token);
    return false;
  }
  return true;
}

export function revokeAdminToken(token: string) {
  tokenStore.delete(token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // 1. Check bearer token (primary method — works in all environments)
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    if (validateAdminToken(token)) return next();
  }

  // 2. Fallback: check session cookie
  if (req.session?.admin === true) return next();

  return res.status(401).json({ message: "Unauthorized" });
}
