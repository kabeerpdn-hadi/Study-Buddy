import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, BookOpen, PlusCircle, Trophy, MessageSquareText, LogOut, User, X, ShieldAlert } from "lucide-react"
import { useState } from "react"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"

const BottomNav = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)
    const user = useUserStore((state) => state.user)
    const [showProfile, setShowProfile] = useState(false)

    const isActive = (path) => location.pathname === path

    const handleLogout = async () => {
        await axios.post("/api/auth/logout")
        setUser(null)
        setShowProfile(false)
        navigate("/login")
    }

    const navItem = (to, Icon, label) => (
        <Link
            to={to}
            className={`flex flex-col items-center gap-1 transition-colors ${
                isActive(to) ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
        >
            <Icon size={22} />
            <p className="text-xs font-semibold">{label}</p>
        </Link>
    )

    return (
        <>
            {/* Profile Sheet */}
            {showProfile && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowProfile(false)} />
                    <div className="fixed bottom-20 left-4 right-4 bg-gray-900 border border-gray-700 rounded-3xl p-5 z-50 shadow-2xl">
                        {/* User info */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-pink-500 flex items-center justify-center font-black text-lg">
                                    {user?.name?.[0]?.toUpperCase() ?? "?"}
                                </div>
                                <div>
                                    <p className="font-black text-white">{user?.name}</p>
                                    <p className="text-gray-400 text-xs">{user?.email}</p>
                                    <p className="text-gray-500 text-xs capitalize mt-0.5">{user?.role} · {user?.plan} plan</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowProfile(false)}
                                className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-gray-800 pt-4">
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    onClick={() => setShowProfile(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 font-bold border border-violet-500/20 transition-all"
                                >
                                    <ShieldAlert size={18} />
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/20 transition-all"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 justify-around items-center z-50">
                {navItem("/dashboard", LayoutDashboard, "Dashboard")}
                {navItem("/courses", BookOpen, "Courses")}
                {navItem("/courses/new", PlusCircle, "Create")}
                {navItem("/leaderboard", Trophy, "Leaderboard")}
                {navItem("/messages", MessageSquareText, "Messages")}
                <button
                    onClick={() => setShowProfile(!showProfile)}
                    className={`flex flex-col items-center gap-1 transition-colors ${showProfile ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    <User size={22} />
                    <p className="text-xs font-semibold">Profile</p>
                </button>
            </div>
        </>
    )
}

export default BottomNav