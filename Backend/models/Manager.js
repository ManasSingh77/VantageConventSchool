import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Manager = mongoose.model("Manager", ManagerSchema);
export default Manager;
