// src/features/slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const API_URL = "https://fullstack-server-4doi.onrender.com";

// REGISTER
export const RegisterDataThunk = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${API_URL}/register`, userData);

      // backend: { status: true/false, message: "..." }
      if (!res.data?.status) {
        return rejectWithValue(res.data);
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { status: false, message: "Network or server error" }
      );
    }
  }
);

// LOGIN
export const LoginThunk = createAsyncThunk(
  "user/login",
  async (userLoginData, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${API_URL}/login`, userLoginData);
      // backend: { status, message, user: {...} }
      if (!res.data?.status) {
        return rejectWithValue(res.data);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { status: false, message: "Network or server error" }
      );
    }
  }
);

// (Only works if you later add /displayData backend route)
export const showDataThunk = createAsyncThunk(
  "user/displayData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`${API_URL}/displayData`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { status: false, message: "Error fetching data" }
      );
    }
  }
);

const initialState = {
  msg: null,
  userData: [],
  usersActive: null,
  loading: false,
  currentUser: null,
};

const TaskTrackSlice = createSlice({
  name: "Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(RegisterDataThunk.pending, (state) => {
      state.loading = true;
      state.msg = "Please wait, data is being inserted!!";
    });

    builder.addCase(RegisterDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.usersActive = action.payload.status;
      state.msg = action.payload.message || "";
    });

    builder.addCase(RegisterDataThunk.rejected, (state, action) => {
      state.loading = false;
      state.usersActive = false;
      state.msg =
        action.payload?.message || "Something went wrong while inserting!!";
    });

    // LOGIN
    builder.addCase(LoginThunk.pending, (state) => {
      state.loading = true;
      state.msg = "";
    });

    builder.addCase(LoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.usersActive = true;
      state.msg = action.payload.message || "";

      const user = action.payload.user; // from backend
      if (user) {
        state.currentUser = {
          userId: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage || "",
          gender: user.gender || "",
          specialization: user.specialization || "",
        };
      }
    });

    builder.addCase(LoginThunk.rejected, (state, action) => {
      state.loading = false;
      state.usersActive = false;
      state.currentUser = null;
      state.msg = action.payload?.message || "Login failed";
    });

    // SHOW DATA
    builder.addCase(showDataThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(showDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });

    builder.addCase(showDataThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.message || "Error occured!!!!";
    });
  },
});

export default TaskTrackSlice.reducer;
