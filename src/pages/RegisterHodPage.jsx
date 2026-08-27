// import { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import api, { apiErrorMessage } from "../api/client";
// import { useAuth } from "../context/AuthContext";
// import GovLoader from "../components/GovLoader";

// export default function RegisterHodPage() {
//   const { registerHod } = useAuth();
//   const [colleges, setColleges] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [loadingRefs, setLoadingRefs] = useState(true);
//   const [refError, setRefError] = useState("");

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     rawPassword: "",
//     employeeId: "",
//     qualification: "",
//     experienceYears: "",
//     collegeCode: "",
//     branchCode: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     async function loadRefs() {
//       try {
//         const [collegesRes, branchesRes] = await Promise.all([
//           api.get("/colleges/public"),
//           api.get("/branches/public"),
//         ]);
//         setColleges(Array.isArray(collegesRes.data) ? collegesRes.data : []);
//         setBranches(Array.isArray(branchesRes.data) ? branchesRes.data : []);
//       } catch (err) {
//         setRefError(apiErrorMessage(err, "Could not load institution and branch reference data."));
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
//         fullName: form.fullName.trim(),
//         email: form.email.trim(),
//         phoneNumber: form.phoneNumber.trim(),
//         rawPassword: form.rawPassword,
//         employeeId: form.employeeId.trim(),
//         qualification: form.qualification.trim(),
//         experienceYears: Number(form.experienceYears || 0),
//       };
//       const res = await registerHod(payload, form.collegeCode, form.branchCode);
//       setSuccess(res);
//     } catch (err) {
//       setError(apiErrorMessage(err, "HOD registration failed. Please verify your details."));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (loadingRefs) {
//     return <GovLoader label="Loading registered colleges and department branches…" />;
//   }

//   if (success) {
//     return (
//       <div className="max-w-lg mx-auto gov-card p-6 md:p-8 text-center my-8 border-2 border-emerald-300">
//         <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//         <h2 className="text-gov-sage font-display font-bold text-xl mb-2">HOD Registration Submitted</h2>
//         <p className="text-sm text-gov-slate mb-4">
//           {success.message || "Your department HOD account has been registered and queued for System Admin approval."}
//         </p>
//         <div className="bg-slate-50 border border-gov-border p-3.5 rounded-sm text-xs text-left mb-6 space-y-1 font-mono">
//           <div><span className="text-gov-slate">Email:</span> <strong>{success.email || form.email}</strong></div>
//           <div><span className="text-gov-slate">Status:</span> <strong className="text-amber-700">{success.status || "PENDING"}</strong></div>
//         </div>
//         <p className="text-xs text-gov-slate mb-6">
//           Once the Admin approves your institution credentials, you can log in to manage your department roster and student registrations.
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
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//             Department HOD Registration
//           </span>
//           <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
//             Faculty Portal
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
//                 <option value="">Select College</option>
//                 {colleges.map((c) => (
//                   <option key={c.code} value={c.code}>
//                     {c.name} ({c.code})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="gov-label">Department / Branch</label>
//               <select
//                 className="gov-input"
//                 required
//                 disabled={!selectedCollege}
//                 value={form.branchCode}
//                 onChange={(e) => update("branchCode", e.target.value)}
//               >
//                 <option value="">
//                   {selectedCollege ? "Select Branch" : "Select a college first"}
//                 </option>
//                 {offeredBranches.map((b) => (
//                   <option key={b.code} value={b.code}>
//                     {b.name} ({b.code})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Name & Employee ID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Full Name</label>
//               <input
//                 className="gov-input"
//                 required
//                 placeholder="Dr. / Prof. Full Name"
//                 value={form.fullName}
//                 onChange={(e) => update("fullName", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="gov-label">Employee ID</label>
//               <input
//                 className="gov-input font-mono"
//                 required
//                 placeholder="e.g. EMP-047-HOD"
//                 value={form.employeeId}
//                 onChange={(e) => update("employeeId", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Qualification & Experience */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Highest Qualification</label>
//               <input
//                 className="gov-input"
//                 placeholder="e.g. M.Tech / Ph.D in CSE"
//                 value={form.qualification}
//                 onChange={(e) => update("qualification", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="gov-label">Teaching Experience (Years)</label>
//               <input
//                 type="number"
//                 min={0}
//                 className="gov-input"
//                 value={form.experienceYears}
//                 onChange={(e) => update("experienceYears", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Email & Phone */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="gov-label">Official Email (Used to Log In)</label>
//               <input
//                 type="email"
//                 className="gov-input"
//                 required
//                 placeholder="hod.dept@college.edu.in"
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

//           <button
//             className="gov-btn-primary w-full py-2.5 mt-2"
//             disabled={submitting || colleges.length === 0}
//           >
//             {submitting ? "Submitting Registration…" : "Submit Registration for Admin Approval"}
//           </button>

