import React from "react";
import { useSelector } from "react-redux";
import { useGetFacultyQuestions } from "@/hooks/useGetFacultyQuestions";
import { Navbar } from "../pages/Navbar";

export default function FacultySolvedQuestion() {
  useGetFacultyQuestions(); // Fetch questions
  const questions = useSelector((state) => state.auth.questions);

  // Filter only answered questions
  const solvedQuestions = questions.filter((q) => q.status === "Answered");

  return (
    <div>
      <Navbar />

      <h2 className="text-xl font-bold mb-4">Solved Questions</h2>
      {solvedQuestions.length === 0 ? (
        <p className="text-gray-500">No solved questions available.</p>
      ) : (
        <ul className="space-y-3">
          {solvedQuestions.map((question) => (
            <li
              key={question._id}
              className="p-4 bg-gray-100 rounded-lg shadow"
            >
              <p className="font-medium text-lg">{question.subject}</p>
              <p className="text-md text-gray-800 font-semibold">
                {question.questionTitle}
              </p>
              <p className="text-gray-700 mt-2">{question.answerText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
