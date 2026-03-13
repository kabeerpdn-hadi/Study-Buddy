import { useNavigate } from "react-router-dom";

const features = [
  {
    emoji: "🤖",
    title: "AI-Generated Courses",
    desc: "Type any topic and get a full structured course in seconds — powered by cutting-edge LLMs.",
    accent: "emerald",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    emoji: "🎯",
    title: "Learn at Your Level",
    desc: "Choose beginner, intermediate, or advanced. The AI tailors every lesson to where you are.",
    accent: "blue",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    hoverBorder: "hover:border-blue-200",
  },
  {
    emoji: "⚡",
    title: "Earn XP & Level Up",
    desc: "Complete lessons to earn coins, unlock badges, and climb the leaderboard.",
    accent: "amber",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    hoverBorder: "hover:border-amber-200",
  },
  {
    emoji: "🔒",
    title: "Lesson Path System",
    desc: "Lessons unlock one by one — keeping you on track and always moving forward.",
    accent: "violet",
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    hoverBorder: "hover:border-violet-200",
  },
];

const stats = [
  { value: "10k+", label: "Courses created" },
  { value: "50k+", label: "Lessons completed" },
  { value: "Free", label: "To get started" },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">

      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-xl font-black text-gray-900">
            🚀 <span className="text-emerald-500">Study</span>Buddy
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm"
            >
              Get started →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          Powered by Llama 3.3 · Free to start
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
          Learn anything.{" "}
          <span className="text-emerald-500">Instantly.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Type a topic. Get a full AI-generated course — with lessons, quizzes,
          XP rewards, and a path to mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 rounded-xl font-bold text-base bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-100 hover:shadow-emerald-200 hover:scale-105 transition-all"
          >
            Start learning for free ✨
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 rounded-xl font-semibold text-base border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            I have an account
          </button>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {["🎓 AI-built lessons", "🏆 Leaderboard", "🪙 Earn coins", "📱 Any topic"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-500 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-emerald-500 mb-1">{value}</p>
              <p className="text-sm text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-3">Why Study Buddy</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Everything you need to level up
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            We handle the curriculum. You handle the learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group rounded-2xl p-7 bg-white border border-gray-100 ${f.hoverBorder} hover:shadow-md transition-all hover:-translate-y-0.5`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {f.emoji}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-4xl font-black text-gray-900 mb-14">Up and running in 3 steps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Pick a topic", desc: "Type anything — Python, History, Guitar, you name it.", emoji: "✍️" },
              { step: "2", title: "AI builds your course", desc: "Get a full structured course with lessons in seconds.", emoji: "🤖" },
              { step: "3", title: "Learn & level up", desc: "Complete quizzes, earn coins, and climb the leaderboard.", emoji: "🏆" },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:shadow-sm transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-black text-sm flex items-center justify-center mb-4">
                  {step}
                </div>
                <p className="text-2xl mb-3">{emoji}</p>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="bg-emerald-500 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-black mb-3">Ready to start? 🚀</h2>
          <p className="text-emerald-100 mb-8 text-base">
            Join Study Buddy and generate your first AI course in under 30 seconds.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-3.5 rounded-xl font-bold text-base bg-white text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all shadow-lg"
          >
            Create your free account →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 text-center py-8 text-gray-400 text-sm">
        Built with ❤️ · StudyBuddy © 2025
      </footer>
    </div>
  );
};

export default LandingPage;