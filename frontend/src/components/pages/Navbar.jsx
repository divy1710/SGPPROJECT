/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../auth/Login";
import { Signup } from "../auth/Signup";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // ✅ Import DialogContent
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice"; // ✅ Import logout action
import axios from "axios";
import { setUser } from "@/redux/authSlice"; // ✅ Add this import


export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // ✅ Get user from Redux store
  const isAuthenticated = !!user; // ✅ Check if user exists

  // Logout Function
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      dispatch(setUser(null)); // Clear user from Redux
      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };



  return (
    <nav className="sticky top-0 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-100 shadow-xl z-50 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6 container mx-auto justify-between flex-wrap">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer transform hover:scale-105 transition-transform duration-200"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-xl font-bold">A</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
            Askera
          </span>
        </div>

        {/* Navigation Links - Shown Only If Logged In */}
        {isAuthenticated && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              onClick={() => navigate("/allquestions")}
              variant="ghost"
              className="text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-lg px-4 py-2 transition-all duration-200"
            >
              All Questions
            </Button>
            <Button
              onClick={() => navigate("/solvedquestions")}
              variant="ghost"
              className="text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-lg px-4 py-2 transition-all duration-200"
            >
              Solved Questions
            </Button>
            <Button
              onClick={() => navigate("/unsolvedquestions")}
              variant="ghost"
              className="text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-lg px-4 py-2 transition-all duration-200"
            >
              Unsolved Questions
            </Button>
          </div>
        )}

        {/* Authentication Controls */}
        <div className="flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-zinc-700 bg-zinc-800/50 text-zinc-100 hover:bg-zinc-700/50 rounded-lg px-5 transition-all duration-200 hover:border-zinc-600 font-medium text-sm"
                  >
                    Login
                  </Button>
                </DialogTrigger>
                <Login isDialog={true} setIsLoginOpen={setIsLoginOpen} />
              </Dialog>

              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 rounded-lg px-5 font-medium text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200"
                  >
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Signup setIsSignupOpen={setIsSignupOpen} />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-3 bg-zinc-800/50 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-zinc-700/50 transition-all duration-200 border border-zinc-700 hover:border-zinc-600">
                  <Avatar className="h-8 w-8 border-2 border-emerald-500/20 transition-all duration-200">
                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="User avatar" />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-zinc-300">{user?.name}</span>
                </div>
              </DialogTrigger>

              <DialogContent className="bg-zinc-900 border border-zinc-800">
                <div className="flex flex-col items-center p-6 space-y-4">
                  <Avatar className="h-16 w-16 border-2 border-emerald-500/20">
                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="User avatar" />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold text-zinc-100">{user?.name}</p>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg px-6 transition-all duration-200"
                  >
                    Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
}
