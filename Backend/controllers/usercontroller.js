import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv"

dotenv.config({})
const JWT_SECRET = process.env.JWT_SECRET;



// Student Signup
export const registerStudent = async (req, res) => {
  try {
    
    // console.log("divy");
    const { fullname, email, password, department,semester, phoneNumber } = req.body;

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
    res.status(201).json({ message: "Student registered successfully!",success:true });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

// Admin Adding Faculty
export const addFaculty = async (req, res) => {
  try {
    const { fullname, email, password, department, phoneNumber } = req.body;

    // Check if requester is admin
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admins can add faculty!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new User({
      userId: Date.now().toString(),
      fullname,
      email,
      password: hashedPassword,
      role: "Faculty", // Faculty role assigned by Admin
      department,
      phoneNumber
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
    });

    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};


// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
