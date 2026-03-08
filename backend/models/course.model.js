import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    lessons: [lessonSchema],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// not author: [{ ... }]
  },
  { timestamps: true }
);

// 👇 Export a model, so you can do Course.find(), Course.create(), etc.
const Course = mongoose.model("course", courseSchema);
export default Course;
