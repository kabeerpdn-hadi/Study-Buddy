import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const setUser = useUserStore((state) => state.setUser)

    const handleLogout = async () => {
        await axios.post("/api/auth/logout")
        setUser(null)
        navigate("/login")
    }

    const linkClass = (path) =>
        `font-bold p-3 rounded-xl transition-colors ${
            location.pathname === path
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`

    return (
        <div className="sticky top-0 h-screen w-64 bg-gray-900 flex flex-col p-6 gap-2">
            <div className="text-lg font-black text-white mb-4 px-3">
                🚀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Study Buddy</span>
            </div>
            <Link className={linkClass("/dashboard")} to="/dashboard">📊 Dashboard</Link>
            <Link className={linkClass("/courses")} to="/courses">📚 Browse Courses</Link>
            <Link className={linkClass("/courses/new")} to="/courses/new">✨ Create Course</Link>
            <Link className={linkClass("/leaderboard")} to="/leaderboard">🏆 Leaderboard</Link>
            <Link className={linkClass("/messages")} to="/messages">💬 Messages</Link>
            <div className="mt-auto">
                <button
                    className="w-full text-left text-gray-400 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800 transition-colors"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar