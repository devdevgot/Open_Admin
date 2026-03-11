import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/properties", async (_req, res) => {
    const type = _req.query.type as string | undefined;
    if (type && type !== "All") {
      const props = await storage.getPropertiesByType(type);
      return res.json(props);
    }
    const props = await storage.getProperties();
    res.json(props);
  });

  app.get("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    const property = await storage.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  });

  app.get("/api/favorites", async (_req, res) => {
    const favs = await storage.getFavorites();
    res.json(favs);
  });

  app.post("/api/favorites", async (req, res) => {
    const { propertyId } = req.body;
    if (!propertyId) {
      return res.status(400).json({ message: "propertyId is required" });
    }
    const already = await storage.isFavorited(propertyId);
    if (already) {
      await storage.removeFavorite(propertyId);
      return res.json({ favorited: false });
    }
    await storage.addFavorite({ propertyId });
    res.json({ favorited: true });
  });

  return httpServer;
}
