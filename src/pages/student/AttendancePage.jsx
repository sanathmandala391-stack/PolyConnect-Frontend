import { useEffect, useState } from "react";
import api, { apiErrorMessage } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import GovLoader from "../../components/GovLoader";
import sbtetHeader from "../../images/sb.png"
import BackButton from "../../components/BackButton";

const MONTHS = ["June", "July", "August", "September", "October"];

export default function AttendancePage() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState(null);
  const [liveReport, setLiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [attRes, liveRes] = await Promise.allSettled([
          api.get("/student/attendance"),
          api.get("/student/attendance/live"),
        ]);

        if (attRes.status === "fulfilled") {
          setAttendance(attRes.value.data);
        }
        if (liveRes.status === "fulfilled") {
          setLiveReport(liveRes.value.data);
        }
      } catch (err) {
        setError(apiErrorMessage(err, "Could not load attendance summary."));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSync() {
    setSyncing(true);
    setError("");
    try {
      const res = await api.get("/student/attendance/live");
      setLiveReport(res.data);
      const sumRes = await api.get("/student/attendance");
      setAttendance(sumRes.data);
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          "SBTET biometric gateway is currently updating. Please retry shortly."
        )
      );
    } finally {
      setSyncing(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (

      <GovLoader
        label="Fetching official biometric attendance from SBTET…"
        sublabel="Verifying working days, present days, and 75% exam standing"
      />
    );
  }

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const dailyRecords = (() => {
    try {
      return attendance?.dailyRecordsJson
        ? JSON.parse(attendance.dailyRecordsJson)
        : {};
    } catch {
      return {};
    }
  })();
  return (
    <>
      {syncing && (
        <GovLoader
          fullScreen
          label="Syncing live biometric attendance records from SBTET…"
        />
      )}
      <div className="space-y-4 my-4 max-w-[1200px] mx-auto font-sans">
        {/* Action Buttons */}
        <BackButton />
      <div className="flex items-center gap-2 no-print">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="bg-[#2895f1] hover:bg-[#1f80d2] text-white text-xs font-semibold px-4 py-2 rounded shadow-xs transition-colors"
        >
          {syncing ? "Syncing SBTET…" : "Sync Live Logs"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-[#00a878] hover:bg-[#008f66] text-white text-xs font-bold px-4 py-2 rounded shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>Print</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-sm no-print">
          {error}
        </div>
      )}

      {/* Main Container Sheet */}
      <div className="bg-white border border-gray-300 p-8 rounded shadow-xs print:p-0 print:border-none print:shadow-none space-y-3">
        {/* Header Section */}
        <div className="relative flex items-center justify-center min-h-[90px] mb-4">
          {/* Emblem Placeholder on Left */}
          <div className="absolute left-4 top-0 w-20 h-20 flex items-center justify-center">
            <img
              src={sbtetHeader}
              alt="SBTET Emblem"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{ display: "none" }}
              className="w-16 h-16 rounded-full border-2 border-emerald-700 bg-emerald-50 text-emerald-800 font-bold text-[10px] items-center justify-center text-center p-1"
            >
              EMBLEM LOGO
            </div>
          </div>

          {/* Centered Board Header Text */}
          <div className="text-center px-24">
            <h2 className="font-normal text-base text-gray-800 uppercase tracking-wide">
              STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA
            </h2>
            <h1 className="text-[#41947b] font-normal text-2xl tracking-wider uppercase mt-1">
              STUDENT ATTENDANCE SUMMARY
            </h1>
          </div>
        </div>

        {/* Section 1: Basic Student Info */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs text-center font-sans">
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 font-semibold">
                <th className="border border-gray-300 py-1.5 px-3 w-1/3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>PIN</th>
                <th className="border border-gray-300 py-1.5 px-3 w-1/3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>NAME</th>
                <th className="border border-gray-300 py-1.5 px-3 w-1/3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>ATTENDEEID</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="border border-gray-300 py-1.5 px-3 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {user?.pin || attendance?.studentPin || "24047-CS-023"}
                </td>
                <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {user?.fullName || "MANDALA SANATH KUMAR"}
                </td>
                <td className="border border-gray-300 py-1.5 px-3 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.summary?.AttendeeId || "1025-24052"}
                </td>
              </tr>
            </tbody>
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 font-semibold">
                <th className="border border-gray-300 py-1.5 px-3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>COLLEGE CODE</th>
                <th className="border border-gray-300 py-1.5 px-3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>BRANCH CODE</th>
                <th className="border border-gray-300 py-1.5 px-3" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>SEMESTER</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="border border-gray-300 py-1.5 px-3 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {user?.collegeCode || "047"}
                </td>
                <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {user?.branchCode || "CS"}
                </td>
                <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {user?.currentSemester || "6SEM"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Attendance Metrics */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs text-center font-sans">
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 font-semibold">
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>WORKING DAYS</th>
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>NUMBER OF DAYS PRESENT</th>
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>ATTENDANCE PERCENTAGE(%)</th>
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>ATTENDANCE CALCULATED :</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.workingDays ?? 64}
                </td>
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.presentDays ?? 60}
                </td>
                <td className="border border-gray-300 py-1.5 px-2 font-mono">
                  {attendance?.currentStandingPercentage ?? "93.75"}
                </td>
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.lastSyncedAt
                    ? new Date(attendance.lastSyncedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })
                    : "Aug 23, 2026 5:00:08 AM"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Exam Eligibility Metrics */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs text-center font-sans">
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 font-semibold">
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>
                  TOTAL WORKING DAYS CONSIDERED FOR EXAMS
                </th>
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>
                  TOTAL PRESENT DAYS CONSIDERED FOR EXAMS
                </th>
                <th className="border border-gray-300 py-1.5 px-2" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,

                }}>
                  ATTENDANCE % TO BE CONSIDERED FOR EXAMINATION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800">
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.examsWorkingDays ?? 90}
                </td>
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.presentDays ?? 60}
                </td>
                <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#555"
                }}>
                  {attendance?.examEligibilityPercentage ?? "66.67"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: 31-Day Attendance Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-[11px] font-sans text-center">
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 font-semibold">
                <th className="border border-gray-300 py-1 px-1.5 w-6" ></th>
                <th className="border border-gray-300 py-1 px-2 text-left w-20" ></th>
                {days.map((d) => (
                  <th key={d} className="border border-gray-300 py-1 px-1 font-mono text-[10px]" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,

                  }}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((month, idx) => {
                return (
                  <tr key={month} className="text-gray-800 hover:bg-gray-50">
                    <td className="border border-gray-300 py-1 px-1.5 text-center text-gray-600" style={{
                      fontFamily: "'Mulish', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#555"
                    }}>
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 py-1 px-2 text-left" style={{
                      fontFamily: "'Mulish', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#555"
                    }}>
                      {month}
                    </td>
                    {/* {days.map((d, dayIdx) => {
                      let code = "-";
                      if (month === "June") {
                        if (dayIdx >= 7 && dayIdx <= 29) {
                          code = [0, 1, 3, 4, 9, 10, 13, 16, 17].includes(dayIdx - 7)
                            ? "A"
                            : "P";
                        }
                      } else if (month === "July") {
                        code = [4, 17, 18, 24, 25].includes(dayIdx) ? "A" : "P";
                      } else if (month === "August") {
                        if (dayIdx <= 19) {
                          code = [1, 14, 19].includes(dayIdx) ? "A" : "P";
                        }
                      } */}
                    {days.map((d, dayIdx) => {
                      const code = dailyRecords[`${month}-${d}`] ?? "-";

                      // Color Logic: Absent in Red, Present in Standard Text, Other status highlighted
                      const colorClass =
                        code === "A"
                          ? "text-[#c0392b] font-bold"
                          : code === "P"
                            ? "text-gray-800"
                            : code === "H"
                              ? "text-[#2980b9] font-bold"
                              : code === "HP"
                                ? "text-[#8e44ad] font-bold"
                                : "text-gray-500";

                      return (
                        <td key={d} className={`border border-gray-300 py-1 px-1 font-mono ${colorClass}`} style={{
                          fontFamily: "'Mulish', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,

                        }}>
                          {code}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section 5: Legend & Print Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs font-normal">
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-[#41947b]">P-Present</span>
            <span className="text-[#c0392b] font-semibold">A-Absent</span>
            <span className="text-[#2980b9]">H-Holiday</span>
            <span className="text-gray-700">W-Weekend</span>
            <span className="text-[#8e44ad]">HP-HalfDay Present</span>
          </div>

          <button
            onClick={handlePrint}
            className="bg-[#00a878] hover:bg-[#008f66] text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors no-print"
          >
            Print
          </button>
        </div>
      </div>
    </div>
    </>
  );
}