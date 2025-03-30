import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useGetAllQuestions } from "@/hooks/useGetAllQuestions";

// Define status colors
const statusColors = {
  Solved: "bg-green-600",
  Unsolved: "bg-red-600",
  Pending: "bg-yellow-500",
};

export function AllQuestions() {
  useGetAllQuestions(); // ✅ Fetch questions on mount
  const questions = useSelector((state) => state.auth.questions) || []; // ✅ Fallback to empty array if undefined

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-lg shadow-md">
          All Questions
        </h1>

        {questions.length === 0 ? (
          <p className="mt-6 text-center text-gray-500 text-lg">No questions found.</p>
        ) : (
          <div className="mt-6 grid gap-6">
            {questions.map((question) => (
              <Card
                key={question?._id} // ✅ Use `_id` instead of `id`
                className="shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-t-md flex justify-between items-center">
                  <CardTitle className="text-xl">{question?.questionTitle || "Untitled Question"}</CardTitle>
                  <Badge className={`text-white ${statusColors[question?.status] || "bg-gray-600"}`}>
                    {question?.status || "Unknown"}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{question?.subject || "No Subject"}</span>
                  </p>
                  <p className="text-gray-700 mt-2">{question?.questionText || "No description available."}</p>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {question?.tags?.map((tag, index) => (
                      <Badge key={index} className="bg-indigo-600 text-white">{tag}</Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white">
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
