import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../libraries/axios";
import { useNavigate } from "react-router-dom";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`/api/course/${id}`);
      setCourse(response.data.course);
    };
    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-400 mb-4 hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-black mb-2">{course?.title}</h1>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-pink-500"
            style={{
              width: `${Math.round((course?.lessons.filter((l) => l.completed).length / course?.lessons.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Lesson Path */}
      <div className="flex flex-col gap-2">
        {course?.lessons.map((lesson, index) => {
          const isUnlocked = index === 0 || course.lessons[index - 1].completed;
          const isCompleted = lesson.completed;
          const alignment = index % 2 === 0 ? "items-start" : "items-end";

          return (
            <div key={lesson._id} className={`flex flex-col ${alignment}`}>
              <button
                disabled={!isUnlocked}
                onClick={() => navigate(`/courses/${id}/lessons/${lesson._id}`)}
                className={`w-24 h-24 rounded-full font-black text-3xl shadow-lg transition-all hover:scale-110
                ${
                  isCompleted
                    ? "bg-green-500 shadow-green-500/50"
                    : isUnlocked
                      ? "bg-blue-500 shadow-blue-500/50"
                      : "bg-gray-700 opacity-60"
                }`}
              >
                {isCompleted ? "✅" : isUnlocked ? "⭐" : "🔒"}
              </button>
              <span className="text-sm font-bold mt-2 text-gray-300 max-w-24 text-center">
                {lesson.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetailPage;
