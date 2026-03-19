import type { Express } from "express";
import { createServer, type Server } from "http";
import propertiesRouter from "./routes/properties";
import favoritesRouter from "./routes/favorites";
import blogRouter from "./routes/blog";
import inquiriesRouter from "./routes/inquiries";
import newsletterRouter from "./routes/newsletter";
import agentsRouter from "./routes/agents";
import { errorHandler } from "./middleware/errorHandler";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api/properties", propertiesRouter);
  app.use("/api/favorites", favoritesRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/inquiries", inquiriesRouter);
  app.use("/api/newsletter", newsletterRouter);
  app.use("/api/agents", agentsRouter);

  app.use(errorHandler as any);

  return httpServer;
}
