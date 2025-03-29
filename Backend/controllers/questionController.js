// import Question from "../models/question.js"
import { Question } from "../models/question.js"; 
import {User} from "../models/User.js";


export const askQuestion = async (req, res) => {
    try {
        const { studentId, facultyId, subject, questionTitle, questionText } = req.body;

        // Check if student exists
        const student = await User.findById(studentId);
        if (!student || student.role !== "Student") {
            return res.status(400).json({ message: "❌ Invalid student ID" });
        }

        // Check if faculty exists
        const faculty = await User.findById(facultyId);
        if (!faculty || faculty.role !== "Faculty") {
            return res.status(400).json({ message: "❌ Invalid faculty ID" });
        }

        
        
        // Check if file was uploaded
        let questionFile = null;
        if (req.file) {
            questionFile = {
                public_id: req.file.filename, // Unique filename
                url: `/uploads/${req.file.filename}` // Relative path to access
            };
        }
        
        // Create a new question
        const newQuestion = new Question({
            studentId,
            facultyId,
            subject,
            questionTitle,
            questionText,
            questionFile // ✅ Store the correct file object
        });
        
        await newQuestion.save();
        
        // Add question to student and faculty
        student.questionsAsked.push(newQuestion._id);
        await student.save();
        
        faculty.questionsAsked.push(newQuestion._id);
        await faculty.save();


        res.status(201).json({
            message: "✅ Question submitted successfully",
            question: newQuestion
        });

    } catch (error) {
        res.status(500).json({
            message: "❌ Server Error",
            error: error.message
        });
    }
};






export const answerQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { answerText } = req.body;
        const facultyId = req.user._id; // Authenticated Faculty ID from middleware

        // Check if question exists
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "❌ Question not found" });
        }

        // Check if the faculty is assigned to this question
        if (question.facultyId.toString() !== facultyId.toString()) {
            return res.status(403).json({ message: "❌ Unauthorized: This question is not assigned to you" });
        }

        // Update question with answer and mark it as "Answered"
        question.answerText = answerText;
        question.status = "Answered"; // ✅ Update status from "Pending" to "Answered"
        await question.save();

        // Fetch faculty and student details
        const faculty = await User.findById(facultyId);
        const student = await User.findById(question.studentId);

        // ✅ Only update arrays if user exists
        if (faculty) {
            if (!faculty.questionsAnswered) faculty.questionsAnswered = []; // Prevent undefined array
            if (!faculty.questionsAnswered.includes(question._id)) {
                faculty.questionsAnswered.push(question._id);
                await faculty.save();
            }
        }

        if (student) {
            if (!student.questionsAnswered) student.questionsAnswered = []; // Prevent undefined array
            if (!student.questionsAnswered.includes(question._id)) {
                student.questionsAnswered.push(question._id);
                await student.save();
            }
        }

        res.status(200).json({
            message: "✅ Answer submitted successfully",
            question
        });

    } catch (error) {
        res.status(500).json({
            message: "❌ Server Error",
            error: error.message
        });
    }
};


export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("studentId", "fullname email").populate("facultyId", "fullname email");
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate("studentId", "fullname email").populate("facultyId", "fullname email");

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getQuestionsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const questions = await Question.find({ studentId });

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this student" });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const getQuestionsByFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params;
        const questions = await Question.find({ facultyId });

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions assigned to this faculty" });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
