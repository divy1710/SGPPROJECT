import express from "express";
import { registerStudent, addFaculty, loginUser, getUserProfile } from "../controllers/usercontroller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Student Signup

router.route("/signup").post(registerStudent);
// console.log("vinit");

// Admin Adds Faculty (Requires Admin Auth)
router.route("/add-faculty").post(authMiddleware, adminMiddleware, addFaculty);

// User Login
router.route("/login").post(loginUser);

// Get User Profile
router.route("/profile/:id").get(authMiddleware, getUserProfile);

export default router;
