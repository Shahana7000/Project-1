import Faculty from "../models/Faculty.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Faculty Signup
export const facultySignup = async (req, res) => {
  const { name, email, password, subjects, classes } = req.body;
  try {
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }
    const faculty = await Faculty.create({ name, email, password, subjects, classes });
    res.status(201).json({
      _id: faculty._id,
      name: faculty.name,
      email: faculty.email,
      subjects: faculty.subjects,
      classes: faculty.classes,
      token: generateToken(faculty._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Faculty Login
export const facultyLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const faculty = await Faculty.findOne({ email });
    if (faculty && (await faculty.matchPassword(password))) {
      res.json({
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        subjects: faculty.subjects,
        classes: faculty.classes,
        token: generateToken(faculty._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
