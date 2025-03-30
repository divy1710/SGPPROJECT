import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../auth/Login";
import { Signup } from "../auth/Signup";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useSelector } from "react-redux";

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isAuthenticated = !!user; // User is authenticated if `user` exists 

  // Navigation Handlers
  const handleSolvedQuestion = () => navigate('/solvedquestions');
  const handleUnSolvedQuestion = () => navigate('/unsolvedquestions');
  const handleAllQuestions = () => navigate('/allquestions'); // ✅ NEW FUNCTION

  return (
    <nav className="border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md z-50">
      <div className="flex h-16 items-center px-6 container mx-auto justify-between flex-wrap">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-2xl font-bold tracking-wide">
            Askera
          </span>
        </div>

        {/* Navigation Links - Shown Only If Logged In */}
        {isAuthenticated && (
          <div className="flex justify-center items-center space-x-6">
            <Button onClick={handleAllQuestions} variant="ghost" className="text-lg font-medium text-white hover:bg-white/10">
              All Questions
            </Button> {/* ✅ NEW BUTTON */}
            <Button onClick={handleSolvedQuestion} variant="ghost" className="text-lg font-medium text-white hover:bg-white/10">
              Solved Questions
            </Button>
            <Button onClick={handleUnSolvedQuestion} variant="ghost" className="text-lg font-medium text-white hover:bg-white/10">
              Unsolved Questions
            </Button>
            
          </div>
        )}

        {/* Authentication Controls */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Login
                  </Button>
                </DialogTrigger>
                <Login setIsLoginOpen={setIsLoginOpen} />
              </Dialog>

              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <Signup setIsSignupOpen={setIsSignupOpen} />
              </Dialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-white hover:ring-2 hover:ring-white transition-all">
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="User avatar" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DialogTrigger>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
}
