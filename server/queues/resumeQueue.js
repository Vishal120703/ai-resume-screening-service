import Queue from "bull";
import redis from "../config/redis.js";

const resumeQueue = new Queue("resume-processing", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
resumeQueue.on("waiting", (jobId) => {
  console.log("Job added:", jobId);
});

export default resumeQueue;