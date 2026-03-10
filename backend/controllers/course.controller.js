import Course from "../models/course.model.js";
import {
  generateCourse,
  generateQuestions,
} from "../services/groq.services.js";
import User from "../models/user.models.js";

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
    const courses = await Course.find({ author: req.userId });
    res.json({ courses });
  } catch (err) {
    console.error("getMyCourses error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

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
      author: req.userId,
    });

    res.status(201).json({
      message: "AI Course generated successfully!",
      course,
    });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ message: "Failed to generate course" });
  }
};

export const getlessonWithQuestions = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = await course.lessons.find(
      (l) => l._id.toString() === lessonId,
    );
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const questions = await generateQuestions(lesson.content);
    res.json({ lesson, questions });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ message: "Failed to generate Questions" });
  }
};

export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    const lesson = course.lessons.find((l) => l._id.toString() === lessonId);

    if (lesson.completed === true) {
      return res.status(400).json({ message: "Lesson already completed" })
    }

    const updateUser = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { lessonsCompleted: 1, money: 10, level: 1 } },
      { new: true }
    );
    lesson.completed = true;

    const isCourseComplete = course.lessons.every((lesson) => lesson.completed);

    if (isCourseComplete) {
      await User.findByIdAndUpdate(req.userId, { $push: { badges: "Nooby Learner" } });
    }

    if (updateUser.lessonsCompleted == 1) {
      await User.findByIdAndUpdate(req.userId, { $push: { badges: "1st Step" } })
    }
    if (updateUser.lessonsCompleted == 10) {
      await User.findByIdAndUpdate(req.userId, { $push: { badges: "Working your way up" } })
    }
    if (updateUser.lessonsCompleted == 50) {
      await User.findByIdAndUpdate(req.userId, { $push: { badges: "Serious learner" } })
    }

    await course.save();

    res.json({ message: "Lesson completed!", user: updateUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
