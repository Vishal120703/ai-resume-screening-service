import { v4 as uuidv4 } from "uuid";
import resumeQueue from "../queues/resumeQueue.js";
import Evaluation from "../models/Evaluation.js";

export const uploadResume = async (req, res) => {
  try {
    const evaluation_id = uuidv4();

    const filePath = req.file.path;

    await Evaluation.create({
      evaluation_id,
      status: "pending",
    });

    await resumeQueue.add(
  {
    evaluation_id,
    filePath,
  },
  {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  }
);
    return res.status(202).json({
      evaluation_id,
      status: "queued",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};