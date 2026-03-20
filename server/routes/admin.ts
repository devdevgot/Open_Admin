import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "../storage";
import { requireAdmin, generateAdminToken, revokeAdminToken, validateAdminToken } from "../middleware/adminAuth";
import { propertyInsertSchema, blogPostInsertSchema, agentInsertSchema, inquiryInsertSchema } from "@shared/schema";
import { AppError } from "../middleware/errorHandler";

const router = Router();

// ─── Uploads setup ────────────────────────────────────────────────────────────

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed") as any, false);
  },
});

// ─── Auth ──────────────────────────────────────────────────────────────────────

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "Aviera2026!";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
    req.session.save(() => {});
    const token = generateAdminToken(username, password);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/logout", (req, res) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) revokeAdminToken(auth.slice(7));
  req.session.destroy(() => {});
  res.json({ success: true });
});

router.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ") && validateAdminToken(auth.slice(7))) {
    return res.json({ admin: true });
  }
  if (req.session?.admin) return res.json({ admin: true });
  return res.status(401).json({ message: "Not authenticated" });
});

// ─── All routes below require admin auth ──────────────────────────────────────

router.use(requireAdmin);

// ─── Image upload ────────────────────────────────────────────────────────────

router.post("/upload", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) throw new AppError(400, "No file uploaded");
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  } catch (err) {
    next(err);
  }
});

router.delete("/upload", async (req, res, next) => {
  try {
    const { filename } = req.body;
    if (!filename) throw new AppError(400, "filename required");
    const filepath = path.join(uploadsDir, filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── Stats ────────────────────────────────────────────────────────────────────

router.get("/stats", async (_req, res, next) => {
  try {
    const stats = await storage.getAdminStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// ─── Properties ──────────────────────────────────────────────────────────────

router.get("/properties", async (_req, res, next) => {
  try {
    const props = await storage.getProperties();
    res.json(props);
  } catch (err) {
    next(err);
  }
});

router.post("/properties", async (req, res, next) => {
  try {
    const data = propertyInsertSchema.parse(req.body);
    const property = await storage.createProperty(data);
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
});

router.put("/properties/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    const data = propertyInsertSchema.partial().parse(req.body);
    const property = await storage.updateProperty(id, data);
    if (!property) throw new AppError(404, "Property not found");
    res.json(property);
  } catch (err) {
    next(err);
  }
});

router.delete("/properties/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    await storage.deleteProperty(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── Blog ─────────────────────────────────────────────────────────────────────

router.get("/blog", async (_req, res, next) => {
  try {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/blog", async (req, res, next) => {
  try {
    const data = blogPostInsertSchema.parse(req.body);
    const post = await storage.createBlogPost(data);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put("/blog/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    const data = blogPostInsertSchema.partial().parse(req.body);
    const post = await storage.updateBlogPost(id, data);
    if (!post) throw new AppError(404, "Post not found");
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/blog/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    await storage.deleteBlogPost(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── Inquiries ────────────────────────────────────────────────────────────────

router.get("/inquiries", async (req, res, next) => {
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

router.patch("/inquiries/:id/status", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    const { status } = req.body;
    if (!status) throw new AppError(400, "status required");
    const updated = await storage.updateInquiryStatus(id, status);
    if (!updated) throw new AppError(404, "Inquiry not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/inquiries/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    await storage.deleteInquiry(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── Agents ───────────────────────────────────────────────────────────────────

router.get("/agents", async (_req, res, next) => {
  try {
    const agentList = await storage.getAgents();
    res.json(agentList);
  } catch (err) {
    next(err);
  }
});

router.post("/agents", async (req, res, next) => {
  try {
    const data = agentInsertSchema.parse(req.body);
    const agent = await storage.createAgent(data);
    res.status(201).json(agent);
  } catch (err) {
    next(err);
  }
});

router.put("/agents/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    const data = agentInsertSchema.partial().parse(req.body);
    const agent = await storage.updateAgent(id, data);
    if (!agent) throw new AppError(404, "Agent not found");
    res.json(agent);
  } catch (err) {
    next(err);
  }
});

router.delete("/agents/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid ID");
    await storage.deleteAgent(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ─── Newsletter subscribers ──────────────────────────────────────────────────

router.get("/subscribers", async (_req, res, next) => {
  try {
    const subs = await storage.getSubscribers();
    res.json(subs);
  } catch (err) {
    next(err);
  }
});

export default router;
