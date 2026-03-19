import { Router } from "express";
import { storage } from "../storage";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const agents = await storage.getAgents();
    res.json(agents);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const agent = await storage.getAgentById(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (err) {
    next(err);
  }
});

export default router;
