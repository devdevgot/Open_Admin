import type { Express } from "express";
import { createServer, type Server } from "http";
import adminRouter from "./routes/admin";
import publicRouter from "./routes/public";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Public API for connected frontends (headless CMS + form submissions)
  app.use("/api", corsMiddleware, publicRouter);

  // Admin API + UI backend
  app.use("/api/admin", adminRouter);

  app.use(errorHandler as any);
  return httpServer;
}
