import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./Route/todoRoutes.js";
import authRoute from "./Route/authRoute.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  // origin:"https://shubook-front-end-project.vercel.app/",
  // credentials:true
}))

//process .env
const PORT = process.env.PORT;
const DB = process.env.DB;

// Connect mongoose
mongoose.connect(DB)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err));

app.use('/api/users',authRoute);
app.use("/api", todoRoutes);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
