import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetFacultyQuestions } from "@/hooks/useGetFacultyQuestions";
import { Navbar } from "../pages/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FacultyUnsolvedQuestion() {
  useGetFacultyQuestions(); // Fetch questions
  const questions = useSelector((state) => state.auth.questions);
  const navigate = useNavigate();
  
  // State to manage answers
  const [answers, setAnswers] = useState({});

  // Filter only pending (unsolved) questions
  const unsolvedQuestions = questions.filter((q) => q.status === "Pending");

  // Handle input change
  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // Handle answer submission
  const handleAnswerSubmit = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/question/answer/${id}`, {
        answerText: answers[id],
      }, { withCredentials: true });
      
      navigate("/faculty/solved/questions");
    } catch (error) {
      console.error("Error submitting answer:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-xl font-bold mb-4">Unsolved Questions</h2>
      {unsolvedQuestions.length === 0 ? (
        <p className="text-gray-500">No unsolved questions available.</p>
      ) : (
        <ul className="space-y-3">
          {unsolvedQuestions.map((question) => (
            <li key={question._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-medium text-lg">{question.subject}</p>
              <p className="text-md text-gray-800 font-semibold">{question.questionTitle}</p>
              
              {/* Answer Textarea */}
              <textarea
                className="w-full mt-2 p-2 border rounded"
                placeholder="Enter your answer here..."
                value={answers[question._id] || ""}
                onChange={(e) => handleInputChange(question._id, e.target.value)}
              ></textarea>

              {/* Submit Answer Button */}
              <Button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleAnswerSubmit(question._id)}
              >
                Answer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
