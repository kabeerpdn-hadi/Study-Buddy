import { Link } from "react-router-dom"
import { LayoutDashboard, BookOpen, PlusCircle, Trophy, MoreHorizontal } from "lucide-react"
import { useState } from "react"

const BottomNav = () => {
    const [isMoreOpen, setIsMoreOpen] = useState(false)

    return (
        <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-gray-900 p-4 justify-around">
            <Link to="/dashboard" className="flex flex-col items-center text-gray-400 hover:text-white">
                <LayoutDashboard size={24} />
                <p className="text-xs">Dashboard</p>
            </Link>
            <Link to="/courses" className="flex flex-col items-center text-gray-400 hover:text-white">
                <BookOpen size={24} />
                <p className="text-xs">Courses</p>
            </Link>
            <Link to="/courses/new" className="flex flex-col items-center text-gray-400 hover:text-white">
                <PlusCircle size={24} />
                <p className="text-xs">Create Course</p>
            </Link>
            <Link to="/leaderboard" className="flex flex-col items-center text-gray-400 hover:text-white">
                <Trophy size={24} />
                <p className="text-xs">Leaderboard</p>
            </Link>
            {isMoreOpen && (
                <div className="fixed bottom-20 right-4 bg-gray-800 rounded-2xl p-4 flex flex-col gap-3">
                    <Link to="/feedback" className="text-gray-300 hover:text-white font-bold" onClick={() => setIsMoreOpen(false)}>📝 Feedback</Link>
                </div>
            )}
            <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="flex flex-col items-center text-gray-400 hover:text-white">
                <MoreHorizontal size={24} />
                <p className="text-xs">More</p>
            </button>
        </div>
    )
}

export default BottomNav