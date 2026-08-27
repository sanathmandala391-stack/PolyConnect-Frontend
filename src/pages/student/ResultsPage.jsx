// import { useEffect, useState } from "react";
// import api, { apiErrorMessage } from "../../api/client";
// import { useAuth } from "../../context/AuthContext";
// import GovLoader from "../../components/GovLoader";
// import MarksCard from "../../components/MarksCard";

// export default function ResultsPage() {
//   const { user } = useAuth();
//   const [schemes, setSchemes] = useState([]);
//   const [examTypes, setExamTypes] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [examMonthYears, setExamMonthYears] = useState([]);
//   const [loadingRefs, setLoadingRefs] = useState(true);

//   const [form, setForm] = useState({
//     schemeCode: "C21",
//     schemeSbtetId: "",
//     examPassType: "Regular",
//     semYearId: "",
//     examTypeId: "1", // Mid1 by default
//     pin: user?.pin || "24047-CS-023",
//     examMonthYearId: "",
//   });

//   const [hasSearched, setHasSearched] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function loadRefs() {
//       try {
//         const [schemesRes, examTypesRes, semestersRes, examMonthYearsRes] = await Promise.all([
//           api.get("/sbtet/discovery/schemes"),
//           api.get("/sbtet/discovery/exam-types"),
//           api.get("/sbtet/discovery/semesters"),
//           api.get("/sbtet/discovery/exam-month-years"),
//         ]);
//         const sList = Array.isArray(schemesRes.data) ? schemesRes.data : [];
//         const tList = Array.isArray(examTypesRes.data) ? examTypesRes.data : [];
//         const semList = Array.isArray(semestersRes.data) ? semestersRes.data : [];
//         const myrList = Array.isArray(examMonthYearsRes.data) ? examMonthYearsRes.data : [];

//         setSchemes(sList);
//         setExamTypes(tList);
//         setSemesters(semList);
//         setExamMonthYears(myrList.filter((e) => e.active));

//         if (sList.length > 0) {
//           setForm((f) => ({
//             ...f,
//             schemeCode: sList[0].schemeCode || "C21",
//             schemeSbtetId: sList[0].sbtetSchemeId || "",
//           }));
//         }
//         if (semList.length > 0) {
//           setForm((f) => ({
//             ...f,
//             semYearId: semList[0].sbtetSchemeSemId ?? semList[0].sequenceId ?? "1",
//           }));
//         }
//         if (myrList.length > 0) {
//           setForm((f) => ({
//             ...f,
//             examMonthYearId: myrList[0].sbtetId || "",
//           }));
//         }
//       } catch (err) {
//         // Fallback default options
//       } finally {
//         setLoadingRefs(false);
//       }
//     }
//     loadRefs();
//   }, []);

//   const isSemesterExam = Number(form.examTypeId) === 5 || form.examTypeId === "Semester";

//   function update(field, value) {
//     setForm((f) => ({ ...f, [field]: value }));
//   }

//   async function handleSubmit(e) {
//     if (e) e.preventDefault();
//     setError("");
//     setResult(null);
//     setHasSearched(true);
//     setLoading(true);

//     try {
//       let res;
//       if (isSemesterExam) {
//         res = await api.get("/sbtet/results/semester", {
//           params: {
//             examMonthYearId: form.examMonthYearId || 1,
//             pin: form.pin.trim().toUpperCase(),
//             schemeId: form.schemeSbtetId || 1,
//             semYearId: form.semYearId || 1,
//             studentTypeId: 1,
//           },
//         });
//       } else {
//         res = await api.get("/sbtet/results/mid", {
//           params: {
//             examTypeId: form.examTypeId || 1,
//             pin: form.pin.trim().toUpperCase(),
//             schemeId: form.schemeSbtetId || 1,
//             semYearId: form.semYearId || 1,
//           },
//         });
//       }
//       setResult(res.data);
//     } catch (err) {
//       // In case of error / no record
//       setResult(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loadingRefs) {
//     return <GovLoader label="Loading SBTET diploma examination schemes…" />;
//   }

