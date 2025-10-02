import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Student Signup
export const studentSignup = async (req, res) => {
  const { name, email, password, class: studentClass } = req.body;
  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const student = await Student.create({ name, email, password, class: studentClass });
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      class: student.class,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Login
export const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (student && (await student.matchPassword(password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        token: generateToken(student._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
