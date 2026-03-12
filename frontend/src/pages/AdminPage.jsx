import { useEffect, useState } from "react"
import axios from "../libraries/axios"

const AdminPage = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [replyModal, setReplyModal] = useState(null)
    const [replyMessage, setReplyMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await axios.get('/api/feedback')
            setFeedbacks(response.data.feedbacks)
        }
        fetchFeedbacks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/feedback/${id}`)
            setFeedbacks(feedbacks.filter(f => f._id !== id))
            setDeleteConfirm(null)
        } catch (error) {
            console.error("Delete failed", error)
        }
    }

    const handleReply = async () => {
        if (!replyMessage.trim()) return
        try {
            setSending(true)
            await axios.post(`/api/feedback/${replyModal._id}/reply`, { message: replyMessage })
            setReplyModal(null)
            setReplyMessage("")
        } catch (error) {
            console.error("Reply failed", error)
        } finally {
            setSending(false)
        }
    }

    const typeConfig = {
        complaint: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400", label: "Complaint" },
        suggestion: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400", label: "Suggestion" },
        praise: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400", label: "Praise" },
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <div className="border-b border-gray-800 px-8 py-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Admin Panel</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage user feedback & support messages</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-800 rounded-xl px-4 py-2 text-sm font-bold text-gray-300">
                            {feedbacks.length} messages
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-8 py-8">
                {feedbacks.length === 0 ? (
                    <div className="text-center py-24 text-gray-600">
                        <div className="text-5xl mb-4">📭</div>
                        <p className="font-bold text-lg">No feedback yet</p>
                        <p className="text-sm mt-1">Messages from users will appear here</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {feedbacks.map((feedback) => {
                            const config = typeConfig[feedback.type] || typeConfig.suggestion
                            return (
                                <div
                                    key={feedback._id}
                                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left: Avatar + Info */}
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-sm flex-shrink-0">
                                                {feedback.user?.name?.[0]?.toUpperCase() ?? "?"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                                    <span className="font-bold text-white">{feedback.user?.name ?? "Unknown"}</span>
                                                    <span className="text-gray-500 text-sm">{feedback.user?.email}</span>
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed">{feedback.message}</p>
                                                <p className="text-gray-600 text-xs mt-3">
                                                    {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric", year: "numeric",
                                                        hour: "2-digit", minute: "2-digit"
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right: Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => { setReplyModal(feedback); setReplyMessage("") }}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold text-sm border border-blue-500/20 transition-all hover:scale-105"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                                                </svg>
                                                Reply
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(feedback._id)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm border border-red-500/20 transition-all hover:scale-105"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Reply Modal */}
            {replyModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black">Reply to {replyModal.user?.name}</h2>
                            <button
                                onClick={() => setReplyModal(null)}
                                className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-all"
                            >✕</button>
                        </div>

                        {/* Original message */}
                        <div className="bg-gray-800 rounded-2xl p-4 mb-5 border border-gray-700">
                            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Original message</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{replyModal.message}</p>
                        </div>

                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Write your reply..."
                            rows={4}
                            className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-gray-700 text-sm leading-relaxed"
                        />

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setReplyModal(null)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReply}
                                disabled={sending || !replyMessage.trim()}
                                className="flex-1 py-3 rounded-xl font-black bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {sending ? "Sending..." : "Send Reply ✓"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
                        <div className="text-4xl mb-4">🗑️</div>
                        <h2 className="text-xl font-black mb-2">Delete this feedback?</h2>
                        <p className="text-gray-400 text-sm mb-7">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-3 rounded-xl font-black bg-red-500 hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPage