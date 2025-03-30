import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup({ setIsSignupOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth); // Get loading state


  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    department: "",
    semester: "",
    phoneNumber: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle Signup
  const handleSignup = async () => {
    dispatch(setLoading(true)); // Set loading to true
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", input,{
        headers: { 
            "Content-Type": "application/json",
            withCredentials:true
        }
      });
    //   console.log(response);
      
      setIsSignupOpen(false);
      if(response.data.success){
          navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed", error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false)); // Set loading to false after request
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create an Account</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input id="fullname" name="fullname" placeholder="Enter your full name" value={input.fullname} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" value={input.email} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Create a password" value={input.password} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value) => setInput({ ...input, department: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="semester">Semester</Label>
          <Input id="semester" name="semester" type="text" placeholder="Enter your semester" value={input.semester} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Enter your phone number" value={input.phoneNumber} onChange={handleChange} />
        </div>
        <Button onClick={handleSignup} className="w-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </div>
    </DialogContent>
  );
}
