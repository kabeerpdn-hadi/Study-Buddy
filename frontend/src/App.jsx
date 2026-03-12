import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";
import axios from "./libraries/axios";
import useUserStore from "./store/useUserStore";
import CreateCoursesPage from "./pages/CreateCoursesPage";
import Layout from "./components/Layout";
import CourseDetailPage from "./pages/CourseDetailPage";
import LessonPage from "./pages/LessonPage";
import { useLocation } from "react-router-dom";
import BrowseCoursesPage from "./pages/BrowseCoursePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import LandingPage from "./pages/LandingPage";
import FeedbackPage from "./pages/FeedbackPage";
import AdminPage from "./pages/AdminPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        // user is not logged in, that's ok!
        console.log("Not logged in");
      }
    };
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/courses/new"
        element={
          <Layout>
            <CreateCoursesPage />
          </Layout>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <Layout>
            <CourseDetailPage key={location.key} />
          </Layout>
        }
      />
      <Route
        path="/courses/:courseId/lessons/:lessonId"
        element={
          <Layout>
            <LessonPage />
          </Layout>
        }
      />
      <Route
        path="/courses"
        element={
          <Layout>
            <BrowseCoursesPage />
          </Layout>
        }
      >
      </Route>
      <Route
        path="/leaderboard"
        element={
          <Layout>
            <LeaderBoardPage />
          </Layout>
        }
      >
      </Route>
      <Route
        path="/feedback"
        element={
          <Layout>
            <FeedbackPage />
          </Layout>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      ></Route>
      <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
    </Routes>
  );
}

export default App;
