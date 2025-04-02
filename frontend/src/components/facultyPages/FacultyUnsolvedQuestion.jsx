import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetFacultyQuestions } from "@/hooks/useGetFacultyQuestions";
import { Navbar } from "../pages/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-zinc-900 to-rose-500/5" />
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 opacity-20 blur-3xl">
          <div className="absolute h-full w-full bg-gradient-to-br from-emerald-500/30 to-rose-500/30" />
        </div>
      </div>

      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-rose-400 mb-3">
            Unsolved Questions
          </h1>
          <p className="text-zinc-400 text-lg">Answer pending questions</p>
        </motion.div>

        {unsolvedQuestions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <p className="text-zinc-400 text-lg">No unsolved questions available.</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            {unsolvedQuestions.map((question) => (
              <motion.div key={question._id} variants={itemVariants}>
                <Card className="bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800/40 transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Subject and Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                            <MessageCircle className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-semibold text-zinc-100">{question.subject}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-rose-500/10 text-rose-400">
                            <Clock className="h-5 w-5" />
                          </div>
                          <span className="text-rose-400 font-medium">Pending</span>
                        </div>
                      </div>

                      {/* Question Title */}
                      <div className="pl-10">
                        <p className="text-lg text-zinc-300">{question.questionTitle}</p>
                      </div>

                      {/* Answer Textarea */}
                      <div className="pl-10">
                        <textarea
                          className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md text-zinc-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your answer here..."
                          value={answers[question._id] || ""}
                          onChange={(e) => handleInputChange(question._id, e.target.value)}
                          rows="4"
                        ></textarea>
                      </div>

                      {/* Submit Answer Button */}
                      <div className="pl-10">
                        <Button
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
                          onClick={() => handleAnswerSubmit(question._id)}
                        >
                          Submit Answer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
