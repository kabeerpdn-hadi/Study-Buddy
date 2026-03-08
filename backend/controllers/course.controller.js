import Course from "../models/course.model.js";
import { generateCourse } from "../services/groq.services.js";

// GET /api/course
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/course/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ author: req.userId })
    res.json({ courses })
  } catch (err) {
    console.error("getMyCourses error:", err)
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

// POST /api/course
export const createCourse = async (req, res) => {
  try {
    const { topic, level = "beginner" } = req.body;
    
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const courseData = await generateCourse(topic, level);
    
    // Save to MongoDB
    const course = await Course.create({
      title: courseData.title,
      description: courseData.description,
      lessons: courseData.lessons,
      author: req.userId
    });

    res.status(201).json({ 
      message: "AI Course generated successfully!", 
      course 
    });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ message: "Failed to generate course" });
  }
};