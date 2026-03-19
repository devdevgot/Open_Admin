import { Router } from "express";
import { storage } from "../storage";
import { newsletterInsertSchema } from "@shared/schema";
import { validate } from "../middleware/validate";
import { AppError } from "../middleware/errorHandler";

const router = Router();

router.post("/", validate(newsletterInsertSchema), async (req, res, next) => {
  try {
    const existing = await storage.getSubscriberByEmail(req.body.email);
    if (existing) {
      return res.json({ message: "You are already subscribed.", alreadySubscribed: true });
    }

    await storage.createSubscriber(req.body);
    res.status(201).json({ message: "Successfully subscribed to Aviera Living market intelligence.", alreadySubscribed: false });
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new AppError(400, "email is required");

    await storage.removeSubscriber(email);
    res.json({ message: "Successfully unsubscribed." });
  } catch (err) {
    next(err);
  }
});

export default router;
