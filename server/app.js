import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import { connectDB } from "./config/db.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT||5000;

app.use(express.json());
app.use("/upload", uploadRoutes);
app.use("/result", resultRoutes);

app.listen(port,()=>{
    console.log(`The Server is Running on Port :${port}`);
})

