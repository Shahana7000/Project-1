import express from "express";
import { addLecture, getFacultyLectures, getAllLectures, deleteLecture } from "../controllers/lectureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Faculty: add a new lecture
router.post("/add", protect, addLecture);

// Faculty: view own lectures
router.get("/my-lectures", protect, getFacultyLectures);

// Student: view all lectures
router.get("/all", protect, getAllLectures);

// Faculty: delete a lecture
router.delete("/:id", protect, deleteLecture);

export default router;
