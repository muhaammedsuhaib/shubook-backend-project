import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./Route/todoRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

//process .env
const PORT = process.env.PORT;
const DB = process.env.DB;

// Connect mongoose
mongoose
  .connect(DB)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
