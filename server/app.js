import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import { connectDB } from "./config/db.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
connectDB();

const app = express();
const port = process.env.PORT||5000;

app.use(express.json());
app.use("/upload", uploadRoutes);
app.use("/result", resultRoutes);

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

