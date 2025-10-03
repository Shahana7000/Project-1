// import cron from "node-cron";
// import Lecture from "../models/Lecture.js";
// import Faculty from "../models/Faculty.js";
// import Student from "../models/Student.js";

// // ✅ Helper function to send notifications
// const sendNotification = async (lecture) => {
//   const faculty = await Faculty.findById(lecture.facultyId);
//   const students = await Student.find({ class: lecture.className });

//   console.log(`🔔 Reminder for Faculty: ${faculty.name}`);
//   console.log(`Subject: ${lecture.subject} (${lecture.topic})`);
//   console.log(`Class: ${lecture.className}, Room: ${lecture.roomNumber}`);
//   console.log(`Time: ${lecture.time}`);
//   console.log("--------------------------------------------------");

//   students.forEach((s) => {
//     console.log(`📚 Reminder for Student: ${s.name} — Your ${lecture.subject} class will start in 10 minutes.`);
//   });
// };

// // ✅ Schedule a job that runs every minute
// export const startLectureReminderJob = () => {
//   cron.schedule("* * * * *", async () => {
//     const now = new Date();
//     const tenMinutesLater = new Date(now.getTime() + 10 * 60000); // +10 minutes

//     const lectures = await Lecture.find({
//       date: now.toISOString().split("T")[0], // today's lectures
//     });

//     lectures.forEach(async (lecture) => {
//       // Compare time difference (in minutes)
//       const lectureTime = new Date(`${lecture.date}T${lecture.time}:00`);
//       const diff = (lectureTime - now) / 60000;

//       if (diff > 0 && diff <= 10) {
//         await sendNotification(lecture);
//       }
//     });
//   });

//   console.log("🕒 Lecture Reminder Job Started...");
// };
import cron from "node-cron";
import Lecture from "../models/Lecture.js";
import Faculty from "../models/Faculty.js";
import Student from "../models/Student.js";

// Helper to send notifications
const sendNotification = async (lecture) => {
  const faculty = await Faculty.findById(lecture.facultyId);
  const students = await Student.find({ class: lecture.className });

  console.log(`🔔 Reminder for Faculty: ${faculty.name}`);
  console.log(`Subject: ${lecture.subject} (${lecture.topic})`);
  console.log(`Class: ${lecture.className}`);
  console.log(`Time: ${lecture.time}`);
  console.log("--------------------------------------------------");

  students.forEach((s) => {
    console.log(`📚 Reminder for Student: ${s.name} — Your ${lecture.subject} class will start in 10 minutes.`);
  });
};

// Scheduler function
export const startLectureReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

    const lectures = await Lecture.find({ date: now.toISOString().split("T")[0] });

    lectures.forEach(async (lecture) => {
      // Combine date + time into a single Date object
      const [hours, minutes] = lecture.time.split(":").map(Number);
      const lectureDateTime = new Date(lecture.date);
      lectureDateTime.setHours(hours);
      lectureDateTime.setMinutes(minutes);
      lectureDateTime.setSeconds(0);

      const diff = (lectureDateTime - now) / 60000; // difference in minutes

      if (diff > 0 && diff <= 10) {
        await sendNotification(lecture);
      }
    });
  });

  console.log("🕒 Lecture Reminder Job Started...");
};
