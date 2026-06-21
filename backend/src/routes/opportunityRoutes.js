import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createOpportunity, deleteOpportunity, getAllOpportunities, getOpportunityById, updateOpportunity } from "../controllers/opportunityController.js";

const router = express.Router();

// Create Opportunity
router.post("/", protect, createOpportunity);
router.get("/", protect, getAllOpportunities);
router.get("/:id", protect, getOpportunityById);
router.put("/:id", protect, updateOpportunity);
router.delete("/:id", protect, deleteOpportunity);

export default router;
