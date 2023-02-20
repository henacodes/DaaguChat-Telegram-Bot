import mongoose from "mongoose";

const { Schema } = mongoose;

const onlineUser = Schema({
  userId: {
    type: Number,
    required: true,
  },
  chatId: {
    type: Number,
    required: true,
  },
  inChat: {
    type: Boolean,
    default: false,
  },
  connectedTo: {
    type: Number,
  },
});

const OnlineUser = mongoose.model("OnlineUser", onlineUser);

export default OnlineUser;
