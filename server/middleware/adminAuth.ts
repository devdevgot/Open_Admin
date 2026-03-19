import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    admin: boolean;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.admin === true) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
