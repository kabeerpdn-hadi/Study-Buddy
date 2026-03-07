import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import courseRoutes from "./routes/course.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/course", courseRoutes)

app.listen(PORT, () => {
    console.log("server is running on port 5000")
    connectDB();
})

// heqRawnkgcgwL4R0