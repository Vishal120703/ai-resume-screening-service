import { v4 as uuidv4 } from "uuid";

export const uploadResume = async (req, res) => {
  try {
    const evaluation_id = uuidv4();

    const filePath = req.file.path;


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