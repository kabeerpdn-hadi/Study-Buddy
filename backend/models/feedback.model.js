import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    type: { type: String, enum: ["feedback", "complaint"], required: true },
    reply: { type: String, default: null },
    repliedAt: { type: Date, default: null },
}, { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);