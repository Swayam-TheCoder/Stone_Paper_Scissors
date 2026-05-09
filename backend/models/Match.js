import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  userChoice: {
    type: String,
    required: true,
  },
  computerChoice: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Match", matchSchema);