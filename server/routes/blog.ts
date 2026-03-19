import { Router } from "express";
import { storage } from "../storage";
import { blogPostInsertSchema } from "@shared/schema";
import { validate } from "../middleware/validate";
import { AppError } from "../middleware/errorHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, featured, limit, offset } = req.query;

    const filters = {
      category: category as string | undefined,
      featured: featured === "true" ? true : featured === "false" ? false : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    };

    const posts = await storage.getBlogPosts(filters);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    const id = parseInt(idOrSlug);

    const post = isNaN(id)
      ? await storage.getBlogPostBySlug(idOrSlug)
      : await storage.getBlogPostById(id);

    if (!post) throw new AppError(404, "Article not found");

    await storage.incrementBlogViews(post.id);
    res.json({ ...post, views: post.views + 1 });
  } catch (err) {
    next(err);
  }
});

router.post("/", validate(blogPostInsertSchema), async (req, res, next) => {
  try {
    const post = await storage.createBlogPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

export default router;
