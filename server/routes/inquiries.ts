import { Router } from "express";
import { storage } from "../storage";
import { inquiryInsertSchema } from "@shared/schema";
import { validate } from "../middleware/validate";
import { AppError } from "../middleware/errorHandler";

const router = Router();

router.post("/", validate(inquiryInsertSchema), async (req, res, next) => {
  try {
    const inquiry = await storage.createInquiry(req.body);
    res.status(201).json({ message: "Inquiry received. We will contact you within 24 hours.", id: inquiry.id });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const inquiries = await storage.getInquiries({
      status: status as string | undefined,
      type: type as string | undefined,
    });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/status", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid inquiry ID");

    const { status } = req.body;
    if (!status) throw new AppError(400, "status is required");

    const updated = await storage.updateInquiryStatus(id, status);
    if (!updated) throw new AppError(404, "Inquiry not found");

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