//           <p className="text-xs text-gov-slate text-center pt-2">
//             Already have an approved HOD account?{" "}
//             <Link to="/login" className="text-gov-blue font-bold hover:underline">
//               Sign In here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api, { apiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import GovLoader from "../components/GovLoader";

export default function RegisterHodPage() {
  const { registerHod } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);
  const [refError, setRefError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    rawPassword: "",
    employeeId: "",
    qualification: "",
    experienceYears: "",
    collegeCode: "",
    branchCode: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadRefs() {
      try {
        const [collegesRes, branchesRes] = await Promise.all([
          api.get("/colleges/public"),
          api.get("/branches/public"),
        ]);
        if (!isMounted) return;
        setColleges(Array.isArray(collegesRes.data) ? collegesRes.data : []);
        setBranches(Array.isArray(branchesRes.data) ? branchesRes.data : []);
      } catch (err) {
        if (isMounted) {
          setRefError(
            apiErrorMessage(
              err,
              "Could not load institution and branch reference data."
            )
          );
        }
      } 
      finally {
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
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        rawPassword: form.rawPassword,
        employeeId: form.employeeId.trim(),
        qualification: form.qualification.trim(),
        experienceYears: Number(form.experienceYears || 0),
      };
      const res = await registerHod(
        payload,
        form.collegeCode,
        form.branchCode
      );
      setSuccess(res);
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          "HOD registration failed. Please verify your details."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingRefs) {
    return (
      <GovLoader label="Loading registered colleges and department branches…" />
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-none shadow-xs my-8 overflow-hidden font-sans">
        <div className="bg-[#0b3c5d] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            HOD Registration Submitted Successfully
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#002742] px-3 py-1 text-white">
            FACULTY PORTAL
          </span>
        </div>

        <div className="p-6 text-center space-y-4 bg-white">
          <p className="text-xs md:text-sm text-gray-700">
            {success.message ||
              "Your department HOD account has been registered and queued for System Admin approval."}
          </p>

          <div className="bg-[#f0f4f8] border border-gray-300 p-4 rounded-none text-left text-xs space-y-2 font-mono">
            <div>
              <span className="text-gray-500 font-bold uppercase">Email:</span>{" "}
              <strong className="text-gray-900">{success.email || form.email}</strong>
            </div>
            <div>
              <span className="text-gray-500 font-bold uppercase">Status:</span>{" "}
              <strong className="text-amber-700 uppercase">
                {success.status || "PENDING ADMIN APPROVAL"}
              </strong>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Once the Admin approves your institution credentials, you can log in
            to manage your department roster and student registrations.
          </p>

          <div className="pt-2">
            <Link
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
        {/* Government Portal Dark Navy Header Bar */}
        <div className="bg-[#2196f3] text-white px-5 py-3 flex items-center justify-between">
          <span className="font-serif font-bold text-base md:text-lg tracking-wide flex items-center gap-2" style={{
    fontFamily: "'Mulish, sans-serif",
    fontWeight: 500
  }}>
          
            Department HOD Registration
          </span>
        
        </div>

        {/* Light Blue Form Background Container */}
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
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
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
                <option value="">Select College</option>
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
                  {selectedCollege ? "Select Branch" : "Select a college first"}
                </option>
                {offeredBranches.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Name & Employee ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                NAME OF THE HOD
              </label>
              <input
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="Dr. / Prof. Full Name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                EMPLOYEE ID
              </label>
              <input
                className="w-full bg-white border border-gray-300 p-2.5 text-xs font-mono text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="e.g. EMP-047-HOD"
                value={form.employeeId}
                onChange={(e) => update("employeeId", e.target.value)}
              />
            </div>
          </div>

          {/* Qualification & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                HIGHEST QUALIFICATION
              </label>
              <input
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                placeholder="e.g. M.Tech / Ph.D in CSE"
                value={form.qualification}
                onChange={(e) => update("qualification", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                TEACHING EXPERIENCE (YEARS)
              </label>
              <input
                type="number"
                min={0}
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                value={form.experienceYears}
                onChange={(e) => update("experienceYears", e.target.value)}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}>
                 EMAIL 
              </label>
              <input
                type="email"
                className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 rounded-none focus:outline-none focus:border-[#0b3c5d]"
                required
                placeholder="hod.dept@college.edu.in"
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

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || colleges.length === 0}
              className="w-full bg-[#2895f1] hover:bg-[#1d82d9] text-white text-xs md:text-sm font-bold py-3 transition-colors rounded-none disabled:bg-gray-400" style={{
    fontFamily: "'Muli, sans-serif",
    fontWeight: 700
  }}
            >
              {submitting
                ? "Submitting Registration…"
                : "Submit Registration for Admin Approval"}
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-xs text-gray-600 text-center pt-2">
            Already have an approved HOD account?{" "}
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
