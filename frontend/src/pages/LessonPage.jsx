import { useState, useEffect } from "react";
import axios from "../libraries/axios";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { Heart } from "lucide-react";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchLesson = async () => {
      const response = await axios.get(`/api/course/${courseId}/lesson/${lessonId}`);
      setLesson(response.data.lesson);
      setQuestions(response.data.questions);
    };
    fetchLesson();
  }, []);

  useEffect(() => {
    if (hearts === 0) {
      alert("You ran out of hearts!");
      navigate(`/courses/${courseId}`);
    }
  }, [hearts]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion === questions.length) {
      const complete = async () => {
        const response = await axios.patch(`/api/course/${courseId}/lesson/${lessonId}/complete`);
        setUser(response.data.user);
        navigate(`/courses/${courseId}`);
      };
      complete();
    }
  }, [currentQuestion, questions]);

  const progress = questions.length > 0 ? Math.round((currentQuestion / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Progress bar */}
          <div className="flex-1 bg-gray-100 rounded-full h-2.5 mr-4">
            <div className="h-2.5 rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
          {/* Hearts */}
          <div className="flex items-center gap-1">
            {Array(5).fill(null).map((_, i) => (
              <Heart
                key={i}
                size={18}
                className={i < hearts ? "text-red-400 fill-red-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-xl mx-auto p-6 md:p-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Question {currentQuestion + 1} of {questions.length}</p>
          <h2 className="text-lg font-bold text-gray-900 leading-snug">{questions[currentQuestion]?.question}</h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-6">
          {questions[currentQuestion]?.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`w-full p-4 rounded-xl font-semibold text-left text-sm border-2 transition-all ${
                selected === option
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-gray-100 text-gray-700 hover:border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Check button */}
        <button
          disabled={!selected}
          className="w-full py-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all"
          onClick={() => {
            if (selected === questions[currentQuestion].answer) {
              setCurrentQuestion(currentQuestion + 1);
              setSelected(null);
            } else {
              setHearts(hearts - 1);
              setSelected(null);
            }
          }}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
};

export default LessonPage;