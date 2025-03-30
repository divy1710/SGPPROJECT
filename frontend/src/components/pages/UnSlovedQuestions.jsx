import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useGetAllQuestions } from "@/hooks/useGetAllQuestions";

export function UnSolvedQuestions() {
  useGetAllQuestions(); // Fetch questions from API
  const questions = useSelector((state) => state.auth.questions) || []; // Get questions from Redux

  // Filter only unsolved questions
//   console.log(questions?.status);
  const unsolvedQuestions = questions.filter((question) => question?.status === "Pending");
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-lg shadow-md">
          Unsolved Questions
        </h1>

        {unsolvedQuestions.length === 0 ? (
          <p className="mt-6 text-center text-gray-500 text-lg">No unsolved questions found.</p>
        ) : (
          <div className="mt-6 grid gap-6">
            {unsolvedQuestions.map((question) => (
              <Card key={question?._id} className="shadow-md border border-gray-200 hover:shadow-lg transition-all">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 rounded-t-md flex justify-between items-center">
                  <CardTitle className="text-xl">{question?.title || "Untitled Question"}</CardTitle>
                  <Badge className="text-white bg-red-600">{question?.status}</Badge>
                </CardHeader>

                <CardContent className="p-4">
                  {/* Subject */}
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Subject:</span> {question?.subject || "N/A"}
                  </p>

                  {/* Question Text */}
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Question:</span> {question?.questionText || "No question text provided."}
                  </p>

                  {/* Asked by */}
                  {/* Asked by */}
<p className="text-sm text-gray-600 mt-2">
  Asked to : <span className="font-semibold">{question?.facultyId?.fullname || "Unknown"}</span>
</p>


                  {/* Tags */}
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {question?.tags?.map((tag, index) => (
                      <Badge key={index} className="bg-red-600 text-white">{tag}</Badge>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Button variant="outline" className="mt-4 text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
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