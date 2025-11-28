import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});


const User_model = mongoose.model("users", UserSchema, "users");

export default User_model;