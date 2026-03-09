import { Link, useNavigate } from "react-router-dom"
import axios from "../libraries/axios"
import useUserStore from "../store/useUserStore"

const Sidebar = () => {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const handleLogout = async () => {
        await axios.post("/api/auth/logout")
        setUser(null)
        navigate("/login")
    }

  return (
    <div className="sticky top-0 h-screen w-64 bg-gray-900 flex flex-col p-6 gap-4">
      <Link className="text-gray-300 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800" to="/dashboard">Dashboard</Link>
      <Link className="text-gray-300 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800" to="/courses">Browse Courses</Link>
      <Link className="text-gray-300 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800" to="/courses/new">Create Course</Link>
      <Link className="text-gray-300 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800" to="/leaderboard">Leader Board</Link>
      <button className="text-gray-300 hover:text-white font-bold p-3 rounded-xl hover:bg-gray-800 justify-items-start" to="/logout" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Sidebar