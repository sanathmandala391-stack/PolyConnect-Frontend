import { useEffect, useState } from "react";
import axios from "axios";
import api, { apiErrorMessage } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import GovLoader from "../../components/GovLoader";
import sbtetHeader from "../../images/sb.png";
import BackButton from "../../components/BackButton";

const MONTHS = ["June", "July", "August", "September", "October"];

function parseJsonSafely(val) {
  if (!val) return null;
  if (typeof val === "object") return val;
  if (typeof val === "string") {
    try {
      const p1 = JSON.parse(val);
      if (typeof p1 === "string") {
        try {
          return JSON.parse(p1);
        } catch {
          return p1;
        }
      }
      return p1;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Fetch live Biometric Attendance Report dynamically for any given student PIN.
 * Uses backend proxy /student/attendance/live and CORS proxies as fallback.
 */
async function fetchLiveAttendanceReport(pin) {
  if (!pin) return null;
  const cleanPin = pin.trim().toUpperCase();

  // 1. Primary: Spring Boot backend proxy /student/attendance/live (server-side, avoids browser CORS)
  try {
    const res = await api.get("/student/attendance/live");
    const data = parseJsonSafely(res.data);
    if (data?.Table && Array.isArray(data.Table) && data.Table.length > 0) {
      return data;
    }
    if (data?.rawResponse) {
      const pRaw = parseJsonSafely(data.rawResponse);
      if (pRaw?.Table && Array.isArray(pRaw.Table) && pRaw.Table.length > 0) {
        return pRaw;
      }
    }
  } catch (err) {
    console.warn("Backend live proxy attendance call failed, attempting CORS proxy:", err?.message || err);
  }

  // 2. Secondary: CORS-proxied direct SBTET API fetch
  const sbtetUrl = `https://www.sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin=${encodeURIComponent(cleanPin)}`;

  try {
    const corsRes = await axios.get(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(sbtetUrl)}`,
      { timeout: 8000 }
    );
    const data = parseJsonSafely(corsRes.data);
    if (data?.Table && Array.isArray(data.Table) && data.Table.length > 0) {
      return data;
    }
  } catch (err) {
    // Continue to next fallback
  }

  try {
    const corsRes2 = await axios.get(
      `https://corsproxy.io/?${encodeURIComponent(sbtetUrl)}`,
      { timeout: 8000 }
    );
    const data = parseJsonSafely(corsRes2.data);
    if (data?.Table && Array.isArray(data.Table) && data.Table.length > 0) {
      return data;
    }
  } catch (err) {}

  return null;
}

export default function AttendancePage() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState(null);
  const [liveReport, setLiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const currentPin = user?.pin || user?.username || "";

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const [attRes, liveData] = await Promise.allSettled([
          api.get("/student/attendance"),
          currentPin ? fetchLiveAttendanceReport(currentPin) : Promise.resolve(null),
        ]);

        if (!isMounted) return;

        if (attRes.status === "fulfilled" && attRes.value?.data) {
          setAttendance(attRes.value.data);
        }
        if (liveData.status === "fulfilled" && liveData.value) {
          setLiveReport(liveData.value);
        }
      } catch (err) {
        if (isMounted) {
          setError(apiErrorMessage(err, "Could not load attendance summary."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();

    return () => {
      isMounted = false;
    };
  }, [currentPin]);

  async function handleSync() {
    setSyncing(true);
    setError("");
    try {
      const liveData = currentPin ? await fetchLiveAttendanceReport(currentPin) : null;
      if (liveData) {
        setLiveReport(liveData);
      }
      const sumRes = await api.get("/student/attendance");
      if (sumRes?.data) {
        setAttendance(sumRes.data);
      }
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

  // Extract student details from live report Table[0] or fallback to backend attendance entity
  const sbtetSummary = (() => {
    // 1. Check liveReport
    const parsedLive = parseJsonSafely(liveReport);
    if (parsedLive?.Table && Array.isArray(parsedLive.Table) && parsedLive.Table.length > 0) {
      return parsedLive.Table[0];
    }
    if (parsedLive?.rawResponse) {
      const pRaw = parseJsonSafely(parsedLive.rawResponse);
      if (pRaw?.Table?.[0]) return pRaw.Table[0];
    }

    // 2. Check attendance
    const parsedAtt = parseJsonSafely(attendance);
    if (parsedAtt?.Table && Array.isArray(parsedAtt.Table) && parsedAtt.Table.length > 0) {
      return parsedAtt.Table[0];
    }
    if (parsedAtt?.rawResponse) {
      const pRaw = parseJsonSafely(parsedAtt.rawResponse);
      if (pRaw?.Table?.[0]) return pRaw.Table[0];
    }
    if (parsedAtt?.summaryJson) {
      const pSum = parseJsonSafely(parsedAtt.summaryJson);
      if (pSum?.Table?.[0]) return pSum.Table[0];
      if (pSum?.AttendeeId || pSum?.Semester) return pSum;
    }

    return null;
  })();

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  // Parse daily attendance records from Table1 or attendance.dailyRecordsJson
  const dailyRecords = (() => {
    const records = {};

    const findTable1 = (obj) => {
      const parsed = parseJsonSafely(obj);
      if (parsed?.Table1 && Array.isArray(parsed.Table1)) return parsed.Table1;
      if (parsed?.rawResponse) {
        const pRaw = parseJsonSafely(parsed.rawResponse);
        if (pRaw?.Table1 && Array.isArray(pRaw.Table1)) return pRaw.Table1;
      }
      return null;
    };

    const table1 = findTable1(liveReport) || findTable1(attendance);

    if (Array.isArray(table1)) {
      table1.forEach((row) => {
        const month = row.AttendanceMonth || row.month;
        const day = String(row.Day || row.day || "").padStart(2, "0");
        const status = row.Status || row.status || "-";
        if (month && day) {
          records[`${month}-${day}`] = status;
        }
      });
    }

    // Merge with attendance?.dailyRecordsJson if present
    const parsedDaily = parseJsonSafely(attendance?.dailyRecordsJson);
    if (parsedDaily && typeof parsedDaily === "object") {
      Object.assign(records, parsedDaily);
    }

    return records;
  })();

  if (loading) {
    return (
      <GovLoader
        label="Fetching official biometric attendance from SBTET…"
        sublabel="Verifying working days, present days, and 75% exam standing"
      />
    );
  }

  // Computed field values
  const studentPin = sbtetSummary?.Pin || user?.pin || attendance?.studentPin || "—";
  const studentName = sbtetSummary?.Name || user?.fullName || "—";
  const attendeeId = sbtetSummary?.AttendeeId || attendance?.attendeeId || attendance?.summary?.AttendeeId || user?.attendeeId || "—";
  const collegeCode = sbtetSummary?.CollegeCode || user?.collegeCode || (studentPin !== "—" ? studentPin.slice(0, 5).replace(/^[0-9]{2}/, "") : "") || "—";
  const branchCode = sbtetSummary?.BranchCode || user?.branchCode || (studentPin !== "—" && studentPin.includes("-") ? studentPin.split("-")?.[1] : "") || "—";
  const semester = sbtetSummary?.Semester || (sbtetSummary?.semid ? `${sbtetSummary.semid}SEM` : null) || (attendance?.semester ? (String(attendance.semester).toUpperCase().endsWith("SEM") ? String(attendance.semester).toUpperCase() : `${attendance.semester}SEM`) : (user?.currentSemester ? (String(user.currentSemester).toUpperCase().endsWith("SEM") ? String(user.currentSemester).toUpperCase() : `${user.currentSemester}SEM`) : "—"));

  const workingDays = sbtetSummary?.WorkingDays != null ? sbtetSummary.WorkingDays : (attendance?.workingDays ?? "—");
  const presentDays = sbtetSummary?.NumberOfDaysPresent != null ? sbtetSummary.NumberOfDaysPresent : (attendance?.presentDays ?? "—");
  const attendancePercentage = sbtetSummary?.Percentage != null ? Number(sbtetSummary.Percentage).toFixed(2) : (attendance?.currentStandingPercentage != null ? Number(attendance.currentStandingPercentage).toFixed(2) : "—");

  const calculatedDate = (sbtetSummary?.UpdatedDate || attendance?.lastSyncedAt)
    ? new Date(sbtetSummary?.UpdatedDate || attendance?.lastSyncedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
    : "—";

  const totalWorkingDaysExams = sbtetSummary?.ExamsWorkingDays != null ? sbtetSummary.ExamsWorkingDays : (sbtetSummary?.TotalWorkingDays != null ? sbtetSummary.TotalWorkingDays : (attendance?.examsWorkingDays ?? 90));
  const totalPresentDaysExams = sbtetSummary?.ExamsNDP != null ? sbtetSummary.ExamsNDP : (sbtetSummary?.NumberOfDaysPresent != null ? sbtetSummary.NumberOfDaysPresent : (attendance?.presentDays ?? "—"));
  const examAttendancePercentage = sbtetSummary?.ExamsPer != null ? Number(sbtetSummary.ExamsPer).toFixed(2) : (sbtetSummary?.TotalPercentage != null ? Number(sbtetSummary.TotalPercentage).toFixed(2) : (attendance?.examEligibilityPercentage != null ? Number(attendance.examEligibilityPercentage).toFixed(2) : "—"));

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
            {/* Emblem on Left */}
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
                    {studentPin}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {studentName}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-3 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {attendeeId}
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
                    {collegeCode}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {branchCode}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-3 uppercase" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {semester}
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
                    {workingDays}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {presentDays}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {attendancePercentage}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {calculatedDate}
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
                    {totalWorkingDaysExams}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {totalPresentDaysExams}
                  </td>
                  <td className="border border-gray-300 py-1.5 px-2 font-mono" style={{
                    fontFamily: "'Mulish', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#555"
                  }}>
                    {examAttendancePercentage}
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
                  <th className="border border-gray-300 py-1 px-1.5 w-6"></th>
                  <th className="border border-gray-300 py-1 px-2 text-left w-20"></th>
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
                      {days.map((d) => {
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