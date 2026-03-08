import { useState } from "react"
import axios from "../libraries/axios.js"
import { useNavigate } from "react-router-dom"
import useUserStore from "../store/useUserStore.js"

const SignupPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const handleSignup = async (e) => {
    // what should go here?
    e.preventDefault() // stops page refresh
    const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name
    })
    console.log(response)
    setUser(response.data.user)
    navigate("/dashboard")
  }

  return (
    // build your form here with Tailwind classes
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Ready to start learning ?</h1>
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
            <input 
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your Username"
                value={name}
                onChange={(e) => setName(e.target.value)} 
            />
            <button 
                className="w-full p-3 rounded-lg font-bold bg-blue-500 hover:bg-blue-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
                Sign Up
            </button>
            <p className="text-gray-400 text-center mt-4">
                Already have an account? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span>
            </p>
        </form>
    </div>
  )
}

export default SignupPage