import express from "express";
import { registerStudent, addFaculty, loginUser, logoutUser, updateProfile } from "../controllers/usercontroller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Student Signup

router.route("/signup").post(registerStudent);
// console.log("vinit");

// Admin Adds Faculty (Requires Admin Auth)
router.route("/add-faculty").post(authMiddleware, adminMiddleware, addFaculty);

// User Login
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

// Get User Profile
router.route("/profile/:id").put(authMiddleware,singleUpload, updateProfile);

export default router;
