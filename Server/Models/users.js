import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});


const User_model = mongoose.model("userstable", UserSchema, "userstable");


/**
 
Model Name: The name Mongoose uses internally in its registry (e.g., when you use populate).
2nd Argument	UserSchema	Schema: The structure (rules, types) for the documents in the collection.
3rd Argument	"userstable"	Collection Name (Explicit): The exact name of the collection in your MongoDB database where Mongoose will store the documents.


 */

export default User_model;