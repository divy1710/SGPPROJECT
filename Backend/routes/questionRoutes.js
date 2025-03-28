import express from "express";
import { askQuestion, answerQuestion, getAllQuestions, getQuestionById, getQuestionsByStudent, getQuestionsByFaculty } from "../controllers/questionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { facultyMiddleware } from "../middlewares/facultyMiddleware.js";


const router = express.Router();

console.log("vinit");

router.route("/ask").post(authMiddleware, askQuestion);
router.route("/answer/:questionId").post(authMiddleware, facultyMiddleware, answerQuestion);
router.route("/all").get(getAllQuestions);
router.route("/:id").get(getQuestionById);
router.route("/student/:studentId").get(authMiddleware, getQuestionsByStudent);
router.route("/faculty/:facultyId").get(authMiddleware, facultyMiddleware, getQuestionsByFaculty);

export default router;
