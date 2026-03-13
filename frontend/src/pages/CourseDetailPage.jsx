import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../libraries/axios";
import { ArrowLeft } from "lucide-react";

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

  const completed = course?.lessons.filter((l) => l.completed).length ?? 0;
  const total = course?.lessons.length ?? 1;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 truncate">{course?.title}</h1>
      </div>

      <div className="p-6 md:p-8 max-w-lg mx-auto">
        {/* Progress */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-bold text-emerald-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{completed} of {total} lessons completed</p>
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
                  className={`w-20 h-20 rounded-full font-black text-2xl shadow-md transition-all hover:scale-110 border-4 ${
                    isCompleted
                      ? "bg-emerald-400 border-emerald-300 shadow-emerald-100"
                      : isUnlocked
                        ? "bg-blue-400 border-blue-300 shadow-blue-100"
                        : "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {isCompleted ? "✅" : isUnlocked ? "⭐" : "🔒"}
                </button>
                <span className="text-xs font-semibold mt-2 text-gray-500 max-w-24 text-center leading-snug">
                  {lesson.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;