import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import axios from "../libraries/axios";
import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get("/api/course/my-courses")
      setCourses(response.data.courses)
    }
    fetchCourses()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    setUser(null)
    navigate("/login")
  }

  const stats = [
    { label: "Level", value: user?.level ?? 1, emoji: "⚡", color: "from-yellow-400 to-orange-500" },
    { label: "Coins", value: user?.money ?? 0, emoji: "🪙", color: "from-emerald-400 to-teal-500" },
    { label: "Badges", value: user?.badges?.length ?? 0, emoji: "🏅", color: "from-pink-400 to-rose-500" },
    { label: "Plan", value: user?.plan ?? "free", emoji: "👑", color: "from-violet-400 to-purple-500" },
  ];

  const quickActions = [
    { label: "Create Course", emoji: "✨", color: "bg-gradient-to-br from-blue-500 to-indigo-600", action: () => navigate("/courses/new") },
    { label: "Browse Courses", emoji: "📚", color: "bg-gradient-to-br from-pink-500 to-rose-600", action: () => navigate("/courses") },
  ];

  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="bg-gray-950 text-white p-6 md:p-10"
    >
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Top Nav */}
      <div className="flex items-center justify-between mb-10">
        <div className="text-2xl font-black tracking-tight text-white">
          🚀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Study Buddy</span>
        </div>

        {/* Profile Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-800 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-500 flex items-center justify-center font-black text-lg">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <span className="font-bold text-gray-300 hidden sm:block">{user?.name}</span>
          </button>

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-64 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-pink-500 flex items-center justify-center font-black text-lg flex-shrink-0">
                    {user?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-white truncate">{user?.name}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                    <p className="text-gray-500 text-xs capitalize mt-0.5">{user?.role} · {user?.plan} plan</p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero / Profile Card */}
      <div className="relative rounded-3xl overflow-hidden mb-8 p-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-pink-500 opacity-20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-300 opacity-20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-200 font-semibold text-sm uppercase tracking-widest mb-1">Welcome back 👋</p>
          <h1 className="text-4xl font-black mb-1">{user?.name}</h1>
          <p className="text-blue-200 text-sm">{user?.email}</p>
          <div className="mt-4 inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-bold capitalize">
            {user?.role} · {user?.plan} plan
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} shadow-lg flex flex-col gap-1`}
          >
            <span className="text-3xl">{stat.emoji}</span>
            <span className="text-2xl font-black">{stat.value}</span>
            <span className="text-sm font-semibold opacity-80">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* My Courses */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-black mb-5 flex items-center gap-2">📖 My Courses</h2>
          <div className="flex flex-col gap-4">
            {courses.length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">No courses yet. Create one!</p>
            )}
            {courses.map((course) => {
              const completed = course.lessons.filter((lesson) => lesson.completed === true).length
              const total = course.lessons.length
              const progress = Math.round(completed / total * 100)
              return (
                <div
                  key={course._id}
                  className="bg-gray-800 rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold flex items-center gap-2">{course.title}</span>
                    <span className="text-sm text-gray-400 font-semibold">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-black mb-5 flex items-center gap-2">⚡ Quick Actions</h2>
          <div className="flex flex-col gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className={`${action.color} rounded-2xl p-5 text-left font-black text-lg hover:scale-105 transition-transform shadow-lg`}
              >
                {action.emoji} {action.label}
              </button>
            ))}
            <div className="bg-gray-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm font-semibold">🎯 Daily Goal</p>
              <p className="font-black text-lg mt-1">Complete 1 lesson today!</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 w-1/3" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;