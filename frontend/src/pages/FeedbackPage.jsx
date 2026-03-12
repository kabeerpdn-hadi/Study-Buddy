import axios from "../libraries/axios";
import { useState } from "react";
import useUserStore from "../store/useUserStore";

const FeedbackPage = () => {
    const [message, setFeedback] = useState("");
    const user = useUserStore((state) => state.user);
    const [type, setType] = useState("feedback");

    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("/api/feedback", {
                message,
                type,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center justify-center">
            <div div className="w-full max-w-xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <h1 className="text-4xl font-black mb-2">Feedback</h1>
                    <p className="text-gray-400">Share your feedback with us</p>
                </div>

                <form onSubmit={handleFeedback} className="flex flex-col gap-6">
                    {/* Topic Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest"> Feedback </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg"
                        />
                    </div>

                    {/* Level Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest"> Type </label>
                        <div className="grid grid-cols-3 gap-3">
                            <select className="bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg" type="text" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="Feedback">Feedback</option>
                                <option value="complaint">Complaint</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !message}
                        className="w-full p-4 rounded-2xl font-black text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105"
                    >
                        {loading ? "Submiting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FeedbackPage