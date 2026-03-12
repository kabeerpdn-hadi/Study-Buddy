import axios from "../libraries/axios";
import { useState } from "react";
import useUserStore from "../store/useUserStore";

const FeedbackPage = () => {
    const [message, setFeedback] = useState("");
    const [type, setType] = useState("feedback");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const user = useUserStore((state) => state.user);

    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/feedback", { message, type });
            console.log(response);
            setFeedback("");
            setType("feedback");
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <h1 className="text-4xl font-black mb-2">Feedback</h1>
                    <p className="text-gray-400">Share your feedback with us</p>
                </div>

                {submitted && (
                    <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl p-4 text-center font-bold">
                        ✅ Feedback submitted successfully!
                    </div>
                )}

                <form onSubmit={handleFeedback} className="flex flex-col gap-6">
                    {/* Message Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Feedback</label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here..."
                            className="bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg resize-none"
                        />
                    </div>

                    {/* Type Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Type</label>
                        <select
                            className="bg-gray-800 text-white rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="feedback">Feedback</option>
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="praise">Praise</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !message}
                        className="w-full p-4 rounded-2xl font-black text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;