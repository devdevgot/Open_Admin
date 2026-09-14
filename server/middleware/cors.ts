import type { Request, Response, NextFunction } from "express";
import { adminConfig } from "../../admin.config";

export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origins = adminConfig.corsOrigins;
  const origin = req.headers.origin;

  if (origins.includes("*")) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else if (origin && origins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
}
