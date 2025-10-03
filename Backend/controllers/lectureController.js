import Lecture from "../models/Lecture.js";

// ✅ Add a new lecture (faculty only)
export const addLecture = async (req, res) => {
  try {
    const { subject, topic, date, time, duration } = req.body;

    const lecture = await Lecture.create({
      facultyId: req.user.id,
      subject,
      topic,
      date,
      time,
      duration,
    });

    res.status(201).json({ message: "Lecture added successfully", lecture });
  } catch (error) {
    res.status(500).json({ message: "Error adding lecture", error: error.message });
  }
};

// ✅ Get all lectures (faculty — only their own lectures)
export const getFacultyLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ facultyId: req.user.id }).sort({ date: 1 });
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lectures", error: error.message });
  }
};

// ✅ Get all lectures (student — view all)
export const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate("facultyId", "name email");
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lectures", error: error.message });
  }
};

// ✅ Delete a lecture (faculty only)
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (lecture.facultyId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this lecture" });
    }

    await lecture.deleteOne();
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lecture", error: error.message });
  }
};
