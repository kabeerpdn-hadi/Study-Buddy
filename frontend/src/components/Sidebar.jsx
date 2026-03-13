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
        <div className="sticky top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4">
            <div className="text-xl font-black text-gray-900 mb-8 px-3">
                🚀 <span className="text-emerald-500">Study</span><span className="text-gray-900">Buddy</span>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ path, label, icon: Icon }) => {
                    const active = location.pathname === path
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                active
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                            {label}
                        </Link>
                    )
                })}

                {user?.role === "admin" && (
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            location.pathname === "/admin"
                                ? "bg-violet-50 text-violet-600"
                                : "text-violet-400 hover:text-violet-600 hover:bg-violet-50"
                        }`}
                    >
                        <ShieldAlert size={18} strokeWidth={2} />
                        Admin Panel
                    </Link>
                )}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    )
}

export default Sidebar