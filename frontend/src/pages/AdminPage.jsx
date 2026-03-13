import { useEffect, useState } from "react"
import axios from "../libraries/axios"
import { ShieldAlert, Reply, Trash2 } from "lucide-react"

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
        complaint: { bg: "bg-red-50", text: "text-red-500", border: "border-red-100", dot: "bg-red-400", label: "Complaint" },
        suggestion: { bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100", dot: "bg-blue-400", label: "Suggestion" },
        praise: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", dot: "bg-emerald-400", label: "Praise" },
        feedback: { bg: "bg-violet-50", text: "text-violet-500", border: "border-violet-100", dot: "bg-violet-400", label: "Feedback" },
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={18} className="text-violet-500" />
                    <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                </div>
                <div className="bg-gray-100 rounded-xl px-3 py-1.5 text-sm font-semibold text-gray-500">
                    {feedbacks.length} messages
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 md:p-8">
                {feedbacks.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="text-5xl mb-4">📭</div>
                        <p className="font-semibold text-gray-500">No feedback yet</p>
                        <p className="text-sm text-gray-400 mt-1">Messages from users will appear here</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {feedbacks.map((feedback) => {
                            const config = typeConfig[feedback.type] || typeConfig.suggestion
                            return (
                                <div key={feedback._id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm flex-shrink-0">
                                                {feedback.user?.name?.[0]?.toUpperCase() ?? "?"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <span className="font-semibold text-gray-900 text-sm">{feedback.user?.name ?? "Unknown"}</span>
                                                    <span className="text-gray-400 text-xs">{feedback.user?.email}</span>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">{feedback.message}</p>
                                                <p className="text-gray-400 text-xs mt-2">
                                                    {new Date(feedback.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => { setReplyModal(feedback); setReplyMessage("") }}
                                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-500 font-semibold text-xs border border-blue-100 transition-all"
                                            >
                                                <Reply size={13} /> Reply
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(feedback._id)}
                                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-xs border border-red-100 transition-all"
                                            >
                                                <Trash2 size={13} /> Delete
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
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-lg shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-bold text-gray-900">Reply to {replyModal.user?.name}</h2>
                            <button onClick={() => setReplyModal(null)} className="text-gray-400 hover:text-gray-700 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all text-lg">✕</button>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                            <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Original message</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{replyModal.message}</p>
                        </div>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Write your reply..."
                            rows={4}
                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-400 resize-none border border-gray-200 text-sm mb-4"
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setReplyModal(null)} className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all">
                                Cancel
                            </button>
                            <button
                                onClick={handleReply}
                                disabled={sending || !replyMessage.trim()}
                                className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {sending ? "Sending..." : "Send Reply"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={20} className="text-red-500" />
                        </div>
                        <h2 className="text-base font-bold text-gray-900 mb-1">Delete this feedback?</h2>
                        <p className="text-gray-400 text-sm mb-5">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-red-500 hover:bg-red-600 text-white transition-all">
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