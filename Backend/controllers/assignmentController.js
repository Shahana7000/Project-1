import Assignment from "../models/Assignment.js";

// ✅ Faculty: Add a new assignment
export const addAssignment = async (req, res) => {
  try {
    const { subject, className, description, deadline } = req.body;

    const assignment = await Assignment.create({
      facultyId: req.user.id,
      subject,
      className,
      description,
      deadline,
    });

    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error: error.message });
  }
};

// ✅ Faculty: Get all their own assignments
export const getFacultyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ facultyId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};

// ✅ Student: View all assignments for their class
export const getAssignmentsByClass = async (req, res) => {
  try {
    const { className } = req.query;
    const assignments = await Assignment.find({ className }).populate("facultyId", "name email");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};

// ✅ Faculty: Mark student's assignment as completed
export const markAsSubmitted = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    if (!assignment.submittedStudents.includes(studentId)) {
      assignment.submittedStudents.push(studentId);
      await assignment.save();
    }

    res.status(200).json({ message: "Student marked as submitted" });
  } catch (error) {
    res.status(500).json({ message: "Error marking assignment", error: error.message });
  }
};
