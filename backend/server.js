import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import courseRoutes from "./routes/course.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}))
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/course", courseRoutes)

app.listen(PORT, () => {
    console.log("server is running on port 5000")
    connectDB();
})