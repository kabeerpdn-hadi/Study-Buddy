import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import { useEffect } from "react"
import axios from "./libraries/axios"
import useUserStore from "./store/useUserStore"
import CreateCoursesPage from "./pages/CreateCoursesPage"
import Layout from "./components/Layout"


function App() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/profile")
        setUser(response.data.user)
      } catch (error) {
        // user is not logged in, that's ok!
        console.log("Not logged in")
      }
    }
    checkAuth()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/courses/new" element={<Layout><CreateCoursesPage /></Layout>} />
    </Routes>
  )
}

export default App