import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/Layout";
import Quiz from "./pages/dashboard/Quiz";
import Saved from "./pages/dashboard/Saved";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="saved" element={<Saved />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}