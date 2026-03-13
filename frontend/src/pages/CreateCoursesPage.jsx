import axios from '../libraries/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const CreateCoursesPage = () => {
    const [title, setTitle] = useState("")
    const [level, setLevel] = useState("beginner")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreateCourse = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post("/api/course", { topic: title, level })
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
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-white border-b border-gray-100 px-8 py-4">
                <h1 className="text-lg font-bold text-gray-900">Create Course</h1>
            </div>

            <div className="p-6 md:p-8 max-w-xl mx-auto">
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles size={24} className="text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900">AI Course Generator</h2>
                        <p className="text-gray-400 text-sm mt-1">Tell us what you want to learn</p>
                    </div>

                    <form onSubmit={handleCreateCourse} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Topic</label>
                            <input
                                type="text"
                                placeholder="e.g. Python, Machine Learning, Web Design..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {levels.map((l) => (
                                    <button
                                        type="button"
                                        key={l.value}
                                        onClick={() => setLevel(l.value)}
                                        className={`rounded-xl p-4 flex flex-col items-center gap-1 font-semibold transition-all border-2 text-sm ${
                                            level === l.value
                                                ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                                : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                                        }`}
                                    >
                                        <span className="text-2xl">{l.emoji}</span>
                                        <span>{l.label}</span>
                                        <span className="text-xs font-normal text-gray-400">{l.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !title}
                            className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? "🤖 Generating your course..." : "✨ Generate Course"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateCoursesPage;