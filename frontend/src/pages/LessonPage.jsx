import { useState, useEffect } from "react";
import axios from "../libraries/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      const response = await axios.get(
        `/api/course/${courseId}/lesson/${lessonId}`,
      );
      console.log(response.data.questions);
      setLesson(response.data.lesson);
      setQuestions(response.data.questions);
    };
    fetchLesson();
  }, []);

  useEffect(() => {
    if (hearts === 0) {
      alert("You Ran out of hearts!");
      navigate(`/courses/${courseId}`);
    }
  }, [hearts]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion === questions.length) {
      // call the API to mark complete
      axios.patch(`/api/course/${courseId}/lesson/${lessonId}/complete`);
      navigate(`/courses/${courseId}`);
    }
  }, [currentQuestion, questions]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Hearts */}
      <div className="flex gap-1 text-2xl">
        {Array(hearts)
          .fill("❤️")
          .map((heart, i) => (
            <span key={i}>{heart}</span>
          ))}
      </div>
      {/* Question */}
      <h2>{questions[currentQuestion]?.question}</h2>
      {/* Options */}
      {questions[currentQuestion]?.options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`w-full p-4 rounded-2xl font-bold text-left mb-3 border-2 transition-all
      ${
        selected === option
          ? "bg-blue-500 border-blue-400 text-white"
          : "bg-gray-800 border-gray-600 text-white hover:border-gray-400"
      }`}
        >
          {option}
        </button>
      ))}
      {/* Check button */}
      <button
        className="w-full p-4 rounded-2xl font-black text-lg bg-green-500 hover:bg-green-600 mt-4"
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
        Check ✓
      </button>
    </div>
  );
};

export default LessonPage;
