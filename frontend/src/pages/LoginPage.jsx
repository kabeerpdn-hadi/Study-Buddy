import { useState } from "react"
import axios from "../libraries/axios.js"
import { useNavigate } from "react-router-dom"
import useUserStore from "../store/useUserStore.js"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const handleLogin = async (e) => {
        // what should go here?
        try {
            e.preventDefault() // stops page refresh
            const response = await axios.post("/api/auth/login", {
                email,
                password
            })
            console.log(response)
            setUser(response.data.user)
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    return (
        // build your form here with Tailwind classes
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Welcome Back</h1>
                <input
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="bg-red-500/20 border border-red-500 text-red-400 rounded-lg p-3 mb-4">
                    <p>{error}</p>
                </div>}
                <button
                    className="w-full p-3 rounded-lg font-bold bg-blue-500 hover:bg-blue-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
                <p className="text-gray-400 text-center mt-4">
                    Don't have an account? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span>
                </p>
            </form>
        </div>
    )
}

export default LoginPage