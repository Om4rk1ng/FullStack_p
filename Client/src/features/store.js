import { configureStore } from "@reduxjs/toolkit";
import TaskTrackSlice from "./slice";
import taskSlice from "./taskSlice"; // 👈 ADD THIS

const TaskTrackStore = configureStore({
  reducer: {
    TaskStore: TaskTrackSlice, // 👈 must be exactly "TaskStore"
    tasks: taskSlice,
  },
});


export default TaskTrackStore;
