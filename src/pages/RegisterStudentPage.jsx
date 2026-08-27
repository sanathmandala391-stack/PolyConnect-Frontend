// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import api, { apiErrorMessage } from "../api/client";
// import { useAuth } from "../context/AuthContext";
// import GovLoader from "../components/GovLoader";

// export default function RegisterStudentPage() {
//   const { registerStudent } = useAuth();
//   const [colleges, setColleges] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [schemes, setSchemes] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [loadingRefs, setLoadingRefs] = useState(true);
//   const [refError, setRefError] = useState("");

//   const [form, setForm] = useState({
//     pin: "",
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     rawPassword: "",
//     collegeCode: "",
//     branchCode: "",
//     schemeCode: "",
//     currentSemester: "",
//     admissionYear: new Date().getFullYear(),
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     async function loadRefs() {
//       try {
//         const [collegesRes, branchesRes, schemesRes, semestersRes] = await Promise.all([
//           api.get("/colleges/public"),
//           api.get("/branches/public"),
//           api.get("/sbtet/discovery/schemes"),
//           api.get("/sbtet/discovery/semesters"),
//         ]);
//         setColleges(Array.isArray(collegesRes.data) ? collegesRes.data : []);
//         setBranches(Array.isArray(branchesRes.data) ? branchesRes.data : []);
//         setSchemes(Array.isArray(schemesRes.data) ? schemesRes.data : []);
//         setSemesters(Array.isArray(semestersRes.data) ? semestersRes.data : []);
//       } catch (err) {
//         setRefError(apiErrorMessage(err, "Could not load registration reference data from the backend."));
//       } finally {
//         setLoadingRefs(false);
//       }
//     }
//     loadRefs();
//   }, []);

//   const selectedCollege = useMemo(
//     () => colleges.find((c) => c.code === form.collegeCode),
//     [colleges, form.collegeCode]
//   );

//   // Only branches offered by the selected college are displayed
//   const offeredBranches = useMemo(() => {
//     if (!selectedCollege) return [];
//     const codes = new Set(selectedCollege.branchCodes || []);
//     return branches.filter((b) => codes.has(b.code));
//   }, [selectedCollege, branches]);

//   function update(field, value) {
//     setForm((f) => ({ ...f, [field]: value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
//     try {
//       const payload = {
//         pin: form.pin.trim().toUpperCase(),
//         fullName: form.fullName.trim(),
//         email: form.email.trim(),
//         phoneNumber: form.phoneNumber.trim(),
//         rawPassword: form.rawPassword,
//         schemeCode: form.schemeCode,
//         currentSemester: form.currentSemester,
//         admissionYear: Number(form.admissionYear),
//       };
//       const res = await registerStudent(payload, form.collegeCode, form.branchCode);
//       setSuccess(res);
//     } catch (err) {
//       setError(apiErrorMessage(err, "Student registration failed. Please verify your details."));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (loadingRefs) {
//     return <GovLoader label="Loading official institutions and academic branches…" />;
//   }

//   if (success) {
//     return (
//       <div className="max-w-lg mx-auto gov-card p-6 md:p-8 text-center my-8 border-2 border-emerald-300">
//         <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//         <h2 className="text-gov-sage font-display font-bold text-xl mb-2">Registration Submitted Successfully</h2>
//         <p className="text-sm text-gov-slate mb-4">
//           {success.message || "Your student account registration has been submitted to your department HOD for verification."}
//         </p>
//         <div className="bg-slate-50 border border-gov-border p-3.5 rounded-sm text-xs text-left mb-6 space-y-1 font-mono">
//           <div><span className="text-gov-slate">PIN:</span> <strong>{success.pin || form.pin}</strong></div>
//           <div><span className="text-gov-slate">Status:</span> <strong className="text-amber-700">{success.status || "PENDING"}</strong></div>
//         </div>
//         <p className="text-xs text-gov-slate mb-6">
//           Once your department HOD verifies and approves your account, you will be able to log in using your PIN and password.
//         </p>
//         <Link to="/login" className="gov-btn-primary w-full">
//           Proceed to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto my-6">
//       <div className="gov-card overflow-hidden border-2 border-gov-navy/20">
//         <div className="gov-title-bar">
//           <span className="flex items-center gap-2">
//             <svg className="w-5 h-5 text-gov-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//             Student Account Registration
//           </span>
//           <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
//             Telangana Polytechnic
//           </span>
//         </div>

//         <form onSubmit={handleSubmit} className="gov-form-box space-y-4">
//           {refError && (
//             <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm">
//               {refError}
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm">
//               {error}
//             </div>
//           )}

//           {/* College and Branch Selection */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Institution / College</label>
//               <select
//                 className="gov-input"
//                 required
//                 value={form.collegeCode}
//                 onChange={(e) => {
//                   update("collegeCode", e.target.value);
//                   update("branchCode", "");
//                 }}
//               >
//                 <option value="">Select Polytechnic College</option>
//                 {colleges.map((c) => (
//                   <option key={c.code} value={c.code}>
//                     {c.name} ({c.code})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="gov-label">Branch / Department</label>
//               <select
//                 className="gov-input"
//                 required
//                 disabled={!selectedCollege}
//                 value={form.branchCode}
//                 onChange={(e) => update("branchCode", e.target.value)}
//               >
//                 <option value="">
//                   {selectedCollege ? "Select Offered Branch" : "Select a college first"}
//                 </option>
//                 {offeredBranches.map((b) => (
//                   <option key={b.code} value={b.code}>
//                     {b.name} ({b.code})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* PIN & Name */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Official Student PIN</label>
//               <input
//                 className="gov-input font-mono uppercase"
//                 placeholder="e.g. 24047-CS-023"
//                 required
//                 value={form.pin}
//                 onChange={(e) => update("pin", e.target.value.toUpperCase())}
//               />
//               <p className="text-[10px] text-gov-slate mt-0.5">
//                 Must match your 3-digit college code and 2-letter branch code.
//               </p>
//             </div>

//             <div>
//               <label className="gov-label">Full Name (As per SSC / Records)</label>
//               <input
//                 className="gov-input"
//                 required
//                 placeholder="Full Name"
//                 value={form.fullName}
//                 onChange={(e) => update("fullName", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Contact Details */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Email Address</label>
//               <input
//                 type="email"
//                 className="gov-input"
//                 required
//                 placeholder="student@example.com"
//                 value={form.email}
//                 onChange={(e) => update("email", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="gov-label">Mobile Number</label>
//               <input
//                 type="tel"
//                 className="gov-input"
//                 required
//                 placeholder="9876543210"
//                 value={form.phoneNumber}
//                 onChange={(e) => update("phoneNumber", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="gov-label">Account Password</label>
//             <input
//               type="password"
//               className="gov-input"
//               required
//               minLength={6}
//               placeholder="Minimum 6 characters"
//               value={form.rawPassword}
//               onChange={(e) => update("rawPassword", e.target.value)}
//             />
//           </div>

//           {/* Academic Info: Scheme, Semester, Admission Year */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
//             <div>
//               <label className="gov-label">Curriculum Scheme</label>
//               <select
//                 className="gov-input"
//                 required
//                 value={form.schemeCode}
//                 onChange={(e) => update("schemeCode", e.target.value)}
//               >
//                 <option value="">Select Scheme</option>
//                 {schemes.map((s) => (
//                   <option key={s.schemeCode || s.id} value={s.schemeCode}>
//                     {s.schemeCode}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="gov-label">Current Semester</label>
//               <select
//                 className="gov-input"
//                 required
//                 value={form.currentSemester}
//                 onChange={(e) => update("currentSemester", e.target.value)}
//               >
//                 <option value="">Select Sem</option>
//                 {semesters.map((s) => (
//                   <option key={s.semId || s.id} value={s.semId}>
//                     {s.semId}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="gov-label">Admission Year</label>
//               <input
//                 type="number"
//                 className="gov-input"
//                 required
//                 min={2018}
//                 max={2030}
//                 value={form.admissionYear}
//                 onChange={(e) => update("admissionYear", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             className="gov-btn-primary w-full py-2.5 mt-2"
//             disabled={submitting || colleges.length === 0}
//           >
//             {submitting ? "Submitting Registration…" : "Submit Registration for HOD Approval"}
//           </button>

//           <p className="text-xs text-gov-slate text-center pt-2">
//             Already have an approved student account?{" "}
//             <Link to="/login" className="text-gov-blue font-bold hover:underline">
//               Sign In here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }






































































































































































import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import GovLoader from "../components/GovLoader";

export default function RegisterStudentPage() {
  const { registerStudent } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [refError, setRefError] = useState("");

  const [form, setForm] = useState({
    pin: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    rawPassword: "",
    collegeCode: "",
    branchCode: "",
    schemeCode: "",
    currentSemester: "",
    admissionYear: new Date().getFullYear(),
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadRefs() {
      try {
        const [collegesRes, branchesRes, schemesRes, semestersRes] =
          await Promise.all([
            api.get("/colleges/public"),
            api.get("/branches/public"),
            api.get("/sbtet/discovery/schemes"),
            api.get("/sbtet/discovery/semesters"),
          ]);
        if (!isMounted) return;
        setColleges(Array.isArray(collegesRes.data) ? collegesRes.data : []);
        setBranches(Array.isArray(branchesRes.data) ? branchesRes.data : []);
        setSchemes(Array.isArray(schemesRes.data) ? schemesRes.data : []);
        setSemesters(
          Array.isArray(semestersRes.data) ? semestersRes.data : []
        );
      } catch (err) {
        if (isMounted) {
          setRefError(
            apiErrorMessage(
              err,
              "Could not load registration reference data from the backend."
            )
          );
        }
      } finally {
        if (isMounted) setLoadingRefs(false);
      }
    }
    loadRefs();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCollege = useMemo(
    () => colleges.find((c) => c.code === form.collegeCode),
    [colleges, form.collegeCode]
  );

  // Only branches offered by the selected college are displayed
  const offeredBranches = useMemo(() => {
    if (!selectedCollege) return [];
    const codes = new Set(selectedCollege.branchCodes || []);
    return branches.filter((b) => codes.has(b.code));
  }, [selectedCollege, branches]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        pin: form.pin.trim().toUpperCase(),
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        rawPassword: form.rawPassword,
        schemeCode: form.schemeCode,
        currentSemester: form.currentSemester,
        admissionYear: Number(form.admissionYear),
      };
      const res = await registerStudent(
        payload,
        form.collegeCode,
        form.branchCode
      );
      setSuccess(res);
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          "Student registration failed. Please verify your details."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingRefs) {
    return (
      <GovLoader label="Loading official institutions and academic branches…" />
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-none shadow-xs my-8 overflow-hidden font-sans">
        <div className="bg-[#0b3c5d] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
           
            Registration Submitted Successfully
          </span>
         
        </div>

        <div className="p-6 text-center space-y-4 bg-white">
          <p className="text-xs md:text-sm text-gray-700">
            {success.message ||
              "Your student account registration has been submitted to your department HOD for verification."}
          </p>

          <div className="bg-[#f0f4f8] border border-gray-300 p-4 rounded-none text-left text-xs space-y-2 font-mono">
            <div>
              <span className="text-gray-500 font-bold uppercase" style={{fontFamily: "Mulish"}}>
                Student PIN:
              </span>{" "}
              <strong className="text-gray-900" style={{fontFamily: "Mulish,sans-serif"}}>{success.pin || form.pin}</strong>
            </div>
            <div>
              <span className="text-gray-500 font-bold uppercase" style={{fontFamily: "Mulish"}}>
                Status:
              </span>{" "}
              <strong className="text-amber-700 uppercase" style={{fontFamily: "Mulish,sans-serif"}}>
                {success.status || "PENDING HOD APPROVAL"}
              </strong>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Once your department HOD verifies and approves your account, you will
            be able to log in using your PIN and password.
          </p>

          <div className="pt-2" style={{fontFamily: "Mulish,sans-serif"}}>
            <Link style={{fontFamily: "Mulish,sans-serif",fontSize: "12px"}}
              to="/login"
              className="inline-block w-full bg-[#2895f1] hover:bg-[#1d82d9] text-white text-xs font-bold py-2.5 uppercase tracking-wider transition-colors rounded-none text-center"
            >
              Proceed to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-2 font-sans">
      <div className="bg-white border border-gray-300 shadow-xs rounded-none overflow-hidden">
        {/* Government Portal Header Bar */}
        <div className="bg-[#2196f3] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-serif font-bold text-base md:text-lg tracking-wide flex items-center gap-2"      style={{
    fontFamily: "'Mulish, sans-serif",
    fontWeight: 500
  }}>
          
            Student Account Registration
          </span>
        
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-[#f0f4f8] p-6 space-y-5">
          {refError && (
            <div className="bg-red-50 border border-red-300 text-red-800 text-xs p-3 rounded-none">
              {refError}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 text-xs p-3 rounded-none">
              {error}
            </div>
          )}

          {/* College and Branch Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5"     style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                 COLLEGE
              </label>
              <select
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                value={form.collegeCode}
                onChange={(e) => {
                  update("collegeCode", e.target.value);
                  update("branchCode", "");
                }}
              >
                <option value="">Select Polytechnic College</option>
                {colleges.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                BRANCH 
              </label>
              <select
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 rounded-none focus:outline-none focus:border-[#0b3c5d] disabled:bg-gray-100 disabled:text-gray-400"
                required
                disabled={!selectedCollege}
                value={form.branchCode}
                onChange={(e) => update("branchCode", e.target.value)}
              >
                <option value="">
                  {selectedCollege
                    ? "Select Offered Branch"
                    : "Select a college first"}
                </option>
                {offeredBranches.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PIN & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                 STUDENT PIN
              </label>
              <input
                className="w-full bg-white border border-gray-300 p-2.5 text-xs font-mono uppercase text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                placeholder="E.G. 24047-CS-023"
                required
                value={form.pin}
                onChange={(e) => update("pin", e.target.value.toUpperCase())}
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Must match your 3-digit college code and 2-letter branch code.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                STUDENT NAME
              </label>
              <input
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="student@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                MOBILE NUMBER
              </label>
              <input
                type="tel"
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="9876543210"
                value={form.phoneNumber}
                onChange={(e) => update("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
              ACCOUNT PASSWORD
            </label>
            <input
              type="password"
              className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              value={form.rawPassword}
              onChange={(e) => update("rawPassword", e.target.value)}
            />
          </div>

          {/* Academic Info: Scheme, Semester, Admission Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                CURRICULUM SCHEME
              </label>
              <select
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                value={form.schemeCode}
                onChange={(e) => update("schemeCode", e.target.value)}
              >
                <option value="">Select Scheme</option>
                {schemes.map((s) => (
                  <option key={s.schemeCode || s.id} value={s.schemeCode}>
                    {s.schemeCode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                CURRENT SEMESTER
              </label>
              <select
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                value={form.currentSemester}
                onChange={(e) => update("currentSemester", e.target.value)}
              >
                <option value="">Select Sem</option>
                {semesters.map((s) => (
                  <option key={s.semId || s.id} value={s.semId}>
                    {s.semId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                ADMISSION YEAR
              </label>
              <input
                type="number"
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                min={2018}
                max={2030}
                value={form.admissionYear}
                onChange={(e) => update("admissionYear", e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || colleges.length === 0}
              className="w-full bg-[#2895f1] hover:bg-[#1d82d9] text-white text-xs md:text-sm font-bold py-3 transition-colors rounded-none disabled:bg-gray-400" style={{
    fontFamily: "'Mulish, sans-serif",
    fontWeight: 500
  }}
            >
              {submitting
                ? "Submitting Registration…"
                : "Submit Registration for HOD Approval"}
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-xs text-gray-600 text-center pt-2">
            Already have an approved student account?{" "}
            <Link
              to="/login"
              className="text-[#2196f3] font-bold hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}