import { useEffect, useState } from "react";
import axios from "../libraries/axios";
import useUserStore from "../store/useUserStore";
import { Trophy, Zap, Coins } from "lucide-react";

const LeaderBoardPage = () => {
    const [leaderboard, setLeaderboard] = useState([])
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/auth/leaderboard")
            setLeaderboard(response.data.users)
        }
        fetchData()
    }, [])

    const medalColor = (index) => {
        if (index === 0) return "border-l-4 border-amber-400"
        if (index === 1) return "border-l-4 border-gray-400"
        if (index === 2) return "border-l-4 border-orange-400"
        return ""
    }

    const rankBadge = (index) => {
        if (index === 0) return "text-amber-500 bg-amber-50"
        if (index === 1) return "text-gray-500 bg-gray-100"
        if (index === 2) return "text-orange-500 bg-orange-50"
        return "text-gray-400 bg-gray-50"
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-white border-b border-gray-100 px-8 py-4">
                <h1 className="text-lg font-bold text-gray-900">Leaderboard</h1>
            </div>

            <div className="p-6 md:p-8 max-w-2xl mx-auto">
                {/* Your Stats */}
                <div className="bg-emerald-500 text-white rounded-2xl p-6 mb-6">
                    <p className="text-emerald-100 text-sm font-medium mb-3">Your Stats</p>
                    <p className="text-xl font-black mb-4">{user?.name}</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/20 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black">{user?.level}</p>
                            <p className="text-emerald-100 text-xs font-medium">Level</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black">{user?.money}</p>
                            <p className="text-emerald-100 text-xs font-medium">Coins</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                        <Trophy size={16} className="text-amber-500" />
                        <span className="text-sm font-bold text-gray-800">Top Players</span>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-50">
                        {leaderboard.map((player, index) => (
                            <div key={player._id} className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all ${medalColor(index)}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${rankBadge(index)}`}>
                                        {index + 1}
                                    </span>
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">
                                        {player.name[0]?.toUpperCase()}
                                    </div>
                                    <span className="font-semibold text-gray-800 text-sm">{player.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Zap size={13} className="text-amber-500" />
                                        <span className="text-sm font-bold text-gray-700">{player.level}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Coins size={13} className="text-emerald-500" />
                                        <span className="text-sm font-bold text-gray-700">{player.money}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoardPage