import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useGetAllQuestions } from "@/hooks/useGetAllQuestions";

export function SolvedQuestion() {
  useGetAllQuestions(); // ✅ Fetch questions from API
  const questions = useSelector((state) => state.auth.questions) || []; // ✅ Get questions from Redux

  // ✅ Filter only solved questions
  const solvedQuestions = questions.filter((question) => question?.status === "Answered");

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-lg shadow-md">
          Solved Questions
        </h1>

        {solvedQuestions.length === 0 ? (
          <p className="mt-6 text-center text-gray-500 text-lg">No solved questions found.</p>
        ) : (
          <div className="mt-6 grid gap-6">
            {solvedQuestions.map((question) => (
              <Card key={question?._id} className="shadow-md border border-gray-200 hover:shadow-lg transition-all">
                {/* Question Header */}
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-t-md flex justify-between items-center">
                  <CardTitle className="text-xl">{question?.title || "Untitled Question"}</CardTitle>
                  <Badge className="text-white bg-green-600">{question?.status}</Badge>
                </CardHeader>

                {/* Question Content */}
                <CardContent className="p-4">
                  {/* Subject */}
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Subject:</span> {question?.subject || "N/A"}
                  </p>

                  {/* Question Text */}
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Question:</span> {question?.questionText || "No question text provided."}
                  </p>

                  {/* Answer */}
                  <p className="text-sm text-green-700 mt-2">
                    <span className="font-semibold">Answer:</span> {question?.answerText || "No answer available."}
                  </p>

                  {/* Faculty Name */}
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Answered by:</span> {question?.facultyId?.fullname || "Unknown Faculty"}
                  </p>

                 

                  {/* Tags */}
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {question?.tags?.map((tag, index) => (
                      <Badge key={index} className="bg-green-600 text-white">{tag}</Badge>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Button variant="outline" className="mt-4 text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
