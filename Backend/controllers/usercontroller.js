import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

dotenv.config({})
const JWT_SECRET = process.env.JWT_SECRET;



// Student Signup
export const registerStudent = async (req, res) => {
  try {

    // console.log("divy");
    const { fullname, email, password, department, semester, phoneNumber } = req.body;

    // console.log(fullname, email, password, department, phoneNumber)

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      userId: Date.now().toString(),
      fullname,
      email,
      password: hashedPassword,
      semester,
      role: "Student", // Default role for signup
      department,
      phoneNumber
    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

// Admin Adding Faculty

export const addFaculty = async (req, res) => {
  try {
    const { fullname, email, password, department, phoneNumber, subject } = req.body; // ✅ Added subject

    // Check if requester is admin
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admins can add faculty!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if (!subject || !Array.isArray(subject) || subject.length === 0) {
      return res.status(400).json({ message: "Faculty must have at least one subject" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new User({
      userId: Date.now().toString(),
      fullname,
      email,
      password: hashedPassword,
      role: "Faculty", // Faculty role assigned by Admin
      department,
      phoneNumber,
      subject, // ✅ Added subject field
    });

    await newFaculty.save();
    res.status(201).json({ message: "Faculty added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding faculty", error });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    // Set token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful!", user });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Ensure secure in production
      path: "/", // Clears cookie for entire domain
    });

    res.status(200).json({ message: "Logout successful!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, semester, department } = req.body;
    const userId = req.params.id; // Get user ID from URL
    const file = req.file; // Fix: Use req.file (not req.files)

    // Find the user
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Handle Profile Picture Upload
    if (file) {
      // Convert file buffer to data URI
      const fileUri = getDataUri(file);

      // Upload new profile picture to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: "profile_pictures",
      });

      // Delete old profile picture from Cloudinary if it exists
      if (user.profile.profilePicture?.public_id) {
        await cloudinary.uploader.destroy(user.profile.profilePicture.public_id);
      }

      // Update user's profile picture
      user.profile.profilePicture = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // Update other profile details
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (department) user.department = department;
    if (semester !== undefined && user.role === "Student") {
      user.semester = semester;
    }

    // Save updated user details
    await user.save();

    // Format response (remove sensitive data)
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
      department: user.department,
      role: user.role,
    };

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller to get faculty by subject
export const getFacultyBySubject = async (req, res) => {
  try {
    const { subject } = req.query; // Use req.query instead of req.body for query parameters

    // Check if subject is provided
    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    // Fetch all faculty members who teach the selected subject
    const faculty = await User.find({ 
      role: "Faculty", 
      subject: { $in: [subject] } // Find faculty who teach the selected subject
    });

    if (faculty.length === 0) {
      return res.status(404).json({ message: "No faculty found for this subject" });
    }

    // Return the list of faculty members as an array
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
};


export const getAllSub = async (req,res) => {
  try {
    
    const allSub = [
      "Statistical and Numerical Techniques",
      "Computer Architecture & Microprocessor Interfacing",
      "Computer Networks",
      "Design and Analysis of Algorithms",
      "Full Stack Web Development",
      "Human Values and Professional Ethics",
      "Mobile Application Development",
      "Cryptography & Network Security",
      "Machine Learning",
      "Contributory Personality Development"
    ]
res.json({allSub, success:true});

  } catch (error) {
    console.log(error);
    
  }
}
