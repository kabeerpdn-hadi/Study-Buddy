import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"
import { LayoutDashboard, BookOpen, PlusCircle, Trophy, MessageSquareText, LogOut, ShieldAlert } from "lucide-react"

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const setUser = useUserStore((state) => state.setUser)
    const user = useUserStore((state) => state.user)

    const handleLogout = async () => {
        await axios.post("/api/auth/logout")
        setUser(null)
        navigate("/login")
    }

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/courses", label: "Browse Courses", icon: BookOpen },
        { path: "/courses/new", label: "Create Course", icon: PlusCircle },
        { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
        { path: "/messages", label: "Messages", icon: MessageSquareText },
    ]

    return (
        <div className="sticky top-0 h-screen w-64 bg-gray-900 flex flex-col p-6 gap-1">
            <div className="text-lg font-black text-white mb-6 px-3">
                🚀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Study Buddy</span>
            </div>

            {navItems.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path
                return (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-3 font-bold p-3 rounded-xl transition-colors ${
                            active
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                    >
                        <Icon size={20} />
                        {label}
                    </Link>
                )
            })}

            {/* Admin only */}
            {user?.role === "admin" && (
                <Link
                    to="/admin"
                    className={`flex items-center gap-3 font-bold p-3 rounded-xl transition-colors ${
                        location.pathname === "/admin"
                            ? "bg-violet-500/20 text-violet-300"
                            : "text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
                    }`}
                >
                    <ShieldAlert size={20} />
                    Admin Panel
                </Link>
            )}

            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-gray-400 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar