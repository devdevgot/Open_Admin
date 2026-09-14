import type { Express } from "express";
import { createServer, type Server } from "http";
import adminRouter from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api/admin", adminRouter);
  app.use(errorHandler as any);
  return httpServer;
}