//   return (
//     <div className="space-y-4 my-4">
//       {/* Exact Diploma Results Form Bar from Screenshot 1 */}
//       <div className="border border-sky-300 overflow-hidden shadow-xs">
//         {/* Blue Header Bar */}
//         <div className="bg-[#3b8dbd] text-white px-4 py-2 font-sans font-bold text-sm tracking-wide">
//           Diploma Results
//         </div>

//         {/* Light Blue Form Bar (#d2eef7 / #dff0f8) */}
//         <form onSubmit={handleSubmit} className="bg-[#d5eef8] p-4 space-y-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Scheme :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.schemeCode}
//                 onChange={(e) => {
//                   const s = schemes.find((sc) => sc.schemeCode === e.target.value);
//                   update("schemeCode", e.target.value);
//                   if (s) update("schemeSbtetId", s.sbtetSchemeId);
//                 }}
//               >
//                 {schemes.length > 0 ? (
//                   schemes.map((s) => (
//                     <option key={s.id || s.schemeCode} value={s.schemeCode}>
//                       {s.schemeCode}
//                     </option>
//                   ))
//                 ) : (
//                   <>
//                     <option value="C21">C21</option>
//                     <option value="C24">C24</option>
//                     <option value="C18">C18</option>
//                   </>
//                 )}
//               </select>
//             </div>

//             {/* Exam Pass Type : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Exam Pass Type :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.examPassType}
//                 onChange={(e) => update("examPassType", e.target.value)}
//               >
//                 <option value="Regular">Regular</option>
//                 <option value="Supplementary">Supplementary</option>
//               </select>
//             </div>

//             {/* Sem & Year : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Sem & Year :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.semYearId}
//                 onChange={(e) => update("semYearId", e.target.value)}
//               >
//                 {semesters.length > 0 ? (
//                   semesters.map((sem) => (
//                     <option key={sem.id || sem.semId} value={sem.sbtetSchemeSemId ?? sem.sequenceId}>
//                       {sem.semId}
//                     </option>
//                   ))
//                 ) : (
//                   <>
//                     <option value="1">1SEM</option>
//                     <option value="2">2SEM</option>
//                     <option value="3">3SEM</option>
//                     <option value="4">4SEM</option>
//                     <option value="5">5SEM</option>
//                     <option value="6">6SEM</option>
//                   </>
//                 )}
//               </select>
//             </div>

//             {/* Exam : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Exam :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.examTypeId}
//                 onChange={(e) => update("examTypeId", e.target.value)}
//               >
//                 <option value="1">Mid1</option>
//                 <option value="2">Mid2</option>
//                 <option value="5">Semester</option>
//               </select>
//             </div>

//             {/* Pin Number : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Pin Number :</label>
//               <input
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.pin}
//                 onChange={(e) => update("pin", e.target.value.toUpperCase())}
//                 placeholder="645453 or PIN"
//                 required
//               />
//             </div>
//           </div>

//           {/* Blue Button with Down Arrow: Get Report ⬇ matching Screenshot 1 */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs transition-colors"
//             >
//               <span>Get Report</span>
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Loading state with Screenshot 4 circular dot loader */}
//       {loading && <GovLoader size={56} />}

//       {/* Empty State: Exact Reproduction of Screenshot 1 "No Result Found" with Folder Icon */}
//       {hasSearched && !loading && (!result || !result.studentWiseReport || result.studentWiseReport.length === 0) && (
//         <div className="bg-white border border-gray-200 py-16 px-4 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
//           {/* Light Gray Folder Icon from Screenshot 1 */}
//           <div className="w-14 h-14 text-slate-300 flex items-center justify-center">
//             <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
//             </svg>
//           </div>

//           {/* Exact Red Text "No Result Found" */}
//           <p className="text-red-600 font-sans font-bold text-base md:text-lg">
//             No Result Found
//           </p>
//         </div>
//       )}

//       {/* When Results Are Found: Render Official Marks Memo (Screenshots 3 & 4) */}
//       {!loading && result?.studentWiseReport?.length > 0 && (
//         <MarksCard result={result} examTypeId={form.examTypeId} />
//       )}
//     </div>
//   );
// }

























import { useEffect, useState } from "react";
import api, { apiErrorMessage } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import GovLoader from "../../components/GovLoader";
import MarksCard from "../../components/MarksCard";

export default function ResultsPage() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [examMonthYears, setExamMonthYears] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [submittedExamTypeId, setSubmittedExamTypeId] = useState("1");

  const [form, setForm] = useState({
    schemeCode: "C21",
    schemeSbtetId: "",
    examPassType: "Regular",
    semYearId: "",
    examTypeId: "1", // Mid1 by default
    pin: user?.pin || "24047-CS-023",
    examMonthYearId: "",
  });

  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRefs() {
      try {
        const [schemesRes, examTypesRes, semestersRes, examMonthYearsRes] = await Promise.all([
          api.get("/sbtet/discovery/schemes"),
          api.get("/sbtet/discovery/exam-types"),
          api.get("/sbtet/discovery/semesters"),
          api.get("/sbtet/discovery/exam-month-years"),
        ]);
        const sList = Array.isArray(schemesRes.data) ? schemesRes.data : [];
        const tList = Array.isArray(examTypesRes.data) ? examTypesRes.data : [];
        const semList = Array.isArray(semestersRes.data) ? semestersRes.data : [];
        const myrList = Array.isArray(examMonthYearsRes.data) ? examMonthYearsRes.data : [];

        setSchemes(sList);
        setExamTypes(tList);
        setSemesters(semList);
        const activeMonthYears = myrList.filter((e) => e.active);
        setExamMonthYears(activeMonthYears);

        if (sList.length > 0) {
          setForm((f) => ({
            ...f,
            schemeCode: sList[0].schemeCode || "C21",
            schemeSbtetId: sList[0].sbtetSchemeId || "",
          }));
        }
        if (semList.length > 0) {
          setForm((f) => ({
            ...f,
            semYearId: semList[0].sbtetSchemeSemId ?? semList[0].sequenceId ?? "1",
          }));
        }
        if (activeMonthYears.length > 0) {
          setForm((f) => ({
            ...f,
            examMonthYearId: activeMonthYears[0].sbtetId || "",
          }));
        }
      } catch (err) {
        // Fallback default options
      } finally {
        setLoadingRefs(false);
      }
    }
    loadRefs();
  }, []);

  const isSemesterExam = Number(form.examTypeId) === 5 || form.examTypeId === "Semester";

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setError("");
    setResult(null);
    setHasSearched(true);
    setLoading(true);

    setSubmittedExamTypeId(form.examTypeId);

    try {
      let res;
      if (isSemesterExam) {
        res = await api.get("/sbtet/results/semester", {
          params: {
            examMonthYearId: form.examMonthYearId || 1,
            pin: form.pin.trim().toUpperCase(),
            schemeId: form.schemeSbtetId || 1,
            semYearId: form.semYearId || 1,
            studentTypeId: 1,
          },
        });
      } else {
        res = await api.get("/sbtet/results/mid", {
          params: {
            examTypeId: form.examTypeId || 1,
            pin: form.pin.trim().toUpperCase(),
            schemeId: form.schemeSbtetId || 1,
            semYearId: form.semYearId || 1,
          },
        });
      }
      setResult(res.data);
    } catch (err) {
      // In case of error / no record
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  if (loadingRefs) {
    return <GovLoader label="Loading SBTET diploma examination schemes…" />;
  }

//   return (
//     <div className="space-y-4 my-4">
//       {/* Diploma Results Form Bar */}
//       <div className="overflow-hidden ">
//         {/* Blue Header Bar */}
//       <div
//   className="text-white"
//   style={{
//     color: "#ffffff",
//     fontSize: "14px",
//     fontFamily: "'Open Sans', sans-serif",
//     background: "#5ca0d3",
//     padding: "6px 9px",
//     fontWeight: 600,
//     marginTop: "0px",
//     marginBottom: "5px",
//   }}
// >
//   Diploma Results
// </div>
        

//         {/* Light Blue Form Bar */}
//         <form onSubmit={handleSubmit} className="bg-[#d5eef8] p-4 space-y-4">
//           <div className={`grid grid-cols-2 sm:grid-cols-3 ${isSemesterExam ? "md:grid-cols-6" : "md:grid-cols-5"} gap-3 text-xs`}>
//             {/* Scheme : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Scheme :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.schemeCode}
//                 onChange={(e) => {
//                   const s = schemes.find((sc) => sc.schemeCode === e.target.value);
//                   update("schemeCode", e.target.value);
//                   if (s) update("schemeSbtetId", s.sbtetSchemeId);
//                 }}
//               >
//                 {schemes.length > 0 ? (
//                   schemes.map((s) => (
//                     <option key={s.id || s.schemeCode} value={s.schemeCode}>
//                       {s.schemeCode}
//                     </option>
//                   ))
//                 ) : (
//                   <>
//                     <option value="C21">C21</option>
//                     <option value="C24">C24</option>
//                     <option value="C18">C18</option>
//                   </>
//                 )}
//               </select>
//             </div>

//             {/* Exam Pass Type : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Exam Pass Type :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.examPassType}
//                 onChange={(e) => update("examPassType", e.target.value)}
//               >
//                 <option value="Regular">Regular</option>
//                 <option value="Supplementary">Supplementary</option>
//               </select>
//             </div>

//             {/* Sem & Year : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Sem & Year :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.semYearId}
//                 onChange={(e) => update("semYearId", e.target.value)}
//               >
//                 {semesters.length > 0 ? (
//                   semesters.map((sem) => (
//                     <option key={sem.id || sem.semId} value={sem.sbtetSchemeSemId ?? sem.sequenceId}>
//                       {sem.semId}
//                     </option>
//                   ))
//                 ) : (
//                   <>
//                     <option value="1">1SEM</option>
//                     <option value="2">2SEM</option>
//                     <option value="3">3SEM</option>
//                     <option value="4">4SEM</option>
//                     <option value="5">5SEM</option>
//                     <option value="6">6SEM</option>
//                   </>
//                 )}
//               </select>
//             </div>

//             {/* Exam : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Exam :</label>
//               <select
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.examTypeId}
//                 onChange={(e) => update("examTypeId", e.target.value)}
//               >
//                 <option value="1">Mid1</option>
//                 <option value="2">Mid2</option>
//                 <option value="5">Semester</option>
//               </select>
//             </div>

