import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Faculty", "Student"],
    required: true,
    default: "Student"
  },
  department: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    validate: {
      validator: function (value) {
        return this.role !== "Student" || (this.role === "Student" && value !== undefined);
      },
      message: "Semester is required for students."
    }
  },
  profile: {
    profilePicture: { 
      type: String, 
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwcRgFA-KFW6u0wScyvZEBWMLME5WkdeCUg&s" 
    },
    coverPhoto: {
      public_id: { type: String },
      url: { 
        type: String, 
        default: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2070&q=80"
      }
    }
  },
  questionsAsked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // For students
  questionsAnswered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // For faculty
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
