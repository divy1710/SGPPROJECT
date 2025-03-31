import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

export function AskQuestion() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        questionTitle: "",
        questionText: "",
        facultyId: "",
    });
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    // Get faculty list from Redux store (assuming you have this data)
    const faculties = useSelector((state) => state.auth.faculties) || [];

    // List of subjects
    const subjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "English",
        "History",
        "Geography",
        "Economics",
        "Other"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Create preview URL for image files
            if (selectedFile.type.startsWith('image/')) {
                const previewUrl = URL.createObjectURL(selectedFile);
                setFilePreview(previewUrl);
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        if (filePreview) {
            URL.revokeObjectURL(filePreview);
            setFilePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.questionTitle || !formData.questionText || !formData.facultyId) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("subject", formData.subject);
            formDataToSend.append("questionTitle", formData.questionTitle);
            formDataToSend.append("questionText", formData.questionText);
            formDataToSend.append("facultyId", formData.facultyId);
            if (file) {
                formDataToSend.append("file", file);
            }

            const response = await axios.post("/api/questions", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Question posted successfully!");
                navigate("/user-home");
            }
        } catch (error) {
            console.error("Error posting question:", error);
            toast.error(error.response?.data?.message || "Error posting question");
        } finally {
            setLoading(false);
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
                        Ask a Question
                    </h1>
                    <p className="text-zinc-400 text-lg">Get help from our community of experts</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Card className="max-w-2xl mx-auto bg-zinc-800/30 border-zinc-700/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Subject Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-zinc-300">
                                        Subject
                                    </Label>
                                    <Select
                                        name="subject"
                                        value={formData.subject}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                                    >
                                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-300">
                                            <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    key={subject}
                                                    value={subject}
                                                    className="text-zinc-300 focus:bg-zinc-700 focus:text-zinc-100"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Add Faculty Selection after subject selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="faculty" className="text-zinc-300">
                                        Select Faculty
                                    </Label>
                                    <Select
                                        name="faculty"
                                        value={formData.facultyId}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, facultyId: value }))}
                                    >
                                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-300">
                                            <SelectValue placeholder="Select a faculty member" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            {faculties.map((faculty) => (
                                                <SelectItem
                                                    key={faculty._id}
                                                    value={faculty._id}
                                                    className="text-zinc-300 focus:bg-zinc-700 focus:text-zinc-100"
                                                >
                                                    {faculty.fullname} - {faculty.department}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Question Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="questionTitle" className="text-zinc-300">
                                        Question Title
                                    </Label>
                                    <Input
                                        id="questionTitle"
                                        name="questionTitle"
                                        value={formData.questionTitle}
                                        onChange={handleInputChange}
                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-300"
                                        placeholder="Enter a descriptive title"
                                    />
                                </div>

                                {/* Question Text */}
                                <div className="space-y-2">
                                    <Label htmlFor="questionText" className="text-zinc-300">
                                        Question Details
                                    </Label>
                                    <Textarea
                                        id="questionText"
                                        name="questionText"
                                        value={formData.questionText}
                                        onChange={handleInputChange}
                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-300 min-h-[200px]"
                                        placeholder="Describe your question in detail..."
                                    />
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">
                                        Attachments (Optional)
                                    </Label>
                                    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6">
                                        {!file ? (
                                            <div className="text-center">
                                                <Upload className="h-8 w-8 mx-auto text-zinc-500 mb-2" />
                                                <label className="cursor-pointer">
                                                    <span className="text-emerald-400 hover:text-emerald-300">
                                                        Click to upload
                                                    </span>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept="image/*,.pdf,.doc,.docx"
                                                    />
                                                </label>
                                                <p className="text-zinc-500 text-sm mt-1">
                                                    Supports images, PDFs, and documents
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between bg-zinc-800/50 rounded p-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-zinc-300">{file.name}</div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={removeFile}
                                                    className="text-zinc-400 hover:text-zinc-100"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                    disabled={loading}
                                >
                                    {loading ? "Posting..." : "Post Question"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
} 