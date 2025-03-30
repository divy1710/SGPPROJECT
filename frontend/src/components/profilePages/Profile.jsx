import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "../pages/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center text-red-500">User not found.</div>;
  }

  const handleEdit = () => {
    navigate("/edit/profile");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Cover Photo */}
        <div
          className="h-48 w-full bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${user.profile.coverPhoto?.url})` }}
        ></div>

        {/* Profile Section */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-emerald-500">
              <AvatarImage
                src={user?.profile?.profilePicture?.url}
                alt={user.fullname}
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.fullname}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm font-semibold text-emerald-500">
                {user.role}
              </p>
            </div>
            <Button className="cursor-pointer" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </Card>

        {/* User Details */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold">Details</h2>
          <p>
            <strong>Department:</strong> {user.department}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          {user.role === "Student" && (
            <p>
              <strong>Semester:</strong> {user.semester}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
