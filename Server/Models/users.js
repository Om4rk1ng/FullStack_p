import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});


const User_model = mongoose.model("users", UserSchema, "users");

export default User_model;