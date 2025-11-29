import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  tasktitle: { type: String, required: true },
  description: { type: String, required: true },
  duedate: { type: String, required: true },
  lon: {type:String, required:false},
  lat: {type:String, required:false}
});


const Task_model = mongoose.model("taskstable", TaskSchema, "taskstable");


/**
 
Model Name: The name Mongoose uses internally in its registry
2nd Argument	UserSchema	Schema: The structure (rules, types) for the documents in the collection.
3rd Argument	"userstable"	Collection Name (Explicit): The exact name of the collection in your MongoDB database where Mongoose will store the documents.


 */

export default Task_model;