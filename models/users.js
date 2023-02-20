import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = Schema({
  userId: {
    type: Number,
    required: true,
  },
  chatId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  stopped: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  country: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
