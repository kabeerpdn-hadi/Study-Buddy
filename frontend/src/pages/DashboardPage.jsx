import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import axios from "../libraries/axios";
import { useState, useEffect, useRef } from "react";
import { LogOut, MessageSquareText, ShieldAlert, BookOpen, PlusCircle, Trophy, ChevronRight, Zap, Coins, Medal, Crown } from "lucide-react";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get("/api/course/my-courses");
      setCourses(response.data.courses);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/login");
  };

  const stats = [
    { label: "Level", value: user?.level ?? 1, icon: Zap, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Coins", value: user?.money ?? 0, icon: Coins, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Badges", value: user?.badges?.length ?? 0, icon: Medal, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Plan", value: user?.plan ?? "free", icon: Crown, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Top Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-50 transition-all"
          >
            <span className="text-sm font-semibold text-gray-600 hidden sm:block">{user?.name}</span>
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-sm">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-60 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                    {user?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{user?.name}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                    <p className="text-gray-400 text-xs capitalize">{user?.role} · {user?.plan}</p>
                  </div>
                </div>
              </div>
              <div className="p-2 border-b border-gray-50">
                <button onClick={() => { navigate("/messages"); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all">
                  <MessageSquareText size={15} /> Messages
                </button>
                {user?.role === "admin" && (
                  <button onClick={() => { navigate("/admin"); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-violet-500 hover:bg-violet-50 text-sm font-medium transition-all">
                    <ShieldAlert size={15} /> Admin Panel
                  </button>
                )}
              </div>
              <div className="p-2">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 text-sm font-medium transition-all">
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-5xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-emerald-500 rounded-2xl p-6 mb-6 text-white">
          <p className="text-emerald-100 text-sm font-medium mb-1">Welcome back 👋</p>
          <h2 className="text-2xl font-black">{user?.name}</h2>
          <p className="text-emerald-100 text-sm mt-1">{user?.email} · <span className="capitalize">{user?.role}</span></p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`bg-white border ${border} rounded-2xl p-4 flex flex-col gap-2`}>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={16} className={color} />
              </div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* My Courses */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <BookOpen size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-gray-800">My Courses</span>
              </div>
              <button onClick={() => navigate("/courses")} className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                View all <ChevronRight size={13} />
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No courses yet.</p>
                <button onClick={() => navigate("/courses/new")} className="mt-2 text-emerald-500 text-sm font-semibold hover:underline">
                  Create your first →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {courses.slice(0, 5).map((course) => {
                  const completed = course.lessons.filter((l) => l.completed).length;
                  const total = course.lessons.length;
                  const progress = Math.round((completed / total) * 100);
                  return (
                    <div
                      key={course._id}
                      onClick={() => navigate(`/courses/${course._id}`)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={14} className="text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{course.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{progress}%</span>
                        </div>
                      </div>
                      <ChevronRight size={13} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                <Zap size={14} className="text-amber-500" />
              </div>
              <span className="text-sm font-bold text-gray-800">Quick Actions</span>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate("/courses/new")} className="flex items-center gap-4 p-4 rounded-xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition-all group text-left">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <PlusCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Create Course</p>
                  <p className="text-xs text-gray-500">AI builds it instantly</p>
                </div>
                <ChevronRight size={13} className="text-gray-300 ml-auto group-hover:text-emerald-500" />
              </button>

              <button onClick={() => navigate("/courses")} className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-all group text-left">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Browse Courses</p>
                  <p className="text-xs text-gray-500">Continue learning</p>
                </div>
                <ChevronRight size={13} className="text-gray-300 ml-auto group-hover:text-blue-500" />
              </button>

              <button onClick={() => navigate("/leaderboard")} className="flex items-center gap-4 p-4 rounded-xl border border-amber-100 bg-amber-50 hover:bg-amber-100 transition-all group text-left">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Trophy size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Leaderboard</p>
                  <p className="text-xs text-gray-500">See your ranking</p>
                </div>
                <ChevronRight size={13} className="text-gray-300 ml-auto group-hover:text-amber-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;