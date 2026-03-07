import { useState } from "react"
import axios from "../libraries/axios.js"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    // what should go here?
    e.preventDefault() // stops page refresh
    const response = await axios.post("/api/auth/login", {
        email,
        password
    })
    console.log(response)
  }

  return (
    // build your form here with Tailwind classes
    <div>
        <form onSubmit={handleLogin}>
            <input 
                type="email" 
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginPage