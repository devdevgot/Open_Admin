import { Router } from "express";
import { storage } from "../storage";
import { AppError } from "../middleware/errorHandler";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const favs = await storage.getFavorites();
    res.json(favs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId) throw new AppError(400, "propertyId is required");

    const already = await storage.isFavorited(propertyId);
    if (already) {
      await storage.removeFavorite(propertyId);
      return res.json({ favorited: false });
    }

    await storage.addFavorite({ propertyId });
    res.json({ favorited: true });
  } catch (err) {
    next(err);
  }
});

export default router;
