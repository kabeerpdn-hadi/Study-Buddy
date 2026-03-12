import { useEffect, useState } from "react"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"

const typeConfig = {
    complaint: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400", label: "Complaint" },
    suggestion: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400", label: "Suggestion" },
    praise: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400", label: "Praise" },
}

const MessagesPage = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [newMessage, setNewMessage] = useState("")
    const [newType, setNewType] = useState("suggestion")
    const [submitting, setSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const user = useUserStore((state) => state.user)

    const fetchMyFeedbacks = async () => {
        try {
            const response = await axios.get("/api/feedback/mine")
            setFeedbacks(response.data.feedbacks)
        } catch (error) {
            console.error("Failed to fetch feedbacks", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyFeedbacks()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        try {
            setSubmitting(true)
            await axios.post("/api/feedback", { type: newType, message: newMessage })
            setNewMessage("")
            setNewType("suggestion")
            setShowForm(false)
            fetchMyFeedbacks()
        } catch (error) {
            console.error("Submit failed", error)
        } finally {
            setSubmitting(false)
        }
    }

    const unreadReplies = feedbacks.filter(f => f.reply && !f.replyRead).length

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <div className="border-b border-gray-800 px-8 py-6">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            Messages
                            {unreadReplies > 0 && (
                                <span className="bg-blue-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                                    {unreadReplies} new
                                </span>
                            )}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Your feedback & replies from the team</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all hover:scale-105"
                    >
                        {showForm ? "✕ Cancel" : "+ New Message"}
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 py-8">
                {/* New Message Form */}
                {showForm && (
                    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 mb-8">
                        <h2 className="text-lg font-black mb-5">Send a message to the team</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Type selector */}
                            <div className="grid grid-cols-3 gap-3">
                                {Object.entries(typeConfig).map(([key, config]) => (
                                    <button
                                        type="button"
                                        key={key}
                                        onClick={() => setNewType(key)}
                                        className={`rounded-2xl p-3 font-bold text-sm border-2 transition-all capitalize flex items-center justify-center gap-2
                                            ${newType === key
                                                ? `${config.bg} ${config.text} border-current`
                                                : "bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-500"
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${newType === key ? config.dot : "bg-gray-600"}`} />
                                        {config.label}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write your message here..."
                                rows={4}
                                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-gray-700 text-sm leading-relaxed"
                            />

                            <button
                                type="submit"
                                disabled={submitting || !newMessage.trim()}
                                className="w-full py-3 rounded-xl font-black bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {submitting ? "Sending..." : "Send Message ✓"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Messages List */}
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-900 rounded-2xl p-6 animate-pulse">
                                <div className="h-4 bg-gray-800 rounded w-1/3 mb-3" />
                                <div className="h-3 bg-gray-800 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-800 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="text-center py-24 text-gray-600">
                        <div className="text-5xl mb-4">💬</div>
                        <p className="font-bold text-lg text-gray-500">No messages yet</p>
                        <p className="text-sm mt-1">Send your first message to the team above!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {feedbacks.map((feedback) => {
                            const config = typeConfig[feedback.type] || typeConfig.suggestion
                            const hasReply = !!feedback.reply

                            return (
                                <div
                                    key={feedback._id}
                                    className={`rounded-2xl overflow-hidden border transition-all ${
                                        hasReply && !feedback.replyRead
                                            ? "border-blue-500/40 bg-blue-500/5"
                                            : "border-gray-800 bg-gray-900"
                                    }`}
                                >
                                    {/* User message */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                                    {config.label}
                                                </span>
                                                {hasReply && !feedback.replyRead && (
                                                    <span className="bg-blue-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                                                        New reply
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-gray-600 text-xs">
                                                {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                                                    month: "short", day: "numeric", year: "numeric"
                                                })}
                                            </span>
                                        </div>

                                        {/* You label */}
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                                                {user?.name?.[0]?.toUpperCase() ?? "?"}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold mb-1">You</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{feedback.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin reply */}
                                    {hasReply && (
                                        <div className="border-t border-gray-800 bg-gray-800/50 p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                                                    A
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-xs text-emerald-400 font-bold">Study Buddy Team</p>
                                                        {feedback.repliedAt && (
                                                            <span className="text-gray-600 text-xs">
                                                                · {new Date(feedback.repliedAt).toLocaleDateString("en-US", {
                                                                    month: "short", day: "numeric"
                                                                })}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-200 text-sm leading-relaxed">{feedback.reply}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Pending reply */}
                                    {!hasReply && (
                                        <div className="border-t border-gray-800/50 px-5 py-3">
                                            <p className="text-xs text-gray-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-pulse inline-block" />
                                                Awaiting reply from the team...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessagesPage