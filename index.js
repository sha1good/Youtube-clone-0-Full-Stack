import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/Users.js";
import videoRoutes from "./routes/Videos.js";
import commentRoutes from "./routes/Comments.js";
import authRoutes from "./routes/Auths.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((error) => {
      throw error;
    });
};

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler middleware
app.use((error, request, response, next) =>{
    const status= error.status || 500;
    const message= error.message || "Something went wrong!";
    return response.status(status).json({
        success: false,
        status: status,
        message: message
    })
})

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});
