import express from "express";
import Evaluation from "../models/Evaluation.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await Evaluation.findOne({
      evaluation_id: req.params.id,
    });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;