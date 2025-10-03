// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//   facultyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Faculty",
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   dueDate: {
//     type: Date,
//     required: true,
//   },
//   assignedTo: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//     },
//   ],
//   submissions: [
//     {
//       studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student",
//       },
//       isSubmitted: {
//         type: Boolean,
//         default: false,
//       },
//       submittedAt: {
//         type: Date,
//       },
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Assignment = mongoose.model("Assignment", assignmentSchema);
// export default Assignment;

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  submittedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
