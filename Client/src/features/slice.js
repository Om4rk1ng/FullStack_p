// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const RegisterDataThunk = createAsyncThunk(
  "user/register",
  async (userData) => {
    const requestToPost = await Axios.post(
      "http://localhost:7500/register",
      userData
    );
    return requestToPost.data;
  }
);

export const LoginThunk = createAsyncThunk(
  "user/login",
  async (userLoginData) => {
    const requestToPost = await Axios.post(
      "http://localhost:7500/login",
      userLoginData
    );
    return requestToPost.data;
  }
);

export const showDataThunk = createAsyncThunk(
  "user/displayData",
  async () => {
    const requestToGetData = await Axios.get(
      "http://localhost:7500/displayData"
    );
    return requestToGetData.data;
  }
);

const initialState = {
  msg: null,
  userData: [],
  usersActive: null,
  loading: false,
};

const TaskTrackSlice = createSlice({
  name: "Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder.addCase(RegisterDataThunk.pending, (state) => {
      state.loading = true;
      state.msg = "Please wait, data is being inserted!!";
    });

    builder.addCase(RegisterDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg ="LOGGED IN";
      state.usersActive=action.payload.status
    });

    builder.addCase(RegisterDataThunk.rejected, (state) => {
      state.loading = false;
      state.msg = "Something went wrong while inserting!!";
    });

    // Login
    builder.addCase(LoginThunk.pending, (state) => {
      state.loading = true;
      state.msg = "";
    });

    builder.addCase(LoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.usersActive = action.payload.status;
      state.msg =action.payload.message;
    });

    builder.addCase(LoginThunk.rejected, (state,action) => {
      state.loading = false;
      state.msg = ""
    });

    // Show data
    builder.addCase(showDataThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(showDataThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });

    builder.addCase(showDataThunk.rejected, (state) => {
      state.loading = false;
      state.msg = "Error occured!!!!";
    });
  },
});

// 👇 default export = reducer
export default TaskTrackSlice.reducer;