//             {/* Dynamic Field: Exam Month / Year (Only visible for Semester Exams) */}
//             {isSemesterExam && (
//               <div>
//                 <label className="block text-[#0a5875] font-semibold mb-1">Exam Month / Year :</label>
//                 <select
//                   className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                   value={form.examMonthYearId}
//                   onChange={(e) => update("examMonthYearId", e.target.value)}
//                 >
//                   {examMonthYears.length > 0 ? (
//                     examMonthYears.map((myr) => (
//                       <option key={myr.sbtetId || myr.id} value={myr.sbtetId}>
//                         {myr.examYearMonth || myr.description || myr.sbtetId}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="1">APR/MAY 2024</option>
//                   )}
//                 </select>
//               </div>
//             )}

//             {/* Pin Number : */}
//             <div>
//               <label className="block text-[#0a5875] font-semibold mb-1">Pin Number :</label>
//               <input
//                 className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:ring-1 focus:ring-sky-500"
//                 value={form.pin}
//                 onChange={(e) => update("pin", e.target.value.toUpperCase())}
//                 placeholder="645453 or PIN"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
//             >
//               <span>Get Report</span>
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//               </svg>
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Loading state */}
//       {loading && <GovLoader size={56} />}

//       {/* Empty State */}
//       {hasSearched && !loading && (!result || !result.studentWiseReport || result.studentWiseReport.length === 0) && (
//         <div className="bg-white border border-gray-200 py-16 px-4 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
//           <div className="w-14 h-14 text-slate-300 flex items-center justify-center">
//             <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
//             </svg>
//           </div>
//           <p className="text-red-600 font-sans font-bold text-base md:text-lg">
//             No Result Found
//           </p>
//         </div>
//       )}

