import { useState } from "react"
import axios from "../libraries/axios.js"
import { useNavigate } from "react-router-dom"
import useUserStore from "../store/useUserStore.js"

const SignupPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const handleSignup = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post("/api/auth/signup", { email, password, name })
            setUser(response.data.user)
            navigate("/dashboard")
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900">🚀 <span className="text-emerald-500">Study</span>Buddy</h1>
                    <p className="text-gray-400 text-sm mt-2">Create your account and start learning!</p>
                </div>
                <form onSubmit={handleSignup} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Create account</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                            type="text"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 text-sm">
                                {error}
                            </div>
                        )}
                        <button className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all">
                            Create account
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm text-center mt-5">
                        Already have an account?{" "}
                        <span className="text-emerald-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/login")}>Sign in</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage