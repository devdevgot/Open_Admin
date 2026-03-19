import { Router } from "express";
import { storage } from "../storage";
import { propertyInsertSchema } from "@shared/schema";
import { validate } from "../middleware/validate";
import { AppError } from "../middleware/errorHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { type, listingType, beds, priceMin, priceMax, community, status } = req.query;

    const filters = {
      type: type as string | undefined,
      listingType: listingType as string | undefined,
      beds: beds ? parseInt(beds as string) : undefined,
      priceMin: priceMin ? parseInt(priceMin as string) : undefined,
      priceMax: priceMax ? parseInt(priceMax as string) : undefined,
      community: community as string | undefined,
      status: status as string | undefined,
    };

    const props = await storage.getProperties(filters);
    res.json(props);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid property ID");

    const property = await storage.getPropertyById(id);
    if (!property) throw new AppError(404, "Property not found");

    res.json(property);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate(propertyInsertSchema), async (req, res, next) => {
  try {
    const property = await storage.createProperty(req.body);
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
});

export default router;
