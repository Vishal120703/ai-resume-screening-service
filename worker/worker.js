import Queue from "bull";
import dotenv from "dotenv";
import { evaluateResume } from "./services/llmService.js";

dotenv.config();

const resumeQueue = new Queue("resume-processing", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Job processor
resumeQueue.process(async (job) => {
  const { evaluation_id, filePath } = job.data;

  try {
    console.log(`Processing job: ${evaluation_id}`);

    // dummy resume text
    const resumeText = "Node.js developer with Express experience";
    const jobDescription = "Looking for Node.js developer with MongoDB";

    const result = await evaluateResume(resumeText, jobDescription);

    console.log("LLM Raw Output:", result);

    const parsed = JSON.parse(result);

    console.log("Parsed Result:", parsed);

    console.log(` Completed job: ${evaluation_id}`);

    return parsed;

  } catch (error) {
    console.error(`Failed job: ${evaluation_id}`, error);
    throw error; 
  }
});
resumeQueue.on("completed", (job) => {
  console.log(` Job completed: ${job.id}`);
});

resumeQueue.on("failed", (job, err) => {
  console.error(` Job failed: ${job.id}`, err.message);
});