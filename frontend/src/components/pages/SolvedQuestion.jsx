import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SolvedQuestion() {
  // Dummy solved questions
  const questions = [
    {
      id: 1,
      title: "How does React's Virtual DOM improve performance?",
      author: "David Miller",
      date: "March 30, 2025",
      tags: ["React", "Virtual DOM", "Performance"],
      status: "Solved",
    },
    {
      id: 2,
      title: "What are the benefits of using TypeScript over JavaScript?",
      author: "Olivia Brown",
      date: "March 29, 2025",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      status: "Solved",
    },
    {
      id: 3,
      title: "How to implement JWT authentication in a Node.js backend?",
      author: "William Johnson",
      date: "March 28, 2025",
      tags: ["Authentication", "JWT", "Node.js"],
      status: "Solved",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-lg shadow-md">
          Solved Questions
        </h1>

        <div className="mt-6 grid gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="shadow-md border border-gray-200 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-t-md flex justify-between items-center">
                <CardTitle className="text-xl">{question.title}</CardTitle>
                {/* Status Badge */}
                <Badge className="text-white bg-green-600">{question.status}</Badge>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  Asked by <span className="font-semibold">{question.author}</span> on {question.date}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} className="bg-green-600 text-white">{tag}</Badge>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
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