//       {/* Results View */}
//       {!loading && result?.studentWiseReport?.length > 0 && (
//         <MarksCard result={result} examTypeId={form.examTypeId} />
//       )}
//     </div>
//   );



return (
  <div
    className="space-y-4 my-4"
    style={{
      fontFamily: "'Muli', sans-serif",
    }}
  >
    {/* ADD THIS CSS BLOCK */}
 <style>{`
  @media print {
    /* Hide search forms, layout headers, and footers */
    .print\\:hidden, header, nav, footer {
      display: none !important;
    }

    /* Set tight 5mm page margins */
    @page {
      size: A4 portrait;
      margin: 5mm;
    }

    body {
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Scale down the entire marks card container to fit on one page */
    .marks-card-container {
      transform: scale(0.88);
      transform-origin: top center;
      width: 100% !important;
      margin: 0 auto !important;
    }

    /* Reduce table cell padding and font sizes for print */
    table th, table td {
      padding: 2px 3px !important;
      font-size: 10px !important;
      line-height: 1.1 !important;
    }

    /* Prevent breaking table rows across pages */
    table, tr, td, th {
      page-break-inside: avoid !important;
    }

    /* Reduce space around abbreviations */
    .abbreviations-section {
      margin-top: 6px !important;
      font-size: 9px !important;
    }
  }
`}</style>
    {/* Diploma Results Form Bar */}
    <div className="overflow-hidden print:hidden">

      {/* Blue Header Bar */}
      <div
        style={{
          color: "#ffffff",
          fontSize: "14px",
          fontFamily: "'Open Sans', sans-serif",
          background: "#5ca0d3",
          padding: "6px 9px",
          fontWeight: 600,
          marginTop: "0px",
          marginBottom: "5px",
        }}
      >
        Diploma Results
      </div>

      {/* Light Blue Form Area */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#d5eef8",
          padding: "15px",
          overflow: "hidden",
        }}
      >
        {/* =========================
            SBTET REAL ROW
        ========================== */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "-15px",
            marginLeft: "-15px",
            color: "rgb(12, 84, 96)",
            backgroundColor: "transparent",
          }}
        >

          {/* =========================
              SCHEME
          ========================== */}
          <div
            className="w-full md:w-1/6"
            style={{
              position: "relative",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                display: "inline-block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "rgb(12, 84, 96)",
              }}
            >
              Scheme :
            </label>

            <select
              value={form.schemeCode}
              onChange={(e) => {
                const s = schemes.find(
                  (sc) => sc.schemeCode === e.target.value
                );

                update("schemeCode", e.target.value);

                if (s) {
                  update("schemeSbtetId", s.sbtetSchemeId);
                }
              }}
              style={{
                display: "block",
                width: "100%",
                height: "34px",
                padding: "3.75px 7.5px",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "rgb(73, 80, 87)",
                backgroundColor: "rgb(255, 255, 255)",
                border: "0.8px solid rgb(206, 212, 218)",
                borderRadius: "4px",
                boxShadow:
                  "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                boxSizing: "border-box",
                fontFamily: "'Muli', sans-serif",
              }}
            >
              {schemes.length > 0 ? (
                schemes.map((s) => (
                  <option
                    key={s.id || s.schemeCode}
                    value={s.schemeCode}
                  >
                    {s.schemeCode}
                  </option>
                ))
              ) : (
                <>
                  <option value="C21">C21</option>
                  <option value="C24">C24</option>
                  <option value="C18">C18</option>
                </>
              )}
            </select>
          </div>

          {/* =========================
              EXAM PASS TYPE
          ========================== */}
          <div
            className="w-full md:w-1/6"
            style={{
              position: "relative",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                display: "inline-block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "rgb(12, 84, 96)",
              }}
            >
              Exam Pass Type :
            </label>

            <select
              value={form.examPassType}
              onChange={(e) =>
                update("examPassType", e.target.value)
              }
              style={{
                display: "block",
                width: "100%",
                height: "34px",
                padding: "3.75px 7.5px",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "rgb(73, 80, 87)",
                backgroundColor: "#fff",
                border: "0.8px solid rgb(206, 212, 218)",
                borderRadius: "4px",
                boxShadow:
                  "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                boxSizing: "border-box",
                fontFamily: "'Muli', sans-serif",
              }}
            >
              <option value="Regular">Regular</option>
              <option value="Supplementary">
                Supplementary
              </option>
            </select>
          </div>

          {/* =========================
              SEM & YEAR
          ========================== */}
          <div
            className="w-full md:w-1/6"
            style={{
              position: "relative",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                display: "inline-block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "rgb(12, 84, 96)",
              }}
            >
              Sem &amp; Year :
            </label>

            <select
              value={form.semYearId}
              onChange={(e) =>
                update("semYearId", e.target.value)
              }
              style={{
                display: "block",
                width: "100%",
                height: "34px",
                padding: "3.75px 7.5px",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "rgb(73, 80, 87)",
                backgroundColor: "#fff",
                border: "0.8px solid rgb(206, 212, 218)",
                borderRadius: "4px",
                boxShadow:
                  "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                boxSizing: "border-box",
                fontFamily: "'Muli', sans-serif",
              }}
            >
              {semesters.length > 0 ? (
                semesters.map((sem) => (
                  <option
                    key={sem.id || sem.semId}
                    value={
                      sem.sbtetSchemeSemId ??
                      sem.sequenceId
                    }
                  >
                    {sem.semId}
                  </option>
                ))
              ) : (
                <>
                  <option value="1">1SEM</option>
                  <option value="2">2SEM</option>
                  <option value="3">3SEM</option>
                  <option value="4">4SEM</option>
                  <option value="5">5SEM</option>
                  <option value="6">6SEM</option>
                </>
              )}
            </select>
          </div>

          {/* =========================
              EXAM
          ========================== */}
          <div
            className="w-full md:w-1/6"
            style={{
              position: "relative",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                display: "inline-block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "rgb(12, 84, 96)",
              }}
            >
              Exam :
            </label>

            <select
              value={form.examTypeId}
              onChange={(e) =>
                update("examTypeId", e.target.value)
              }
              style={{
                display: "block",
                width: "100%",
                height: "34px",
                padding: "3.75px 7.5px",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "rgb(73, 80, 87)",
                backgroundColor: "#fff",
                border: "0.8px solid rgb(206, 212, 218)",
                borderRadius: "4px",
                boxShadow:
                  "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                boxSizing: "border-box",
                fontFamily: "'Muli', sans-serif",
              }}
            >
              <option value="1">Mid1</option>
              <option value="2">Mid2</option>
              <option value="5">Semester</option>
            </select>
          </div>

          {/* =========================
              EXAM MONTH / YEAR
              SEMESTER ONLY
          ========================== */}
          {isSemesterExam && (
            <div
              className="w-full md:w-1/6"
              style={{
                position: "relative",
                paddingRight: "15px",
                paddingLeft: "15px",
                marginBottom: "15px",
              }}
            >
              <label
                style={{
                  display: "inline-block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "21px",
                  color: "rgb(12, 84, 96)",
                }}
              >
                Exam Month / Year :
              </label>

              <select
                value={form.examMonthYearId}
                onChange={(e) =>
                  update(
                    "examMonthYearId",
                    e.target.value
                  )
                }
                style={{
                  display: "block",
                  width: "100%",
                  height: "34px",
                  padding: "3.75px 7.5px",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "rgb(73, 80, 87)",
                  backgroundColor: "#fff",
                  border: "0.8px solid rgb(206, 212, 218)",
                  borderRadius: "4px",
                  boxShadow:
                    "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                  boxSizing: "border-box",
                  fontFamily: "'Muli', sans-serif",
                }}
              >
                {examMonthYears.length > 0 ? (
                  examMonthYears.map((myr) => (
                    <option
                      key={myr.sbtetId || myr.id}
                      value={myr.sbtetId}
                    >
                      {myr.examYearMonth ||
                        myr.description ||
                        myr.sbtetId}
                    </option>
                  ))
                ) : (
                  <option value="1">
                    APR/MAY 2024
                  </option>
                )}
              </select>
            </div>
          )}

          {/* =========================
              PIN NUMBER
          ========================== */}
          <div
            className="w-full md:w-1/6"
            style={{
              position: "relative",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{
                display: "inline-block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "rgb(12, 84, 96)",
              }}
            >
              Pin Number :
            </label>

            <input
              type="text"
              value={form.pin}
              onChange={(e) =>
                update(
                  "pin",
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Enter PIN"
              required
              style={{
                display: "block",
                width: "100%",
                height: "34px",
                padding: "3.75px 7.5px",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "rgb(73, 80, 87)",
                backgroundColor: "#fff",
                border: "0.8px solid rgb(206, 212, 218)",
                borderRadius: "4px",
                boxShadow:
                  "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
                boxSizing: "border-box",
                fontFamily: "'Muli', sans-serif",
              }}
            />
          </div>

        {/* =========================
    GET REPORT BUTTON
========================= */}
<div
  style={{
    width: "100%",
    flex: "0 0 100%",
    maxWidth: "100%",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginTop: "3px",
  }}
>
  <div
    style={{
      marginTop: "18px",
      textAlign: "left",
       marginLeft: "40px"
    }}
  >
    <button
      type="submit"
      disabled={loading}
      style={{
        display: "inline-block",
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(40, 134, 205)",
        border: "0.8px solid rgb(0, 123, 255)",
        padding: "2.5px 5px",
        fontSize: "16px",
        lineHeight: "24px",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        cursor: loading ? "not-allowed" : "pointer",
        textAlign: "center",
        fontFamily: "'Muli', sans-serif",
        opacity: loading ? 0.7 : 1,
      }}
    >
      Get Report
      <span style={{ marginLeft: "5px" }}>
        <i className="fa fa-arrow-down" />
      </span>
    </button>
  </div>
</div>

        </div>
      </form>
    </div>

    {/* =========================
        LOADING
    ========================== */}
    {loading && <GovLoader size={56} />}

    {/* =========================
        EMPTY STATE
    ========================== */}
    {hasSearched &&
      !loading &&
      (!result ||
        !result.studentWiseReport ||
        result.studentWiseReport.length === 0) && (
        <div className="bg-white border border-gray-200 py-16 px-4 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
          <div className="w-14 h-14 text-slate-300 flex items-center justify-center">
            <svg
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
            </svg>
          </div>

          <p className="text-red-600 font-sans font-bold text-base md:text-lg">
            No Result Found
          </p>
        </div>
      )}

    {/* =========================
        RESULTS
    ========================== */}
    {!loading &&
      result?.studentWiseReport?.length > 0 && (
        <MarksCard
          result={result}
          // examTypeId={form.examTypeId}
          examTypeId={submittedExamTypeId}
        />
      )}
  </div>
);
}