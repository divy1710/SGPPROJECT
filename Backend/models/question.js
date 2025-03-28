import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Student
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Faculty
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  answerText: {
    type: String,
    default: null // Initially null, faculty will update it
  },
  status: {
    type: String,
    enum: ["Pending", "Answered"],
    default: "Pending"
  },
}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);
