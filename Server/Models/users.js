import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  profileImage: { type: String, required: false }, // 👈 NEW
  gender: { type: String, required: false },          // "male" / "female"
  specialization: { type: String, required: false },  // e.g. "Software Engineering"
});

const User_model = mongoose.model("userstable", UserSchema, "userstable");

export default User_model;
