import { configureStore } from "@reduxjs/toolkit";
import TaskTrackSlice from "./slice.js"

export const TaskTrackStore=configureStore({

reducer:{
    TaskTrackStoreReducer:TaskTrackSlice
}

})