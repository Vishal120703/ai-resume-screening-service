import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    evaluation_id: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    score: Number,
    verdict: String,
    missing_requirements: [String],
    justification: String,
  },
  { timestamps: true }
);

export default mongoose.model("Evaluation", evaluationSchema);