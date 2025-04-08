import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contributor from "./pages/Contributor";
import Dashboard from "./pages/dashboard/Dashboard";
import GenerateQuiz from "./pages/dashboard/GenerateQuiz";
import DashboardLayout from "./pages/dashboard/Layout";
import Questions from "./pages/dashboard/Questions";
import Quiz from "./pages/dashboard/Quiz";
import QuizDetail from "./pages/dashboard/QuizDetail";
import Saved from "./pages/dashboard/Saved";
import Settings from "./pages/dashboard/Settings";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contributors" element={<Contributor />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="generate" element={<GenerateQuiz />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/:id" element={<QuizDetail />} />
          <Route path="quiz/:id/questions/:idx" element={<Questions />} />
          <Route path="saved" element={<Saved />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}