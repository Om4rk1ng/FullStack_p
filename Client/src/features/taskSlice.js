// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://fullstack-server-4doi.onrender.com";

// GET ONLY LOGGED-IN USER TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return rejectWithValue({ message: "User not logged in" });
    }

    try {
      const res = await axios.get(`${API}/tasks/${userId}`);
      return res.data.tasks || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error fetching tasks" }
      );
    }
  }
);

// ADD TASK
export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/addtask`, taskData);
      return res.data.task;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error adding task" }
      );
    }
  }
);

// DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error deleting task" }
      );
    }
  }
);

// UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/tasks/${id}`, data);
      return res.data.task;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error updating task" }
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks";
      })

      // ADD
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      });
  },
});

export default taskSlice.reducer;
