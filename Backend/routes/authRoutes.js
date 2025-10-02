import express from "express";
import { facultySignup, facultyLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/faculty/signup", facultySignup);
router.post("/faculty/login", facultyLogin);

export default router;
