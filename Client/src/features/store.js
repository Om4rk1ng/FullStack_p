import { configureStore } from "@reduxjs/toolkit";
import TaskTrackSlice from "./slice"

const TaskTrackStore=configureStore({

reducer:{
    TaskStore:TaskTrackSlice
}

})


export default TaskTrackStore