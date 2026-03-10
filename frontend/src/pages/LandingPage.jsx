import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const features = [
  {
    emoji: "🤖",
    title: "AI-Generated Courses",
    desc: "Type any topic and get a full structured course in seconds — powered by cutting-edge LLMs.",
    color: "#3b82f6",
  },
  {
    emoji: "🎯",
    title: "Learn at Your Level",
    desc: "Choose beginner, intermediate, or advanced. The AI tailors every lesson to where you are.",
    color: "#ec4899",
  },
  {
    emoji: "⚡",
    title: "Earn XP & Level Up",
    desc: "Complete lessons to earn coins, unlock badges, and climb the leaderboard.",
    color: "#f59e0b",
  },
  {
    emoji: "🔒",
    title: "Lesson Path System",
    desc: "Lessons unlock one by one — keeping you on track and always moving forward.",
    color: "#10b981",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const blobRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      blobRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, #3b82f620, #6366f110, transparent 60%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{ fontFamily: "'Outfit', sans-serif", background: "#030712" }}
      className="min-h-screen text-white overflow-hidden"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Mouse-follow gradient */}
      <div
        ref={blobRef}
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6">
        <div style={{ fontFamily: "'Outfit', sans-serif" }} className="text-xl font-black tracking-tight">
          🚀 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Study Buddy</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 transition-all"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-white text-gray-950 hover:bg-gray-100 transition-all"
          >
            Get started →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
          Powered by Llama 3.3 · Free to start
        </div>

        {/* Title */}
        <h1
          style={{ fontFamily: "'Outfit', sans-serif", lineHeight: 1.05 }}
          className="text-6xl md:text-8xl font-black mb-6 max-w-4xl"
        >
          Learn anything.{" "}
          <span
            style={{
              WebkitTextStroke: "2px #3b82f6",
              color: "transparent",
            }}
          >
            Instantly.
          </span>
        </h1>

        <p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light"
        >
          Type a topic. Get a full AI-generated course — with lessons, quizzes,
          XP rewards, and a path to mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:scale-105 transition-all"
          >
            Start learning for free ✨
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-2xl font-bold text-lg border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white hover:scale-105 transition-all"
          >
            I have an account
          </button>
        </div>

        {/* Floating stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-14 text-sm">
          {["🎓 AI-built lessons", "🏆 Leaderboard", "🪙 Earn coins", "📱 Any topic"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/50 text-gray-300 font-medium backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-32 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3">Why Study Buddy</p>
          <h2
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-4xl md:text-5xl font-black"
          >
            Everything you need to level up
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-3xl p-7 bg-gray-900/60 border border-gray-800 hover:border-gray-600 transition-all hover:-translate-y-1 backdrop-blur"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${f.color}10, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className="text-4xl mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                >
                  {f.emoji}
                </div>
                <h3
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-xl font-black mb-2"
                >
                  {f.title}
                </h3>
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="text-gray-400 leading-relaxed font-light"
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="rounded-3xl p-12 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/20 backdrop-blur">
          <h2
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-4xl font-black mb-4"
          >
            Ready to start? 🚀
          </h2>
          <p
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-gray-400 mb-8"
          >
            Join Study Buddy and generate your first AI course in under 30 seconds.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 rounded-2xl font-black text-lg bg-white text-gray-950 hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
          >
            Create your free account →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-10 text-gray-600 text-sm">
        Built with ❤️ · Study Buddy © 2025
      </footer>
    </div>
  );
};

export default LandingPage;