import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    phoneNumber: user?.phoneNumber || "",
    department: user?.department || "",
    semester: user?.semester || "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(user?.profile?.profilePicture || "");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file)); // Show preview before uploading
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("department", formData.department);
      if (user.role === "Student") {
        formDataToSend.append("semester", formData.semester);
      }
      if (profilePicture) {
        formDataToSend.append("profilePicture", profilePicture);
      }

      const { data } = await axios.put(
        `http://localhost:8000/api/v1/user/profile/${user?._id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(setUser(data.user)); // Update Redux state
      navigate("/profile");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Manage Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="profilePicture" className="cursor-pointer">
          <Avatar className="h-24 w-24 border-2 border-emerald-500">
            <AvatarImage src={preview} alt="Profile Picture" />
            <AvatarFallback className="bg-emerald-500/10 text-emerald-500">
              {user?.fullname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
        <span className="text-xs text-zinc-400 mt-2">
          Click to change profile picture
        </span>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <Label className="text-white">Full Name</Label>
          <Input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="bg-zinc-800 text-white"
          />
        </div>

        <div>
          <Label className="text-white">Phone Number</Label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="bg-zinc-800 text-white"
          />
        </div>

        <div>
          <Label className="text-white">Department</Label>
          <Input
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="bg-zinc-800 text-white"
          />
        </div>

        {user.role === "Student" && (
          <div>
            <Label className="text-white">Semester</Label>
            <Input
              name="semester"
              type="number"
              value={formData.semester}
              onChange={handleChange}
              required
              min={1}
              max={8}
              className="bg-zinc-800 text-white"
            />
          </div>
        )}

        {/* Update Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer bg-emerald-500 mt-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
