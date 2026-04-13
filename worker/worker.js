import Queue from "bull";
import dotenv from "dotenv";

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
    console.log(`File: ${filePath}`);

    // Simulate processing 
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Completed job: ${evaluation_id}`);

    return { success: true };
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