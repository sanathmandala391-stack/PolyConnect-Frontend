import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import { CloudOff } from "lucide-react";

// Official Government Arrow Back Button
function OfficialBackButton({ to, label = "Go Back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white text-[#0f2a4a] hover:bg-[#35a5f1] hover:text-white border border-slate-200 shadow-sm transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] shrink-0"
    >
      <svg
        className="w-5 h-5 transition-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </button>
  );
}

export default function StudentDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Live academic summary, fetched fresh every time this page opens.
  const [academicSummary, setAcademicSummary] = useState(null); // { cgpa, totalBacklogs }
  const [academicSummaryLoading, setAcademicSummaryLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    let isMounted = true;
    api
      .get("/student/dashboard")
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load student dashboard from the backend."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Live pass-through endpoint to derive CGPA and total backlogs
  useEffect(() => {
    if (!data?.student?.pin) return;
    let isMounted = true;
    setAcademicSummaryLoading(true);

    api
      .get(`/sbtet/consolidated-results`, { params: { pin: data.student.pin } })
      .then((res) => {
        if (!isMounted) return;
        const cgpaInfo = res.data?.cgpaInfo;
        const reportList = res.data?.reportList || [];
        const backlogs = reportList.filter(
          (subj) => String(subj.result || "").toUpperCase() !== "P"
        ).length;

        setAcademicSummary({
          cgpa: cgpaInfo?.cgpa ?? null,
          totalBacklogs: backlogs,
        });
      })
      .catch(() => {
        if (isMounted) setAcademicSummary({ cgpa: null, totalBacklogs: null });
      })
      .finally(() => {
        if (isMounted) setAcademicSummaryLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [data?.student?.pin]);

  // Background live attendance sync
  useEffect(() => {
    if (!data?.student?.pin) return;
    let isMounted = true;

    api
      .get("/student/attendance/live")
      .then((res) => {
        if (!isMounted) return;
        setData((prev) => (prev ? { ...prev, attendance: res.data } : prev));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [data?.student?.pin]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans text-slate-800">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Student Academic Portal</h1>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-900">System Notification</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <GovLoader label="Authenticating student records and loading portal statistics…" />;
  }

  const { student, attendance, unreadNotificationsCount, badges, reputation, recentAnnouncements } = data;

  const branchDisplay = typeof student?.branch === "object"
    ? (student.branch?.code || student.branch?.name || "")
    : (student?.branch || "");

  const schemeDisplay = typeof student?.scheme === "object"
    ? (student.scheme?.code || student.scheme?.name || "")
    : (student?.schemeCode || student?.scheme || "C-21");

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-10 px-2 sm:px-4">
      
      {/* Main Official Header Banner (Exact match to HOD Dashboard UI) */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <OfficialBackButton label="Return to Previous Page" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] text-sky-200 font-medium">{currentDate}</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {student?.fullName || "Student Academic Portal"}
              </h1>
              
              {/* Student Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-sky-100 font-sans">
                <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 font-mono">
                  PIN: <strong className="text-white">{student?.pin || "N/A"}</strong>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20">
                  Scheme: <strong className="text-white">{schemeDisplay}</strong>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20">
                  Semester: <strong className="text-white">{student?.currentSemester ? `SEM-${student.currentSemester}` : "N/A"}</strong>
                </span>
                {branchDisplay && (
                  <span className="bg-white/10 px-2.5 py-1 rounded border border-white/20 uppercase">
                    Branch: <strong className="text-white">{branchDisplay}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons (Exact match to HOD Header buttons) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 lg:pt-0">
            <Link
              to="/student/results"
              className="inline-flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68524] text-[#092240] font-bold text-xs px-3.5 py-2.5 rounded shadow transition-colors"
            >
              <span>View Marks Card</span>
              <span>&rarr;</span>
            </Link>
            <Link
              to="/student/attendance"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2.5 rounded border border-white/25 backdrop-blur-sm transition-all"
            >
              <span>Attendance Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid (Exact match to HOD GovStatCards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" style={{ fontFamily: "'Mulish', sans-serif", fontWeight: "700"}}>
        <GovStatCard
          label="Cumulative CGPA"
          value={
            academicSummaryLoading
              ? "…"
              : academicSummary?.cgpa != null
              ? academicSummary.cgpa
              : "—"
          }
          helper="Overall Academic Score"
          link="/student/results"
          style={{
            color: "red"
          }}
          
        />
        <GovStatCard
          label="Active Backlogs"
          value={academicSummaryLoading ? "…" : academicSummary?.totalBacklogs ?? "—"}
          danger={Number(academicSummary?.totalBacklogs) > 0}
          helper={
            Number(academicSummary?.totalBacklogs) > 0
              ? "Requires Clearance"
              : academicSummary?.totalBacklogs === 0
              ? "All Subjects Cleared"
              : "Not Synced"
          }
          link="/student/results"
        />
        <GovStatCard
          label="Exam Attendance"
          value={attendance?.examEligibilityPercentage != null ? `${attendance.examEligibilityPercentage}%` : "—"}
          danger={attendance?.detentionRisk}
          helper={attendance?.detentionRisk ? "Below 75% Cutoff" : "Eligible for Exams"}
          link="/student/attendance"
        />
        <GovStatCard
          label="Official Notices"
          value={unreadNotificationsCount ?? 0}
          helper="Circulars & Updates"
          link="/circulars"
        />
      </div>

      {/* Attendance Detention Risk Warning Banner (if applicable) */}
     

      {/* Split Cards: Recent Announcements + Community Merits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Official Announcements (Exact match to HOD left card) */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#35a5f1] px-4 py-3.5 flex flex-wrap items-center justify-between gap-2.5 text-white">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bullhorn text-sm shrink-0" />
              <span className="font-semibold text-sm tracking-wide">Recent Official Announcements</span>
            </div>

            <Link
              to="/circulars"
              className="inline-flex items-center gap-1 text-xs font-semibold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded transition-colors text-white"
            >
              <span>View All</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="p-4 flex-1">
            {(!recentAnnouncements || recentAnnouncements.length === 0) ? (
              <p className="text-xs text-slate-500 py-8 text-center">No official circulars or announcements published yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100 text-xs">
                {recentAnnouncements.slice(0, 5).map((a, idx) => (
                  <li key={a.id || idx} className="py-3 first:pt-1 last:pb-1">
                    <p className="font-semibold text-slate-900 text-xs">{a.title}</p>
                    <p className="text-slate-600 mt-1 line-clamp-2 leading-relaxed text-[11px]">{a.content}</p>
                    {a.createdAt && (
                      <span className="text-[10px] text-slate-400 block mt-1.5 font-mono">
                        {new Date(a.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Card 2: Community Merits & Badges (Exact match to HOD right card) */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#0f2a4a] px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-award text-sm shrink-0 text-amber-400" />
              <span className="font-semibold text-sm tracking-wide text-white">
                Community Reputation &amp; Merits
              </span>
            </div>

            <Link
              to="/student/community"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#35a5f1] hover:text-white bg-[#35a5f1]/10 hover:bg-[#35a5f1]/20 px-2.5 py-1 rounded border border-[#35a5f1]/30 transition-colors whitespace-nowrap"
            >
              <span>Community Forum</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="p-4 flex-1 space-y-4">
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3.5 rounded-md">
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Reputation Points</span>
                <span className="text-[11px] text-slate-500">Earned through helpful answers &amp; peer discussions</span>
              </div>
              <div className="font-serif font-black text-2xl text-[#0f2a4a]">
                {reputation?.points ?? 0}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">Earned Badges</span>
              {(!badges || badges.length === 0) ? (
                <div className="text-xs text-slate-500 py-6 bg-slate-50/70 rounded-md p-4 text-center border border-dashed border-slate-200">
                  <i className="fa-solid fa-medal text-slate-400 text-xl mb-1.5 block" />
                  <p>Participate in the community and solve peer doubts to unlock polytechnic merit badges.</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {badges.map((b, i) => {
                    const badgeName = typeof b === "object" ? (b.name || b.code || "Badge") : String(b);
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-[#0f2a4a] text-xs font-bold px-3 py-1.5 rounded"
                      >
                        <i className="fa-solid fa-certificate text-[#35a5f1]" />
                        {badgeName}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Direct Academic Services Shortcuts */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-bold text-xs uppercase tracking-wider text-[#0f2a4a] mb-3 flex items-center gap-2">
          <i className="fa-solid fa-compass text-[#35a5f1]" />
          Direct Academic Services &amp; Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <Link
            to="/student/results"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-file-lines text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Results Statement</span>
            <span className="text-slate-500 text-[10px]">Marks memos</span>
          </Link>
          <Link
            to="/student/attendance"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-calendar-check text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Live Attendance</span>
            <span className="text-slate-500 text-[10px]">SBTET register</span>
          </Link>
          <Link
            to="/Fee/exam"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-receipt text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Fee Payment</span>
            <span className="text-slate-500 text-[10px]">Pay &amp; receipts</span>
          </Link>
          <Link
            to="/halltickets"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-id-card text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Hall Tickets</span>
            <span className="text-slate-500 text-[10px]">Exam downloads</span>
          </Link>
          <Link
            to="/student/doubts"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-robot text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Doubt Solver AI</span>
            <span className="text-slate-500 text-[10px]">24/7 AI tutor</span>
          </Link>
          <Link
            to="/student/seniors"
            className="p-3 border border-slate-200 rounded hover:border-[#35a5f1] hover:bg-sky-50/40 transition-all block text-center group"
          >
            <i className="fa-solid fa-user-graduate text-slate-600 group-hover:text-[#35a5f1] text-base mb-1 block" />
            <span className="font-bold text-[#0f2a4a] block mb-0.5">Senior Connect</span>
            <span className="text-slate-500 text-[10px]">Mentorship</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

// Official Stat Card Component (Matches HOD GovStatCard exactly)
function GovStatCard({ label, value, warn = false, danger = false, helper, link }) {
  const borderTopColor = danger
    ? "border-t-rose-600 bg-rose-50/20"
    : warn
    ? "border-t-amber-500 bg-amber-50/20"
    : "border-t-[#35a5f1] bg-white";

  const valueColor = danger ? "text-rose-700" : warn ? "text-amber-700" : "text-[#0f2a4a]";

  const content = (
    <div className={`rounded-lg border border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-sm hover:shadow transition-shadow border-t-4 ${borderTopColor}`}>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1 truncate">{label}</span>
      <span className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight my-1 ${valueColor}`}>{value}</span>
      {helper && <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 truncate">{helper}</span>}
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}
