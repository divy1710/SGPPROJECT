import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const { user } = useSelector((state) => state.auth);
  const studentId = user?._id; // Get student ID from Redux state
  const navigate = useNavigate();

  const [facultyId, setFacultyId] = useState(""); // Store faculty ID
  const [facultyList, setFacultyList] = useState([]); // Store faculty list

  const [formData, setFormData] = useState({
    studentId: "",
    facultyId: "",
    subject: "",
    questionTitle: "",
    questionText: "",
    attachment: null,
  });

  const [subjects, setSubjects] = useState([]); // Store subjects list

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/subjects",
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data.allSub)) {
          setSubjects(response.data.allSub);
        } else {
          console.error("Subjects data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch faculty when subject is selected
  useEffect(() => {
    if (formData.subject) {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/user/faculty?subject=${formData.subject}`,
            { withCredentials: true }
          );
          if (Array.isArray(response.data)) {
            setFacultyList(response.data);
          } else {
            console.error("Faculty data is not an array", response.data);
          }
        } catch (error) {
          console.error("Error fetching faculty", error);
        }
      };
      fetchFaculty();
    } else {
      setFacultyList([]); // Clear faculty list when no subject is selected
    }
  }, [formData.subject]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        attachment: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle faculty selection
  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    setFacultyId(selectedFacultyId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !studentId ||
      !facultyId ||
      !formData.subject ||
      !formData.questionTitle ||
      !formData.questionText
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    submitData.append("studentId", studentId); // Ensure studentId is included
    submitData.append("facultyId", facultyId); // Ensure facultyId is included
    submitData.append("subject", formData.subject);
    submitData.append("questionTitle", formData.questionTitle);
    submitData.append("questionText", formData.questionText);

    if (formData.attachment) {
      submitData.append("questionFile", formData.attachment); // Make sure this matches backend key
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/question/ask",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setFormData({
        subject: "",
        questionTitle: "",
        questionText: "",
        attachment: null,
      });
      setFacultyId(""); // Reset faculty selection
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding question",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>

      {/* Subject Dropdown */}
      <label className="block mb-2">Select Subject:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      >
        <option value="">Select a subject</option>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))
        ) : (
          <option disabled>No subjects available</option>
        )}
      </select>

      {/* Faculty Dropdown */}
      <label className="block mb-2">Select Faculty:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        name="faculty"
        value={facultyId}
        onChange={handleFacultyChange}
      >
        <option value="">Select a faculty</option>
        {facultyList.length > 0 ? (
          facultyList.map((fac) => (
            <option key={fac._id} value={fac._id}>
              {fac.fullname}
            </option>
          ))
        ) : (
          <option disabled>No faculty available</option>
        )}
      </select>

      {/* Question Title Input */}
      <label className="block mb-2">Question Title:</label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        name="questionTitle"
        value={formData.questionTitle}
        onChange={handleChange}
      />

      {/* Question Text Input */}
      <label className="block mb-2">Question Text:</label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        name="questionText"
        rows="4"
        value={formData.questionText}
        onChange={handleChange}
      ></textarea>

      {/* File Attachment */}
      <label className="block mb-2">Attach File:</label>
      <input
        type="file"
        className="w-full p-2 border rounded mb-4"
        name="attachment"
        onChange={handleChange}
      />

      {/* Submit Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Question
      </button>
    </div>
  );
};

export default AskQuestion;
