/**
 * Public API for external frontends connected to this admin.
 * Enable CORS via ADMIN_CORS_ORIGINS in admin.config.ts / .env
 */
import { Router } from "express";
import { storage } from "../storage";
import { inquiryInsertSchema, newsletterInsertSchema } from "@shared/schema";
import { adminConfig } from "../../admin.config";

const router = Router();

function moduleEnabled(key: keyof typeof adminConfig.modules): boolean {
  return adminConfig.modules[key]?.enabled ?? true;
}

// ─── Headless CMS reads ───────────────────────────────────────────────────────

router.get("/properties", async (req, res, next) => {
  if (!moduleEnabled("catalog")) return res.status(404).json({ message: "Not found" });
  try {
    const { type, listingType, beds, community, status, priceMin, priceMax } = req.query;
    const props = await storage.getProperties({
      type: type as string | undefined,
      listingType: listingType as string | undefined,
      beds: beds ? parseInt(beds as string) : undefined,
      community: community as string | undefined,
      status: (status as string) || "available",
      priceMin: priceMin ? parseInt(priceMin as string) : undefined,
      priceMax: priceMax ? parseInt(priceMax as string) : undefined,
    });
    res.json(props);
  } catch (err) {
    next(err);
  }
});

router.get("/properties/:id", async (req, res, next) => {
  if (!moduleEnabled("catalog")) return res.status(404).json({ message: "Not found" });
  try {
    const id = parseInt(req.params.id);
    const property = await storage.getPropertyById(id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
});

router.get("/blog", async (req, res, next) => {
  if (!moduleEnabled("blog")) return res.status(404).json({ message: "Not found" });
  try {
    const { category, featured, limit, offset } = req.query;
    const posts = await storage.getBlogPosts({
      category: category as string | undefined,
      featured: featured === "true" ? true : featured === "false" ? false : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/blog/:idOrSlug", async (req, res, next) => {
  if (!moduleEnabled("blog")) return res.status(404).json({ message: "Not found" });
  try {
    const param = req.params.idOrSlug;
    const id = parseInt(param);
    const post = !isNaN(id)
      ? await storage.getBlogPostById(id)
      : await storage.getBlogPostBySlug(param);
    if (!post) return res.status(404).json({ message: "Not found" });
    await storage.incrementBlogViews(post.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.get("/agents", async (_req, res, next) => {
  if (!moduleEnabled("team")) return res.status(404).json({ message: "Not found" });
  try {
    res.json(await storage.getAgents());
  } catch (err) {
    next(err);
  }
});

// ─── Form submissions from external sites ─────────────────────────────────────

router.post("/inquiries", async (req, res, next) => {
  if (!moduleEnabled("inquiries")) return res.status(404).json({ message: "Not found" });
  try {
    const data = inquiryInsertSchema.parse(req.body);
    const inquiry = await storage.createInquiry(data);
    res.status(201).json({ success: true, id: inquiry.id });
  } catch (err) {
    next(err);
  }
});

router.post("/newsletter", async (req, res, next) => {
  if (!moduleEnabled("newsletter")) return res.status(404).json({ message: "Not found" });
  try {
    const data = newsletterInsertSchema.parse(req.body);
    const existing = await storage.getSubscriberByEmail(data.email);
    if (existing) return res.json({ success: true, message: "Already subscribed" });
    await storage.createSubscriber(data);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
