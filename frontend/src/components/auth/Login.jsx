import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";

export function Login( ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth); // Get loading state from Redux

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async () => {
    dispatch(setLoading(true)); // Set loading state
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Allows cookies for authentication
        }
      );

      dispatch(setUser(response.data.user)); // Store user in Redux
      navigate("/allquestions"); // Redirect after login
    } catch (error) {
      console.error("Login failed", error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false)); // Stop loading
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login to Askera</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" value={input.email} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Enter your password" value={input.password} onChange={handleChange} />
        </div>
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </DialogContent>
  );
}
