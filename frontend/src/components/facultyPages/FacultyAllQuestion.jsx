import { useGetFacultyQuestions } from "@/hooks/useGetFacultyQuestions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Navbar } from "../pages/Navbar";

export default function FacultyAllQuestion() {
  useGetFacultyQuestions(); // Fetch questions
  const questions = useSelector((state) => state.auth.questions);

  // State to hold faculty answers
  const [answers, setAnswers] = useState({});

  // Handle text area change
  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div >
      <Navbar/>
      <h2 className="text-xl font-bold mb-4">Faculty All Questions</h2>

      {questions.length === 0 ? (
        <p className="text-gray-500">No questions available.</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((question) => (
            <li
              key={question._id}
              className="p-4 bg-gray-100 rounded-lg shadow"
            >
              <p className="font-medium text-lg">{question.subject}</p>
              <p className="text-md text-gray-800 font-semibold">
                {question.questionTitle}
              </p>
              <p className="text-md text-gray-800 font-semibold">
                {question.studentId?.fullname}
              </p>
              <p className="text-md text-gray-800 font-semibold">
                {question.studentId?.email}
              </p>
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
