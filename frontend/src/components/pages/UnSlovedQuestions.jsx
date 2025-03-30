import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function UnSlovedQuestions() {
  // Dummy unsolved questions
  const questions = [
    {
      id: 1,
      title: "How does JavaScript handle asynchronous programming?",
      author: "Alice Johnson",
      date: "March 30, 2025",
      tags: ["JavaScript", "Async", "Promises"],
      status: "Unsolved",
    },
    {
      id: 2,
      title: "What are the key differences between useState and useReducer in React?",
      author: "Robert Williams",
      date: "March 29, 2025",
      tags: ["React", "State Management", "Hooks"],
      status: "Unsolved",
    },
    {
      id: 3,
      title: "How to prevent SQL Injection in web applications?",
      author: "Sophia Martinez",
      date: "March 28, 2025",
      tags: ["Security", "SQL Injection", "Web Development"],
      status: "Unsolved",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-lg shadow-md">
          Unsolved Questions
        </h1>

        <div className="mt-6 grid gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="shadow-md border border-gray-200 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 rounded-t-md flex justify-between items-center">
                <CardTitle className="text-xl">{question.title}</CardTitle>
                {/* Status Badge */}
                <Badge className="text-white bg-red-600">{question.status}</Badge>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  Asked by <span className="font-semibold">{question.author}</span> on {question.date}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} className="bg-red-600 text-white">{tag}</Badge>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
