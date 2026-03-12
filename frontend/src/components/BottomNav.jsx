import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, BookOpen, PlusCircle, Trophy, MessageSquareText } from "lucide-react"

const BottomNav = () => {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

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
        <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-gray-900 border-t border-gray-800 px-6 py-3 justify-around items-center z-50">
            {navItem("/dashboard", LayoutDashboard, "Dashboard")}
            {navItem("/courses", BookOpen, "Courses")}
            {navItem("/courses/new", PlusCircle, "Create")}
            {navItem("/leaderboard", Trophy, "Leaderboard")}
            {navItem("/messages", MessageSquareText, "Messages")}
        </div>
    )
}

export default BottomNav