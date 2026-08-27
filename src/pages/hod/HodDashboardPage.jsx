// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";
// import StatusBadge from "../../components/StatusBadge";

// export default function HodDashboardPage() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/hod/dashboard")
//       .then((res) => {
//         if (isMounted) setData(res.data);
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load HOD department overview."));
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <h1 className="font-display text-2xl font-bold text-gov-navy">Department HOD Dashboard</h1>
//         <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return <GovLoader label="Loading department statistics and pending workflows…" />;
//   }

//   const {
//     totalStudentsCount,
//     detentionRiskCount,
//     pendingApprovalsCount,
//     departmentAverageAttendance,
//     detentionRisks,
//     pendingApprovals,
//   } = data;

//   return (
//     <div className="space-y-6">
//       {/* Top Banner */}
//       <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-gov-blueDark to-gov-navy text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <div className="text-xs uppercase tracking-widest text-gov-saffron font-bold mb-1">
//             Faculty Department Control
//           </div>
//           <h1 className="font-display font-black text-2xl md:text-3xl text-white">
//             Head of Department Portal
//           </h1>
//           <p className="text-xs text-blue-100 mt-1">
//             Department roster management, student registration approvals, and exam attendance monitoring.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Link
//             to="/hod/approvals"
//             className="gov-btn bg-gov-saffron hover:bg-amber-600 text-gov-navy font-bold text-xs px-4 py-2"
//           >
//             Review Approvals ({pendingApprovalsCount ?? 0})
//           </Link>
//           <Link
//             to="/hod/attendance"
//             className="gov-btn bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs px-3 py-2"
//           >
//             Attendance Register
//           </Link>
//         </div>
//       </div>

//       {/* Primary Metrics Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           label="Total Enrolled Students"
//           value={totalStudentsCount ?? 0}
//           helper="Department Roster"
//         />
//         <StatCard
//           label="Pending Registrations"
//           value={pendingApprovalsCount ?? 0}
//           warn={pendingApprovalsCount > 0}
//           helper="Requires Verification"
//           link="/hod/approvals"
//         />
//         <StatCard
//           label="Detention Risk Students"
//           value={detentionRiskCount ?? 0}
//           warn={detentionRiskCount > 0}
//           helper="Below 75% Attendance"
//           link="/hod/attendance"
//         />
//         <StatCard
//           label="Dept. Average Attendance"
//           value={departmentAverageAttendance != null ? `${departmentAverageAttendance}%` : "—"}
//           helper="Cumulative Department %"
//         />
//       </div>

