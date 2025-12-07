// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:7500";

// ✅ GET ONLY LOGGED-IN USER TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => {
    const userId = localStorage.getItem("userId"); // ✅ get current user
    const res = await axios.get(`${API}/tasks/${userId}`);
    return res.data.tasks;
  }
);

// ✅ ADD TASK (userId already attached in Home.js)
export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData) => {
    const res = await axios.post(`${API}/addtask`, taskData);
    return res.data.task;
  }
);

// ✅ DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    return id;
  }
);

// ✅ UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/tasks/${id}`, data);
    return res.data.task;
  }
);

// ✅ SLICE
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

      // ✅ FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      // ✅ ADD
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // ✅ DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })

      // ✅ UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      });
  },
});

export default taskSlice.reducer;
