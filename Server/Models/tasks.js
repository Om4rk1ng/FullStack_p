import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  tasktitle: { type: String, required: true },
  description: { type: String, required: true },
  userTaskEmail:{type:String, required:true},
  
  duedate: { type: String, required: true },
  lon: { type: String, required: false },
  lat: { type: String, required: false },
<<<<<<< HEAD
  status: { type: String, default: "pending" }  
=======
  status: { type: String, default: "pending" }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
>>>>>>> 7bb7ef6f9003de31e6306920d5a6a99bc47b5a6b
});



const Task_model = mongoose.model("taskstable", TaskSchema, "taskstable");

<<<<<<< HEAD

=======
>>>>>>> 7bb7ef6f9003de31e6306920d5a6a99bc47b5a6b
export default Task_model;