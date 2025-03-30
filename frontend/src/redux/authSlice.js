import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    questions: [], // ✅ This will store fetched questions
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload; // ✅ Update state with fetched questions
    },
  },
});

export const { setLoading, setUser, setQuestions } = authSlice.actions;
export default authSlice.reducer;