//       {/* Split Roster Lists */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Pending Student Registrations */}
//         <div className="gov-card overflow-hidden">
//           <div className="gov-title-bar">
//             <span>Pending Student Approvals</span>
//             <Link to="/hod/approvals" className="text-xs text-blue-200 hover:text-white font-normal underline">
//               View all &rarr;
//             </Link>
//           </div>
//           <div className="p-4">
//             {(!pendingApprovals || pendingApprovals.length === 0) ? (
//               <p className="text-xs text-gov-slate py-4 text-center">No student registrations pending review.</p>
//             ) : (
//               <ul className="divide-y divide-gov-border text-xs">
//                 {pendingApprovals.slice(0, 6).map((a) => (
//                   <li key={a.id} className="py-2.5 flex items-center justify-between">
//                     <div>
//                       <p className="font-semibold text-gov-ink">{a.student?.fullName || "Student"}</p>
//                       <p className="text-[11px] text-gov-slate font-mono">{a.student?.pin || a.student?.email}</p>
//                     </div>
//                     <StatusBadge status={a.status || "PENDING"} />
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Detention Risk Students */}
//         <div className="gov-card overflow-hidden">
//           <div className="gov-title-bar">
//             <span>Students with Low Attendance (&lt; 75%)</span>
//             <Link to="/hod/attendance" className="text-xs text-blue-200 hover:text-white font-normal underline">
//               Full Register &rarr;
//             </Link>
//           </div>
//           <div className="p-4">
//             {(!detentionRisks || detentionRisks.length === 0) ? (
//               <p className="text-xs text-gov-slate py-4 text-center">
//                 All department students currently meet the 75% examination eligibility criteria.
//               </p>
//             ) : (
//               <ul className="divide-y divide-gov-border text-xs">
//                 {detentionRisks.slice(0, 6).map((att) => (
//                   <li key={att.id} className="py-2.5 flex items-center justify-between">
//                     <div>
//                       <p className="font-mono font-bold text-gov-navy">{att.studentPin}</p>
//                       <p className="text-[11px] text-gov-slate">Exam Eligibility Cutoff</p>
//                     </div>
//                     <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-xs">
//                       {att.examEligibilityPercentage}%
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, warn = false, helper, icon, link }) {
//   const content = (
//     <div className={`gov-card p-4 flex flex-col justify-between h-full ${warn ? "border-amber-400 bg-amber-50/30" : ""}`}>
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-[11px] uppercase tracking-wider text-gov-slate font-bold">{label}</span>
//         <span className="text-base">{icon}</span>
//       </div>
//       <div className={`font-display font-black text-2xl ${warn ? "text-amber-700" : "text-gov-navy"}`}>
//         {value}
//       </div>
//       {helper && <span className="text-[10px] text-gov-slate mt-1 block">{helper}</span>}
//     </div>
//   );
//   return link ? <Link to={link}>{content}</Link> : content;
// }











import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";
import StatusBadge from "../../components/StatusBadge";

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
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white text-[#0f2a4a] hover:bg-[#35a5f1] hover:text-white border border-slate-200 shadow-sm transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] flex-shrink-0"
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

export default function HodDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("pin"); // 'pin' | 'attendance'

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    let isMounted = true;
    api
      .get("/hod/dashboard")
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load HOD department overview."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Guarantee ascending sort whenever new data arrives
  const sortedDetentionRisks = useMemo(() => {
    if (!data?.detentionRisks) return [];
    return [...data.detentionRisks].sort((a, b) => {
      if (sortField === "attendance") {
        const attA = parseFloat(a.examEligibilityPercentage ?? 0);
        const attB = parseFloat(b.examEligibilityPercentage ?? 0);
        return attA - attB;
      }
      const pinA = a.studentPin || "";
      const pinB = b.studentPin || "";
      return pinA.localeCompare(pinB, undefined, { numeric: true, sensitivity: "base" });
    });
  }, [data?.detentionRisks, sortField]);

  // Guarantee pending approvals are also in ascending order
  const sortedPendingApprovals = useMemo(() => {
    if (!data?.pendingApprovals) return [];
    return [...data.pendingApprovals].sort((a, b) => {
      const pinA = a.student?.pin || a.student?.fullName || "";
      const pinB = b.student?.pin || b.student?.fullName || "";
      return pinA.localeCompare(pinB, undefined, { numeric: true, sensitivity: "base" });
    });
  }, [data?.pendingApprovals]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Department HOD Dashboard</h1>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
    return <GovLoader label="Authenticating and loading department statistics…" />;
  }

  const {
    totalStudentsCount,
    detentionRiskCount,
    pendingApprovalsCount,
    departmentAverageAttendance,
  } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-10 px-2 sm:px-4">
      {/* Official Government Top Tricolor Ribbon */}
    

      {/* Main Official Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <OfficialBackButton label="Return to Faculty Overview" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
               

                <span className="text-[11px] text-sky-200 font-medium">{currentDate}</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Head of Department (HOD) Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl font-light leading-relaxed">
                Department roster management, student registration approvals, and exam attendance monitoring.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 lg:pt-0">
            <Link
              to="/hod/approvals"
              className="inline-flex items-center gap-2 bg-[#FF9933] hover:bg-[#e68524] text-[#092240] font-bold text-xs px-3.5 py-2.5 rounded shadow transition-colors"
            >
             
              <span>Review Pending ({pendingApprovalsCount ?? 0})</span>
            </Link>
            <Link
              to="/hod/attendance"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2.5 rounded border border-white/25 backdrop-blur-sm transition-all"
            >
             
              <span>Attendance Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" style={{fontFamily: "'Mulish', sans-serif",fontWeight: "700"}}>
        <GovStatCard
          label="Total Enrolled"
          value={totalStudentsCount ?? 0}
          helper="Department Roster"
          link="/hod/students"
        />
        <GovStatCard
          label="Pending Approvals"
          value={pendingApprovalsCount ?? 0}
          warn={pendingApprovalsCount > 0}
          helper="Needs Verification"
          link="/hod/approvals"
        />
        <GovStatCard
          label="Detention Risks"
          value={detentionRiskCount ?? 0}
          danger={detentionRiskCount > 0}
          helper="Below 75% Cutoff"
          link="/hod/attendance"
        />
        <GovStatCard 
          label="Avg. Attendance"
          value={departmentAverageAttendance != null ? `${departmentAverageAttendance}%` : "—"}
          helper="Cumulative Progress"
        />
      </div>

      {/* Split Department Records Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Pending Student Registrations */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#35a5f1] px-4 py-3.5 flex flex-wrap items-center justify-between gap-2.5 text-white">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-semibold text-sm tracking-wide">Pending Student Approvals</span>
            </div>

            <Link
              to="/hod/approvals"
              className="inline-flex items-center gap-1 text-xs font-semibold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded transition-colors text-white"
            >
              <span>View All</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="p-4 flex-1">
            {sortedPendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No student registrations pending review.</p>
            ) : (
              <ul className="divide-y divide-slate-100 text-xs">
                {sortedPendingApprovals.slice(0, 6).map((a) => (
                  <li key={a.id} className="py-2.5 px-2 flex items-center justify-between hover:bg-slate-50/70 rounded transition-colors">
                    <div>
                      <p className="font-semibold text-slate-900">{a.student?.fullName || "Student"}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{a.student?.pin || a.student?.email}</p>
                    </div>
                    <StatusBadge status={a.status || "PENDING"} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Card 2: Detention Risk Students (Clean Responsive Header) */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="bg-[#0f2a4a] px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
            {/* Title & Count Badge */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-wide text-white">
                Students with Low Attendance (&lt; 75%)
              </span>
              {/* <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-500/30">
                {/* {detentionRiskCount ?? 0} */}
              {/* </span>  */}
            </div>

            {/* Controls Group: Sort Segmented Control + Full Register Button */}
            <div className="flex items-center gap-2.5 ml-auto">
              {/* Segmented Sort Pill */}
              <div className="inline-flex items-center bg-[#07172b] p-0.5 rounded-md border border-slate-700/60 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSortField("pin")}
                  className={`px-2.5 py-1 rounded transition-all font-medium ${
                    sortField === "pin"
                      ? "bg-[#35a5f1] text-white shadow-sm font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Sort numerically by Student PIN in ascending order"
                >
                  PIN ↑
                </button>
                <button
                  type="button"
                  onClick={() => setSortField("attendance")}
                  className={`px-2.5 py-1 rounded transition-all font-medium ${
                    sortField === "attendance"
                      ? "bg-[#35a5f1] text-white shadow-sm font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Sort by Attendance % from lowest to highest"
                >
                  % ↑
                </button>
              </div>

              {/* Full Register Link */}
              <Link
                to="/hod/attendance"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#35a5f1] hover:text-white bg-[#35a5f1]/10 hover:bg-[#35a5f1]/20 px-2.5 py-1 rounded border border-[#35a5f1]/30 transition-colors whitespace-nowrap"
              >
                <span>Full Register</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="p-4 flex-1">
            {sortedDetentionRisks.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                All department students currently meet the 75% examination eligibility criteria.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100 text-xs">
                {sortedDetentionRisks.slice(0, 6).map((att) => (
                  <li key={att.id} className="py-2.5 px-2 flex items-center justify-between hover:bg-rose-50/30 rounded transition-colors">
                    <div>
                      <p className="font-mono font-bold text-[#0f2a4a] tracking-wide" style={{fontFamily: "'Mulish', sans-serif"}}>{att.studentPin}</p>
                      <p className="text-[11px] text-slate-500">Exam Eligibility Cutoff</p>
                    </div>
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded text-xs shadow-2xs" style={{fontFamily: "'Mulish', sans-serif", fontWeight: "600"}}>
                      {att.examEligibilityPercentage}%
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

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
