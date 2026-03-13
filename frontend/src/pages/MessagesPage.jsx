import { useEffect, useState } from "react"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"

const typeConfig = {
    complaint: { bg: "bg-red-50", text: "text-red-500", border: "border-red-100", dot: "bg-red-400", label: "Complaint" },
    suggestion: { bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100", dot: "bg-blue-400", label: "Suggestion" },
    praise: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", dot: "bg-emerald-400", label: "Praise" },
    feedback: { bg: "bg-violet-50", text: "text-violet-500", border: "border-violet-100", dot: "bg-violet-400", label: "Feedback" },
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

    useEffect(() => { fetchMyFeedbacks() }, [])

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

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-900">Messages</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
                >
                    {showForm ? "✕ Cancel" : "+ New Message"}
                </button>
            </div>

            <div className="max-w-3xl mx-auto p-6 md:p-8">
                {/* New Message Form */}
                {showForm && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-800 mb-4">Send a message to the team</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(typeConfig).map(([key, config]) => (
                                    <button
                                        type="button"
                                        key={key}
                                        onClick={() => setNewType(key)}
                                        className={`rounded-xl p-2.5 font-semibold text-xs border-2 transition-all capitalize flex items-center justify-center gap-1.5 ${
                                            newType === key
                                                ? `${config.bg} ${config.text} border-current`
                                                : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${newType === key ? config.dot : "bg-gray-300"}`} />
                                        {config.label}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write your message here..."
                                rows={4}
                                className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-400 resize-none border border-gray-200 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={submitting || !newMessage.trim()}
                                className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {submitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Messages List */}
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-100">
                                <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl mb-4">💬</div>
                        <p className="font-semibold text-gray-500">No messages yet</p>
                        <p className="text-sm text-gray-400 mt-1">Send your first message above!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {feedbacks.map((feedback) => {
                            const config = typeConfig[feedback.type] || typeConfig.suggestion
                            const hasReply = !!feedback.reply
                            return (
                                <div key={feedback._id} className={`rounded-2xl overflow-hidden border shadow-sm transition-all ${hasReply ? "border-emerald-100" : "border-gray-100"} bg-white`}>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                                {config.label}
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                {new Date(feedback.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-xs flex-shrink-0">
                                                {user?.name?.[0]?.toUpperCase() ?? "?"}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-semibold mb-1">You</p>
                                                <p className="text-gray-700 text-sm leading-relaxed">{feedback.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {hasReply && (
                                        <div className="border-t border-gray-50 bg-emerald-50/50 p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                                                    S
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-xs text-emerald-600 font-bold">Study Buddy Team</p>
                                                        {feedback.repliedAt && (
                                                            <span className="text-gray-400 text-xs">· {new Date(feedback.repliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{feedback.reply}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!hasReply && (
                                        <div className="border-t border-gray-50 px-5 py-3">
                                            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse inline-block" />
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