import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "@/redux/authSlice";

export function useGetAllQuestions() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return; // ✅ Prevent API call if userId is missing

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/question/student/${userId}`, {
          withCredentials: true, // ✅ Moved outside headers
          headers: {
            "Content-Type": "application/json",
          },
        });

        dispatch(setQuestions(response.data)); // ✅ Dispatch to Redux store
      } catch (error) {
        console.error(error.response?.data?.message || "Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, [dispatch, userId]); // ✅ Added `userId` to dependencies
}
