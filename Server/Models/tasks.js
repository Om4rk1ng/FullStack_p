import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  tasktitle: { type: String, required: true },
  description: { type: String, required: true },
  userTaskEmail:{type:String, required:true},
  
  duedate: { type: String, required: true },
  lon: { type: String, required: false },
  lat: { type: String, required: false },
  status: { type: String, default: "pending" }  
});



const Task_model = mongoose.model("taskstable", TaskSchema, "taskstable");


export default Task_model;