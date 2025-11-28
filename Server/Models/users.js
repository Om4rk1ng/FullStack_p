import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});


const User_model = mongoose.model("userstable", UserSchema, "userstable");

export default User_model;