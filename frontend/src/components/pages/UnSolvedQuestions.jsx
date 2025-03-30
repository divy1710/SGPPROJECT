import React from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useGetAllQuestions } from "@/hooks/useGetAllQuestions";
import { motion } from "framer-motion";

export function UnSolvedQuestions() {
    useGetAllQuestions();
    const questions = useSelector((state) => state.auth.questions) || [];
    const unsolvedQuestions = questions.filter((question) => question?.status === "Pending");

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900">
            <Navbar />

            {/* Decorative Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-zinc-900 to-orange-500/5" />
                <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 opacity-20 blur-3xl">
                    <div className="absolute h-full w-full bg-gradient-to-br from-rose-500/30 to-orange-500/30" />
                </div>
            </div>

            <div className="container mx-auto py-8 px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-2">
                        Unsolved Questions
                    </h1>
                    <p className="text-zinc-400 mb-8">Questions waiting for faculty responses</p>
                </motion.div>

                {unsolvedQuestions.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-center p-8 bg-zinc-800/30 rounded-lg border border-zinc-700/50 backdrop-blur-sm"
                    >
                        <div className="text-6xl mb-4">✨</div>
                        <p className="text-zinc-300 text-lg mb-2">All caught up!</p>
                        <p className="text-zinc-400">No pending questions at the moment</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8 grid gap-6"
                    >
                        {unsolvedQuestions.map((question) => (
                            <motion.div
                                key={question?._id}
                                variants={cardVariants}
                                whileHover={{ scale: 1.01 }}
                                className="transform transition-all duration-300"
                            >
                                <Card className="bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm shadow-xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-rose-500/10 to-orange-500/10 border-b border-zinc-700/50">
                                        <div className="flex justify-between items-center gap-4">
                                            <CardTitle className="text-xl text-zinc-100">
                                                {question?.questionTitle || "Untitled Question"}
                                            </CardTitle>
                                            <Badge className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">
                                                {question?.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-6 space-y-4">
                                        {/* Subject */}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-zinc-400">Subject:</span>
                                            <span className="text-zinc-200">{question?.subject || "N/A"}</span>
                                        </div>

                                        {/* Question Text */}
                                        <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
                                            <p className="text-zinc-300 leading-relaxed">
                                                {question?.questionText || "No question text provided."}
                                            </p>
                                        </div>

                                        {/* Asked to */}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-zinc-400">Asked to:</span>
                                            <span className="text-rose-400 font-medium">
                                                {question?.facultyId?.fullname || "Unknown"}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex gap-2 flex-wrap">
                                            {question?.tags?.map((tag, idx) => (
                                                <Badge
                                                    key={idx}
                                                    className="bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700 transition-colors"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="text-sm text-zinc-500">
                                                Posted {new Date(question?.createdAt).toLocaleDateString()}
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300"
                                            >
                                                View Details
                                            </Button>
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