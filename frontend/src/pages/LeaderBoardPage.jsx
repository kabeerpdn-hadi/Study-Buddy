import { useEffect, useState } from "react";
import axios from "../libraries/axios";
import useUserStore from "../store/useUserStore";

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

    const getMedal = (index) => {
        if (index === 0) return "border-2 border-yellow-400"
        if (index === 1) return "border-2 border-gray-400"
        if (index === 2) return "border-2 border-orange-400"
        return ""
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">

            {/* User Stats */}
            <div className="bg-gray-900 rounded-3xl p-6 mb-8">
                <h1 className="text-3xl font-black mb-4">👤 {user?.name}</h1>
                <div className="flex gap-4">
                    <div className="bg-gray-800 rounded-2xl p-4 flex-1 text-center">
                        <p className="text-2xl font-black">⚡ {user?.level}</p>
                        <p className="text-gray-400 text-sm">Level</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-4 flex-1 text-center">
                        <p className="text-2xl font-black">🪙 {user?.money}</p>
                        <p className="text-gray-400 text-sm">Coins</p>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gray-900 rounded-3xl p-6">
                <h2 className="text-2xl font-black mb-4">🏆 Leaderboard</h2>
                <div className="flex flex-col gap-3">
                    {leaderboard.map((player, index) => (
                        <div key={player._id} className={`flex items-center justify-between bg-gray-800 rounded-2xl p-4 ${getMedal(index)}`}>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-black text-gray-400">#{index + 1}</span>
                                <span className="font-bold">{player.name}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-yellow-400 font-bold">⚡ {player.level}</span>
                                <span className="text-emerald-400 font-bold">🪙 {player.money}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default LeaderBoardPage