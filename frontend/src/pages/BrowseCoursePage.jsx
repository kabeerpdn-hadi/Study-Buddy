import { useEffect, useState } from "react"
import axios from "../libraries/axios"
import { useNavigate } from "react-router-dom"
import { BookOpen, ChevronRight } from "lucide-react"

const BrowseCoursesPage = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get("/api/course/my-courses")
            setCourses(response.data.courses)
        }
        fetchCourses()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-white border-b border-gray-100 px-8 py-4">
                <h1 className="text-lg font-bold text-gray-900">Browse Courses</h1>
            </div>

            <div className="p-6 md:p-8 max-w-5xl mx-auto">
                {courses.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl mb-4">📚</div>
                        <p className="text-gray-500 font-semibold">No courses yet</p>
                        <button onClick={() => navigate("/courses/new")} className="mt-3 text-emerald-500 font-semibold hover:underline text-sm">
                            Create your first course →
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course) => {
                            const completed = course.lessons.filter((l) => l.completed).length
                            const total = course.lessons.length
                            const progress = Math.round(completed / total * 100)
                            return (
                                <div
                                    key={course._id}
                                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                                    onClick={() => navigate(`/courses/${course._id}`)}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                                        <BookOpen size={18} className="text-emerald-500" />
                                    </div>
                                    <div className="flex items-start justify-between mb-1">
                                        <h2 className="font-bold text-gray-900 text-sm leading-snug flex-1 pr-2">{course.title}</h2>
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5" />
                                    </div>
                                    <p className="text-gray-400 text-xs mb-4 line-clamp-2">{course.description}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                            <div className="h-1.5 rounded-full bg-emerald-400" style={{ width: `${progress}%` }} />
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{progress}%</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowseCoursesPage