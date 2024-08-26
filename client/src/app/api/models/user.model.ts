import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  token:{
    type: String,
  },
  quizzesCreated: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  quizzesAttempted: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
});

const User = mongoose.models.User || model("User", userSchema)

export default User;
