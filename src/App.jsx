import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PresenceProvider } from "./context/PresenceContext";
import { TextSizeProvider } from "./context/TextSizeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import WebsiteLoader from "./components/WebsiteLoader";
import ErrorBoundary from "./components/ErrorBoundary";

// Public Pages (Lazy Loaded)
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterStudentPage = lazy(() => import("./pages/RegisterStudentPage"));
const RegisterHodPage = lazy(() => import("./pages/RegisterHodPage"));
const CircularsPage = lazy(() => import("./pages/CircularsPage"));
const HallTicketPage = lazy(() => import("./pages/HallTicketPage"));
const ConsolidatedResults = lazy(() => import("./pages/ConsolidatedResults"));
const FeeReceipt = lazy(() => import("./components/FeeReceipt"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const BranchCollegesPage = lazy(() => import("./pages/BranchCollegesPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const RtiDetailsPage = lazy(() => import("./pages/RtiDetailsPage"));
const RtiAboutPage = lazy(() => import("./pages/RtiAboutPage"));
const RtiObligationsPage = lazy(() => import("./pages/RtiObligationsPage"));
const TendersPage = lazy(() => import("./pages/TendersPage"));
// Student Pages (Lazy Loaded)
const StudentDashboardPage = lazy(() => import("./pages/student/StudentDashboardPage"));
const AttendancePage = lazy(() => import("./pages/student/AttendancePage"));
const ResultsPage = lazy(() => import("./pages/student/ResultsPage"));
const NotificationsPage = lazy(() => import("./pages/student/NotificationsPage"));
const CommunityPage = lazy(() => import("./pages/student/CommunityPage"));
const DoubtsPage = lazy(() => import("./pages/student/DoubtsPage"));
const SeniorsPage = lazy(() => import("./pages/student/SeniorsPage"));
const ChatPage = lazy(() => import("./pages/student/ChatPage"));

// HOD Pages (Lazy Loaded)
const HodDashboardPage = lazy(() => import("./pages/hod/HodDashboardPage"));
const HodApprovalsPage = lazy(() => import("./pages/hod/HodApprovalsPage"));
const HodStudentsPage = lazy(() => import("./pages/hod/HodStudentsPage"));
const HodAttendancePage = lazy(() => import("./pages/hod/HodAttendancePage"));

// Admin Pages (Lazy Loaded)
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminCollegesPage = lazy(() => import("./pages/admin/AdminCollegesPage"));
const AdminHodApprovalsPage = lazy(() => import("./pages/admin/AdminHodApprovalsPage"));

function AppRoutes() {
  return (
    <PresenceProvider>
      <Suspense fallback={<WebsiteLoader />}>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/student" element={<RegisterStudentPage />} />
            <Route path="/register/hod" element={<RegisterHodPage />} />
            <Route path="/circulars" element={<CircularsPage />} />
            <Route path="/halltickets" element={<HallTicketPage />} />
            <Route path="/Results/consolidatedResults" element={<ConsolidatedResults />} />
            <Route path="/Fee/exam" element={<FeeReceipt />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:branchCode" element={<BranchCollegesPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/Contact-Us" element={<Navigate to="/contact-us" replace />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/Sitemap" element={<SitemapPage />} />
            <Route path="/site-map" element={<SitemapPage />} />
            <Route path="/SiteMap" element={<SitemapPage />} />
            <Route path="/tenders" element={<TendersPage />} />
            <Route path="/Tenders" element={<TendersPage />} />
            <Route path="/tender" element={<TendersPage />} />
            <Route path="/Tender" element={<TendersPage />} />
            <Route path="/rti" element={<RtiDetailsPage />} />
            <Route path="/Rti" element={<RtiDetailsPage />} />
            <Route path="/rti/full-details" element={<RtiDetailsPage />} />
            <Route path="/full-details-of-right-to-information-act" element={<RtiDetailsPage />} />
            <Route path="/rti/about" element={<RtiAboutPage />} />
            <Route path="/rti/about-right-to-information" element={<RtiAboutPage />} />
            <Route path="/about-right-to-information" element={<RtiAboutPage />} />
            <Route path="/rti/obligations" element={<RtiObligationsPage />} />
            <Route path="/rti/obligations-of-public-authority" element={<RtiObligationsPage />} />
            <Route path="/obligations-of-public-authority" element={<RtiObligationsPage />} />

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
      </Suspense>
    </PresenceProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <TextSizeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </TextSizeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
