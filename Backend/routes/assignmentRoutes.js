import express from "express";
import {
  addAssignment,
  getFacultyAssignments,
  getAssignmentsByClass,
  markAsSubmitted,
} from "../controllers/assignmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Faculty: Add assignment
router.post("/add", protect, addAssignment);

// Faculty: View their assignments
router.get("/my-assignments", protect, getFacultyAssignments);

// Student: View all assignments for their class
router.get("/class", protect, getAssignmentsByClass);

// Faculty: Mark student assignment as completed
router.post("/mark-submitted", protect, markAsSubmitted);

export default router;
