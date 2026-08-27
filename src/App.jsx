import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PresenceProvider } from "./context/PresenceContext";
import { TextSizeProvider } from "./context/TextSizeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import WebsiteLoader from "./components/WebsiteLoader";

// Public Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterStudentPage from "./pages/RegisterStudentPage";
import RegisterHodPage from "./pages/RegisterHodPage";
import CircularsPage from "./pages/CircularsPage";

// Student Pages
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import AttendancePage from "./pages/student/AttendancePage";
import ResultsPage from "./pages/student/ResultsPage";
import NotificationsPage from "./pages/student/NotificationsPage";
import CommunityPage from "./pages/student/CommunityPage";
import DoubtsPage from "./pages/student/DoubtsPage";
import SeniorsPage from "./pages/student/SeniorsPage";
import ChatPage from "./pages/student/ChatPage";

// HOD Pages
import HodDashboardPage from "./pages/hod/HodDashboardPage";
import HodApprovalsPage from "./pages/hod/HodApprovalsPage";
import HodStudentsPage from "./pages/hod/HodStudentsPage";
import HodAttendancePage from "./pages/hod/HodAttendancePage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCollegesPage from "./pages/admin/AdminCollegesPage";
import AdminHodApprovalsPage from "./pages/admin/AdminHodApprovalsPage";
import HallTicketPage from "./pages/HallTicketPage";
import ConsolidatedResults from "./pages/ConsolidatedResults";
import FeeReceipt from "./components/FeeReceipt";
import CoursesPage from "./pages/CoursesPage";
import BranchCollegesPage from "./pages/BranchCollegesPage";

function AppRoutes() {
  const { loading: authLoading } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show website loader when opening the website, then transition smoothly
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || authLoading) {
    return <WebsiteLoader />;
  }

  return (
    <PresenceProvider>
      <Routes>
        <Route element={<Layout />}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register/student" element={<RegisterStudentPage />} />
                <Route path="/register/hod" element={<RegisterHodPage />} />
                <Route path="/circulars" element={<CircularsPage />} />
                <Route path="/halltickets" element={<HallTicketPage/>}/>
                <Route path="/Results/consolidatedResults" element={<ConsolidatedResults/>}/>
                <Route path="/Fee/exam" element={<FeeReceipt/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/courses/:branchCode" element={<BranchCollegesPage/>}/>
              

                {/* Student Protected Routes */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/attendance"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <AttendancePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/results"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <ResultsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/notifications"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/community"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <CommunityPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/doubts"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <DoubtsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/seniors"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <SeniorsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/seniors/chat/:roomId"
                  element={
                    <ProtectedRoute role="STUDENT">
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />

                {/* HOD Protected Routes */}
                <Route
                  path="/hod/dashboard"
                  element={
                    <ProtectedRoute role="HOD">
                      <HodDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hod/approvals"
                  element={
                    <ProtectedRoute role="HOD">
                      <HodApprovalsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hod/students"
                  element={
                    <ProtectedRoute role="HOD">
                      <HodStudentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hod/attendance"
                  element={
                    <ProtectedRoute role="HOD">
                      <HodAttendancePage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute role="ADMIN">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/colleges"
                  element={
                    <ProtectedRoute role="ADMIN">
                      <AdminCollegesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/hod-approvals"
                  element={
                    <ProtectedRoute role="ADMIN">
                      <AdminHodApprovalsPage />
                    </ProtectedRoute>
                  }
                />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </PresenceProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TextSizeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </TextSizeProvider>
    </BrowserRouter>
  );
}
