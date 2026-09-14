import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

declare module "express-session" {
  interface SessionData {
    admin: boolean;
  }
}

const TOKEN_SECRET = process.env.TOKEN_SECRET || "open-admin-token-secret-change-me";

export function generateAdminToken(username: string, password: string): string {
  return crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(`${username}:${password}`)
    .digest("hex");
}

export function validateAdminToken(token: string): boolean {
  const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin";
  const expected = generateAdminToken(ADMIN_USER, ADMIN_PASS);
  try {
    return (
      token.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))
    );
  } catch {
    return false;
  }
}

export function revokeAdminToken(_token: string) {
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    if (validateAdminToken(token)) return next();
  }
  if (req.session?.admin === true) return next();
  return res.status(401).json({ message: "Unauthorized" });
}
