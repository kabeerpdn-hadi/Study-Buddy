import { useEffect, useState } from "react"
import useUserStore from "../store/useUserStore"
import axios from "../libraries/axios"

const AdminPage = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('/api/feedback')
            setFeedbacks(response.data.feedbacks)
        }

        fetchUser();
    }, [])

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-3xl font-black mb-6">🛠️ Admin Panel</h1>
            <div className="flex flex-col gap-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-gray-900 rounded-2xl p-6">
                        <div>{feedback.message}</div>
                        <div><span className={`px-3 py-1 rounded-full text-sm font-bold ${feedback.type === "complaint" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                            {feedback.type}
                        </span></div>
                        <div>{new Date(feedback.createdAt).toLocaleDateString()}</div>
                        <div>
                            <span>{feedback.user?.name}</span>
                            <span>{feedback.user?.email}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPage