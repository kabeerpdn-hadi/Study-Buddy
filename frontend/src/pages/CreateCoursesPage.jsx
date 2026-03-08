import axios from '../libraries/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCoursesPage = () => {
    const [title, setTitle] = useState("")
    const [level, setLevel] = useState("beginner")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreateCourse = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/course", {
                topic: title,
                level: level
            })
            console.log(response)
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const levels = [
        { value: "beginner", label: "Beginner", emoji: "🌱", desc: "Just starting out" },
        { value: "intermediate", label: "Intermediate", emoji: "🔥", desc: "Some experience" },
        { value: "advanced", label: "Advanced", emoji: "⚡", desc: "Ready for a challenge" },
    ]

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <h1 className="text-4xl font-black mb-2">Create a Course</h1>
                    <p className="text-gray-400 font-medium">Tell us what you want to learn — AI will build it for you!</p>
                </div>

                <form onSubmit={handleCreateCourse} className="flex flex-col gap-6">
                    {/* Topic Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">📚 Topic</label>
                        <input
                            type="text"
                            placeholder="e.g. Python, Machine Learning, Web Design..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg"
                        />
                    </div>

                    {/* Level Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">🎯 Level</label>
                        <div className="grid grid-cols-3 gap-3">
                            {levels.map((l) => (
                                <button
                                    type="button"
                                    key={l.value}
                                    onClick={() => setLevel(l.value)}
                                    className={`rounded-2xl p-4 flex flex-col items-center gap-1 font-bold transition-all border-2 ${
                                        level === l.value
                                            ? "border-blue-500 bg-blue-500/20 text-white"
                                            : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500"
                                    }`}
                                >
                                    <span className="text-2xl">{l.emoji}</span>
                                    <span className="text-sm">{l.label}</span>
                                    <span className="text-xs font-normal opacity-70">{l.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !title}
                        className="w-full p-4 rounded-2xl font-black text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105"
                    >
                        {loading ? "🤖 Generating your course..." : "✨ Generate Course"}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default CreateCoursesPage;