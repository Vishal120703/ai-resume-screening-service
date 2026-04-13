import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT||5000;

app.use(express.json());
app.use("/upload", uploadRoutes);

app.listen(port,()=>{
    console.log(`The Server is Running on Port :${port}`);
})

