import { useEffect, useState } from "react"
import axios from "../libraries/axios"
import { useNavigate } from "react-router-dom"

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
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-3xl font-black mb-6">📚 Browse Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => {
                    const completed = course.lessons.filter((lesson) => lesson.completed == true).length
                    const total = course.lessons.length
                    const progress = Math.round(completed / total * 100)

                    console.log(completed, total, progress)

                    return (
                        <div
                            key={course._id}
                            className="bg-gray-800 rounded-2xl p-5 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => navigate(`/courses/${course._id}`)}
                        >
                            {/* Title & Progress % */}
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-black text-lg">{course.title}</h2>
                                <span className="text-sm text-gray-400 font-semibold">{progress}%</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )
                }, [])}
            </div>
        </div>
    )
}

export default BrowseCoursesPage