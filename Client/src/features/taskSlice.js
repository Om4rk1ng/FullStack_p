// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:7500";

// Get all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const res = await axios.get(`${API}/tasks`);
    return res.data.tasks;
  }
);

// Add task
export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData) => {
    const res = await axios.post(`${API}/addtask`, taskData);
    return res.data.task;
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    return id;
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/tasks/${id}`, data);
    return res.data.task;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      });
  },
});

export default taskSlice.reducer;
