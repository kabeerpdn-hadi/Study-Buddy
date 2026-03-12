import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, BookOpen, PlusCircle, Trophy, MoreHorizontal, MessageSquareText, Mail } from "lucide-react"
import { useState } from "react"

const BottomNav = () => {
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    const navItem = (to, Icon, label) => (
        <Link
            to={to}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive(to) ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
        >
            <Icon size={22} />
            <p className="text-xs font-semibold">{label}</p>
        </Link>
    )

    return (
        <>
            {/* Backdrop */}
            {isMoreOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMoreOpen(false)}
                />
            )}

            {/* More Menu Popup */}
            {isMoreOpen && (
                <div className="fixed bottom-24 right-4 bg-gray-800 border border-gray-700 rounded-2xl p-3 flex flex-col gap-1 z-50 shadow-2xl min-w-44">
                    <Link
                        to="/feedback"
                        className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 font-semibold px-3 py-2.5 rounded-xl transition-all"
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <MessageSquareText size={18} />
                        <span className="text-sm">Feedback</span>
                    </Link>
                    <Link
                        to="/messages"
                        className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 font-semibold px-3 py-2.5 rounded-xl transition-all"
                        onClick={() => setIsMoreOpen(false)}
                    >
                        <Mail size={18} />
                        <span className="text-sm">Messages</span>
                    </Link>
                </div>
            )}

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-gray-900 border-t border-gray-800 px-6 py-3 justify-around items-center z-50">
                {navItem("/dashboard", LayoutDashboard, "Dashboard")}
                {navItem("/courses", BookOpen, "Courses")}
                {navItem("/courses/new", PlusCircle, "Create")}
                {navItem("/leaderboard", Trophy, "Leaderboard")}
                <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex flex-col items-center gap-1 transition-colors ${isMoreOpen ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    <MoreHorizontal size={22} />
                    <p className="text-xs font-semibold">More</p>
                </button>
            </div>
        </>
    )
}

export default BottomNav