import { configureStore } from "@reduxjs/toolkit";
import TaskTrackSlice from "./slice";
import taskSlice from "./taskSlice"; 

const TaskTrackStore = configureStore({
  reducer: {
    TaskStore: TaskTrackSlice, 
    tasks: taskSlice,
  },
});


export default TaskTrackStore;
