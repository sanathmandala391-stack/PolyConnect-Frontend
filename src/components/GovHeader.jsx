// import { useState, useRef, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTextSize } from "../context/TextSizeContext";

// export default function GovHeader() {
//   const { user, logout } = useAuth();
//   const { size, increase, decrease, reset } = useTextSize();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [studentDropdown, setStudentDropdown] = useState(false);
//   const [collegeDropdown, setCollegeDropdown] = useState(false);
//   const [othersDropdown, setOthersDropdown] = useState(false);
//   const [moreDropdown, setMoreDropdown] = useState(false);

//   const studentRef = useRef(null);
//   const collegeRef = useRef(null);
//   const othersRef = useRef(null);
//   const moreRef = useRef(null);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setStudentDropdown(false);
//     setCollegeDropdown(false);
//     setOthersDropdown(false);
//     setMoreDropdown(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (studentRef.current && !studentRef.current.contains(e.target)) setStudentDropdown(false);
//       if (collegeRef.current && !collegeRef.current.contains(e.target)) setCollegeDropdown(false);
//       if (othersRef.current && !othersRef.current.contains(e.target)) setOthersDropdown(false);
//       if (moreRef.current && !moreRef.current.contains(e.target)) setMoreDropdown(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm no-print">
//       {/* 1. Official Institutional Top Header (Matches Screenshot 2) */}
//       <div className="bg-white py-2 px-4 border-b border-gov-border">
//         <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
//           {/* Left: State Board of Technical Education Emblem & Title */}
//           <Link to="/" className="flex items-center gap-3 shrink-0">
//             <div className="w-14 h-14 rounded-full bg-white border-2 border-gov-navy flex items-center justify-center p-1 shadow-sm shrink-0">
//               <svg className="w-10 h-10 text-gov-navy" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm4 9c0 1.5-2.67 2.25-4 2.25s-4-.75-4-2.25c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5z" />
//               </svg>
//             </div>
//             <div>
//               <div className="font-display font-black text-xs sm:text-sm md:text-base text-gov-navy leading-tight uppercase tracking-tight">
//                 STATE BOARD OF TECHNICAL EDUCATION AND TRAINING
//               </div>
//               <div className="font-display font-bold text-xs sm:text-sm text-gov-blue tracking-wide uppercase">
//                 TELANGANA &mdash; POLYCONNECT SERVICES
//               </div>
//             </div>
//           </Link>

//           {/* Center: 3 Image Placeholders from Screenshot 2 */}
//           <div className="hidden xl:flex items-center gap-6 my-auto">
//             {/* Image Placeholder 1: Telangana Rising / State Emblem */}
//             <div className="flex flex-col items-center">
//               <div className="w-12 h-12 rounded-full border border-gray-300 bg-slate-50 flex items-center justify-center overflow-hidden shadow-xs">
//                 <svg className="w-8 h-8 text-gov-blue" viewBox="0 0 100 100" fill="currentColor">
//                   <circle cx="50" cy="50" r="40" fill="none" stroke="#1b75bb" strokeWidth="6" />
//                   <path d="M50,20 L50,80 M20,50 L80,50" stroke="#00875a" strokeWidth="6" />
//                 </svg>
//               </div>
//               <span className="text-[9px] font-bold text-gov-slate uppercase mt-1 text-center">
//                 Telangana Rising
//               </span>
//             </div>

//             {/* Image Placeholder 2: Smt. A. Sridevasena, IAS (CHAIRPERSON) */}
//             <div className="flex flex-col items-center">
//               <div className="w-12 h-12 rounded-full border border-gray-300 bg-slate-100 flex items-center justify-center overflow-hidden shadow-xs">
//                 <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                 </svg>
//               </div>
//               <span className="text-[10px] font-bold text-gov-navy mt-1 leading-tight">
//                 Smt. A. Sridevasena, IAS
//               </span>
//               <span className="text-[8px] font-extrabold text-gov-slate uppercase">
//                 CHAIRPERSON
//               </span>
//             </div>

//             {/* Image Placeholder 3: Er A Pullaiah (SECRETARY) */}
//             <div className="flex flex-col items-center">
//               <div className="w-12 h-12 rounded-full border border-gray-300 bg-slate-100 flex items-center justify-center overflow-hidden shadow-xs">
//                 <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                 </svg>
//               </div>
//               <span className="text-[10px] font-bold text-gov-navy mt-1 leading-tight">
//                 Er A Pullaiah
//               </span>
//               <span className="text-[8px] font-extrabold text-gov-slate uppercase">
//                 SECRETARY
//               </span>
//             </div>
//           </div>

//           {/* Right: Contact info, Social links, Mobile App, Font Resizers */}
//           <div className="flex flex-col items-end gap-1.5 text-xs text-gov-slate ml-auto">
//             {/* Top row: A- / A+ / A accessibility controls */}
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={decrease}
//                 disabled={size === "sm"}
//                 title="Decrease font size"
//                 className="w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold text-gov-navy hover:bg-gov-lightblue disabled:opacity-30"
//               >
//                 A-
//               </button>
//               <button
//                 onClick={increase}
//                 disabled={size === "lg"}
//                 title="Increase font size"
//                 className="w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold text-gov-navy hover:bg-gov-lightblue disabled:opacity-30"
//               >
//                 A+
//               </button>
//               <button
//                 onClick={reset}
//                 title="Default font size"
//                 className={`w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold ${
//                   size === "md" ? "bg-gov-blue text-white" : "text-gov-navy hover:bg-gov-lightblue"
//                 }`}
//               >
//                 A
//               </button>
//             </div>

//             {/* Middle Row: Contact & Working Days info */}
//             <div className="hidden sm:flex items-center gap-3 text-[11px] text-gov-ink font-medium">
//               <span className="flex items-center gap-1">
//                 <svg className="w-3.5 h-3.5 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 sbtet-helpdesk@telangana.gov.in
//               </span>
//               <span>&bull;</span>
//               <span className="flex items-center gap-1 font-bold text-gov-navy">
//                 <svg className="w-3.5 h-3.5 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 08031404549
//               </span>
//             </div>

//             {/* Bottom Row: Working Hours & Social */}
//             <div className="hidden md:flex items-center gap-2 text-[10px] text-gov-slate">
//               <span>All Working days: 10:30AM to 05:00PM</span>
//               <div className="flex items-center gap-1 ml-1">
//                 <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[9px] font-bold">f</span>
//                 <span className="w-4 h-4 rounded-full bg-[#1da1f2] text-white flex items-center justify-center text-[9px] font-bold">t</span>
//               </div>
//               <span className="text-gov-blue font-bold ml-1 cursor-pointer hover:underline flex items-center gap-1">
//                 ▶ Download Mobile App
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Main Blue Horizontal Navigation Bar (Exact Screenshot 2 Structure) */}
//       <nav className="bg-[#1b75bb] text-white shadow-md border-t border-[#13578c]">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
//           <div className="hidden lg:flex items-center space-x-0.5">
//             {/* Home Icon */}
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   isActive ? "bg-[#13578c] text-white" : "hover:bg-[#13578c]"
//                 }`
//               }
//             >
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//             </NavLink>

//             {/* STUDENT SERVICES ∨ */}
//             <div className="relative" ref={studentRef}>
//               <button
//                 onClick={() => {
//                   setStudentDropdown(!studentDropdown);
//                   setCollegeDropdown(false);
//                   setOthersDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   studentDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>STUDENT SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {studentDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/student/results" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Examination Results (Mid & Sem)
//                   </Link>
//                   <Link to="/student/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Attendance Summary & 31-Day Sheet
//                   </Link>
//                   <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Doubt Solver AI (ChatBot)
//                   </Link>
//                   <Link to="/student/seniors" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Senior Connect (1-on-1 Mentorship)
//                   </Link>
//                   <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Polytechnic Community Forums
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* COLLEGE SERVICES ∨ */}
//             <div className="relative" ref={collegeRef}>
//               <button
//                 onClick={() => {
//                   setCollegeDropdown(!collegeDropdown);
//                   setStudentDropdown(false);
//                   setOthersDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   collegeDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>COLLEGE SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {collegeDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/hod/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department HOD Dashboard
//                   </Link>
//                   <Link to="/hod/approvals" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Student Registration Approvals
//                   </Link>
//                   <Link to="/hod/students" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department Students Roster
//                   </Link>
//                   <Link to="/hod/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department Attendance Register
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* OTHERS SERVICES ∨ */}
//             <div className="relative" ref={othersRef}>
//               <button
//                 onClick={() => {
//                   setOthersDropdown(!othersDropdown);
//                   setStudentDropdown(false);
//                   setCollegeDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   othersDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>OTHERS SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {othersDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Official Circulars & Timetables
//                   </Link>
//                   <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     AI Doubt Solver Assistant
//                   </Link>
//                   <Link to="/admin/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     System Administration Panel
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* AFFILIATED COLLEGES ∨ */}
//             <NavLink
//               to="/admin/colleges"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
//                   isActive ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`
//               }
//             >
//               AFFILIATED COLLEGES
//             </NavLink>

//             {/* COURSES ∨ */}
//             <NavLink
//               to="/circulars"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
//                   isActive ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`
//               }
//             >
//               COURSES
//             </NavLink>

//             {/* CONTACT-US */}
//             <a
//               href="#contact-us"
//               className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#13578c] transition-colors"
//             >
//               CONTACT-US
//             </a>

//             {/* MORE ∨ */}
//             <div className="relative" ref={moreRef}>
//               <button
//                 onClick={() => {
//                   setMoreDropdown(!moreDropdown);
//                   setStudentDropdown(false);
//                   setCollegeDropdown(false);
//                   setOthersDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   moreDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>MORE</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {moreDropdown && (
//                 <div className="absolute right-0 mt-0.5 w-52 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Statewide Community
//                   </Link>
//                   <Link to="/register/student" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Student Registration
//                   </Link>
//                   <Link to="/register/hod" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     HOD Registration
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* LOGIN / USER Button on Right */}
//           <div className="flex items-center gap-2 py-1 ml-auto">
//             {user ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold bg-white/15 px-2 py-1 rounded">
//                   {user.fullName || user.username} ({user.role})
//                 </span>
//                 <Link
//                   to={
//                     user.role === "STUDENT"
//                       ? "/student/dashboard"
//                       : user.role === "HOD"
//                       ? "/hod/dashboard"
//                       : "/admin/dashboard"
//                   }
//                   className="bg-white text-gov-navy text-xs font-bold px-3 py-1.5 rounded hover:bg-slate-100 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-[#d9534f] hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-[#00875a] hover:bg-[#006644] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded flex items-center gap-1.5 shadow-xs transition-colors"
//               >
//                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 LOGIN
//               </Link>
//             )}

//             {/* Mobile menu hamburger */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-1.5 rounded hover:bg-[#13578c]"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden bg-[#13578c] border-t border-white/10 px-4 py-3 space-y-1.5 text-xs font-semibold">
//             <Link to="/" className="block py-1">HOME</Link>
//             <Link to="/student/results" className="block py-1">STUDENT RESULTS</Link>
//             <Link to="/student/attendance" className="block py-1">ATTENDANCE SUMMARY</Link>
//             <Link to="/student/doubts" className="block py-1">DOUBT SOLVER AI</Link>
//             <Link to="/student/seniors" className="block py-1">SENIOR CONNECT</Link>
//             <Link to="/student/community" className="block py-1">COMMUNITY</Link>
//             <Link to="/circulars" className="block py-1">COURSES & CIRCULARS</Link>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }























































// import { useState, useRef, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTextSize } from "../context/TextSizeContext";
// import sbtetEmblem from "../images/sb.png";

// /**
//  * Circular official photo with a graceful fallback.
//  * If `src` is missing or fails to load, it shows the original
//  * placeholder person-icon instead of a broken image.
//  */
// function OfficialPhoto({ src, alt }) {
//   const [failed, setFailed] = useState(false);

//   if (!src || failed) {
//     return (
//       <div className="w-12 h-12 rounded-full border border-gray-300 bg-slate-100 flex items-center justify-center overflow-hidden shadow-xs">
//         <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//         </svg>
//       </div>
//     );
//   }

//   return (
//     <div className="w-12 h-12 rounded-full border border-gray-300 bg-slate-100 overflow-hidden shadow-xs">
//       <img
//         src={src}
//         alt={alt}
//         className="w-full h-full object-cover"
//         onError={() => setFailed(true)}
//       />
//     </div>
//   );
// }

// export default function GovHeader() {
//   const { user, logout } = useAuth();
//   const { size, increase, decrease, reset } = useTextSize();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [studentDropdown, setStudentDropdown] = useState(false);
//   const [collegeDropdown, setCollegeDropdown] = useState(false);
//   const [othersDropdown, setOthersDropdown] = useState(false);
//   const [moreDropdown, setMoreDropdown] = useState(false);

//   const studentRef = useRef(null);
//   const collegeRef = useRef(null);
//   const othersRef = useRef(null);
//   const moreRef = useRef(null);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setStudentDropdown(false);
//     setCollegeDropdown(false);
//     setOthersDropdown(false);
//     setMoreDropdown(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (studentRef.current && !studentRef.current.contains(e.target)) setStudentDropdown(false);
//       if (collegeRef.current && !collegeRef.current.contains(e.target)) setCollegeDropdown(false);
//       if (othersRef.current && !othersRef.current.contains(e.target)) setOthersDropdown(false);
//       if (moreRef.current && !moreRef.current.contains(e.target)) setMoreDropdown(false);
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm no-print">
//       {/* 1. Official Institutional Top Header (Matches Screenshot 2) */}
//       <div className="bg-white py-2 px-4 border-b border-gov-border">
//         <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
//           {/* Left: State Board of Technical Education Emblem & Title */}
//           <Link to="/" className="flex items-center gap-3 shrink-0">
//             <div className="w-14 h-14 rounded-full bg-white border-2 border-gov-navy flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
//               <img
//                 src={sbtetEmblem}
//                 alt="State Board of Technical Education and Training, Telangana"
//                 className="w-full h-full object-contain"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                   e.currentTarget.nextElementSibling.style.display = "block";
//                 }}
//               />
//               <svg className="w-10 h-10 text-gov-navy hidden" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 4.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm4 9c0 1.5-2.67 2.25-4 2.25s-4-.75-4-2.25c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5z" />
//               </svg>
//             </div>
//             {/* <div>
//               <div className="font-display font-black text-xs sm:text-sm md:text-base text-gov-navy leading-tight uppercase tracking-tight">
//                 STATE BOARD OF TECHNICAL EDUCATION AND TRAINING
//               </div>
//               <div className="font-display font-bold text-xs sm:text-sm text-gov-blue tracking-wide uppercase">
//                 TELANGANA &mdash; POLYCONNECT SERVICES
//               </div>
//             </div> */}
//             {/* Title block — swap to serif display, tighten tracking like the real site */}
// <div>
//   <div className="font-display font-bold text-xs sm:text-sm md:text-base text-gov-navy leading-tight uppercase tracking-tight">
//     STATE BOARD OF TECHNICAL EDUCATION AND TRAINING
//   </div>
//   <div className="font-sans font-semibold text-xs sm:text-sm text-gov-blue tracking-wide uppercase">
//     TELANGANA — POLYCONNECT SERVICES
//   </div>
// </div>
//           </Link>

//           {/* Center: Official Photos + Emblem */}
//           <div className="hidden xl:flex items-center gap-6 my-auto">
//             {/* Image 1: Third official — EDIT ME: set the real photo URL, name, and designation */}
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://tgobmms.cgg.gov.in/images/telangana_rising.png" alt="Official name — designation" />
//               <span className="text-[10px] font-bold text-gov-navy mt-1 leading-tight">

//               </span>
//               <span className="text-[8px] font-extrabold text-gov-slate uppercase">

//               </span>
//             </div>

//             {/* Image 2: Smt. A. Sridevasena, IAS (CHAIRPERSON) — real photo */}
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/comissioner_2024.jpg" alt="Smt. A. Sridevasena, IAS — Chairperson" />
//               <span className="text-[10px] font-bold text-gov-navy mt-1 leading-tight">
//                 Smt. A. Sridevasena, IAS
//               </span>
//               <span className="text-[8px] font-extrabold text-gov-slate uppercase">
//                 CHAIRPERSON
//               </span>
//             </div>

//             {/* Image 3: SBTET Telangana emblem/logo — EDIT ME: point this at your emblem image */}
//             <div className="flex flex-col items-center">
//               <img
//                 src="/images/sbtet-emblem.png"
//                 alt="State Board of Technical Education and Training, Telangana"
//                 className="h-12 w-auto object-contain"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />
//             </div>

//             {/* Image 4: Er A Pullaiah (SECRETARY) — real photo */}
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/Secretary.jpg" alt="Er A Pullaiah — Secretary" />
//               <span className="text-[10px] font-bold text-gov-navy mt-1 leading-tight">
//                 Er A Pullaiah
//               </span>
//               <span className="text-[8px] font-extrabold text-gov-slate uppercase">
//                 SECRETARY
//               </span>
//             </div>
//           </div>

//           {/* Right: Contact info, Social links, Mobile App, Font Resizers */}
//           <div className="flex flex-col items-end gap-1.5 text-xs text-gov-slate ml-auto">
//             {/* Top row: A- / A+ / A accessibility controls */}
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={decrease}
//                 disabled={size === "sm"}
//                 title="Decrease font size"
//                 className="w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold text-gov-navy hover:bg-gov-lightblue disabled:opacity-30"
//               >
//                 A-
//               </button>
//               <button
//                 onClick={increase}
//                 disabled={size === "lg"}
//                 title="Increase font size"
//                 className="w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold text-gov-navy hover:bg-gov-lightblue disabled:opacity-30"
//               >
//                 A+
//               </button>
//               <button
//                 onClick={reset}
//                 title="Default font size"
//                 className={`w-5 h-5 flex items-center justify-center border border-gov-border rounded-xs text-[10px] font-bold ${
//                   size === "md" ? "bg-gov-blue text-white" : "text-gov-navy hover:bg-gov-lightblue"
//                 }`}
//               >
//                 A
//               </button>
//             </div>

//             {/* Middle Row: Contact & Working Days info */}
//             <div className="hidden sm:flex items-center gap-3 text-[11px] text-gov-ink font-medium">
//               <span className="flex items-center gap-1">
//                 <svg className="w-3.5 h-3.5 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 sbtet-helpdesk@telangana.gov.in
//               </span>
//               <span>&bull;</span>
//               <span className="flex items-center gap-1 font-bold text-gov-navy">
//                 <svg className="w-3.5 h-3.5 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//                 08031404549
//               </span>
//             </div>

//             {/* Bottom Row: Working Hours & Social */}
//             <div className="hidden md:flex items-center gap-2 text-[10px] text-gov-slate">
//               <span>All Working days: 10:30AM to 05:00PM</span>
//               <div className="flex items-center gap-1 ml-1">
//                 <span className="w-4 h-4 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-[9px] font-bold">f</span>
//                 <span className="w-4 h-4 rounded-full bg-[#1da1f2] text-white flex items-center justify-center text-[9px] font-bold">t</span>
//               </div>
//               <span className="text-gov-blue font-bold ml-1 cursor-pointer hover:underline flex items-center gap-1">
//                 ▶ Download Mobile App
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Main Blue Horizontal Navigation Bar (Exact Screenshot 2 Structure) */}
//       <nav className="bg-[#1b75bb] text-white shadow-md border-t border-[#13578c]">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
//           <div className="hidden lg:flex items-center space-x-0.5">
//             {/* Home Icon */}
//             {/* <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   isActive ? "bg-[#13578c] text-white" : "hover:bg-[#13578c]"
//                 }`
//               }
//             > */}
//             {/* Nav bar — real gov sites use an underline-on-hover accent, not just a bg swap */}
// <NavLink
//   to="/"
//   className={({ isActive }) =>
//     `relative px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 font-sans transition-colors
//      after:absolute after:left-3 after:right-3 after:bottom-0 after:h-[3px] after:bg-white after:transition-transform after:duration-200
//      ${isActive ? "bg-[#13578c] text-white after:scale-x-100" : "hover:bg-[#146a9c] after:scale-x-0 hover:after:scale-x-100"}`
//   }
// >
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//             </NavLink>

//             {/* STUDENT SERVICES ∨ */}
//             <div className="relative" ref={studentRef}>
//               <button
//                 onClick={() => {
//                   setStudentDropdown(!studentDropdown);
//                   setCollegeDropdown(false);
//                   setOthersDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   studentDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>STUDENT SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {studentDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/student/results" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Examination Results (Mid & Sem)
//                   </Link>
//                   <Link to="/student/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Attendance Summary & 31-Day Sheet
//                   </Link>
//                   <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Doubt Solver AI (ChatBot)
//                   </Link>
//                   <Link to="/student/seniors" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Senior Connect (1-on-1 Mentorship)
//                   </Link>
//                   <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Polytechnic Community Forums
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* COLLEGE SERVICES ∨ */}
//             <div className="relative" ref={collegeRef}>
//               <button
//                 onClick={() => {
//                   setCollegeDropdown(!collegeDropdown);
//                   setStudentDropdown(false);
//                   setOthersDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   collegeDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>COLLEGE SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {collegeDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/hod/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department HOD Dashboard
//                   </Link>
//                   <Link to="/hod/approvals" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Student Registration Approvals
//                   </Link>
//                   <Link to="/hod/students" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department Students Roster
//                   </Link>
//                   <Link to="/hod/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Department Attendance Register
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* OTHERS SERVICES ∨ */}
//             <div className="relative" ref={othersRef}>
//               <button
//                 onClick={() => {
//                   setOthersDropdown(!othersDropdown);
//                   setStudentDropdown(false);
//                   setCollegeDropdown(false);
//                   setMoreDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   othersDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>OTHERS SERVICES</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {othersDropdown && (
//                 <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Official Circulars & Timetables
//                   </Link>
//                   <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     AI Doubt Solver Assistant
//                   </Link>
//                   <Link to="/admin/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     System Administration Panel
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* AFFILIATED COLLEGES ∨ */}
//             <NavLink
//               to="/admin/colleges"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
//                   isActive ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`
//               }
//             >
//               AFFILIATED COLLEGES
//             </NavLink>

//             {/* COURSES ∨ */}
//             <NavLink
//               to="/circulars"
//               className={({ isActive }) =>
//                 `px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
//                   isActive ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`
//               }
//             >
//               COURSES
//             </NavLink>

//             {/* CONTACT-US */}
//             <a
//               href="#contact-us"
//               className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#13578c] transition-colors"
//             >
//               CONTACT-US
//             </a>

//             {/* MORE ∨ */}
//             <div className="relative" ref={moreRef}>
//               <button
//                 onClick={() => {
//                   setMoreDropdown(!moreDropdown);
//                   setStudentDropdown(false);
//                   setCollegeDropdown(false);
//                   setOthersDropdown(false);
//                 }}
//                 className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
//                   moreDropdown ? "bg-[#13578c]" : "hover:bg-[#13578c]"
//                 }`}
//               >
//                 <span>MORE</span>
//                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {moreDropdown && (
//                 <div className="absolute right-0 mt-0.5 w-52 bg-white rounded-xs shadow-gov-lg border border-gov-border py-1 z-50 text-gov-ink">
//                   <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Statewide Community
//                   </Link>
//                   <Link to="/register/student" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     Student Registration
//                   </Link>
//                   <Link to="/register/hod" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-gov-blue">
//                     HOD Registration
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* LOGIN / USER Button on Right */}
//           <div className="flex items-center gap-2 py-1 ml-auto">
//             {user ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold bg-white/15 px-2 py-1 rounded">
//                   {user.fullName || user.username} ({user.role})
//                 </span>
//                 <Link
//                   to={
//                     user.role === "STUDENT"
//                       ? "/student/dashboard"
//                       : user.role === "HOD"
//                       ? "/hod/dashboard"
//                       : "/admin/dashboard"
//                   }
//                   className="bg-white text-gov-navy text-xs font-bold px-3 py-1.5 rounded hover:bg-slate-100 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-[#d9534f] hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-[#00875a] hover:bg-[#006644] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded flex items-center gap-1.5 shadow-xs transition-colors"
//               >
//                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 LOGIN
//               </Link>
//             )}

//             {/* Mobile menu hamburger */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-1.5 rounded hover:bg-[#13578c]"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden bg-[#13578c] border-t border-white/10 px-4 py-3 space-y-1.5 text-xs font-semibold">
//             <Link to="/" className="block py-1">HOME</Link>
//             <Link to="/student/results" className="block py-1">STUDENT RESULTS</Link>
//             <Link to="/student/attendance" className="block py-1">ATTENDANCE SUMMARY</Link>
//             <Link to="/student/doubts" className="block py-1">DOUBT SOLVER AI</Link>
//             <Link to="/student/seniors" className="block py-1">SENIOR CONNECT</Link>
//             <Link to="/student/community" className="block py-1">COMMUNITY</Link>
//             <Link to="/circulars" className="block py-1">COURSES & CIRCULARS</Link>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }






// import { useState, useRef, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTextSize } from "../context/TextSizeContext";

// /* ============================================================
//    IMAGE PLACEHOLDERS — replace these with your real assets.
//    Drop files anywhere under src/images (or /public) and update
//    the paths below. Nothing else in the layout needs to change.
//    ============================================================ */

// /* ------------------------------------------------------------
//    Load Font Awesome (icons) + Google Fonts (typeface) from CDN.
//    Injected once at runtime so no index.html edits are required.
//    ------------------------------------------------------------ */
// function useExternalAssets() {
//   useEffect(() => {
//     const assets = [
//       {
//         id: "fa-cdn",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
//       },
//       {
//         id: "google-font-poppins",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Roboto:wght@400;500;700&display=swap",
//       },
//     ];
//     assets.forEach(({ id, href, rel }) => {
//       if (document.getElementById(id)) return;
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = rel;
//       link.href = href;
//       document.head.appendChild(link);
//     });
//   }, []);
// }

// /* Circular photo w/ graceful fallback if the placeholder is missing */
// function OfficialPhoto({ src, alt }) {
//   const [failed, setFailed] = useState(false);

//   if (!src || failed) {
//     return (
//       <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
//         <i className="fa-solid fa-user text-3xl text-slate-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-slate-100 overflow-hidden shadow-sm">
//       <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
//     </div>
//   );
// }

// /* Nav item with cog icon + dropdown chevron, matching the reference */
// function NavDropdown({ label, isOpen, onToggle, dropdownRef, children, align = "left" }) {
//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={onToggle}
//         className={`px-3.5 py-3.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 font-nav transition-colors ${
//           isOpen ? "bg-[#1e8fdb]" : "hover:bg-[#1e8fdb]"
//         }`}
//       >
//         <i className="fa-solid fa-gear text-sm" />
//         <span>{label}</span>
//         <i className="fa-solid fa-chevron-down text-[10px] ml-0.5" />
//       </button>
//       {isOpen && (
//         <div
//           className={`absolute ${align === "left" ? "left-0" : "right-0"} mt-0.5 w-60 bg-white rounded-sm shadow-lg border border-gray-200 py-1 z-50 text-gov-ink`}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function GovHeader() {
//   useExternalAssets();

//   const { user, logout } = useAuth();
//   const { size, increase, decrease, reset } = useTextSize();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [studentDropdown, setStudentDropdown] = useState(false);
//   const [collegeDropdown, setCollegeDropdown] = useState(false);
//   const [othersDropdown, setOthersDropdown] = useState(false);
//   const [affiliatedDropdown, setAffiliatedDropdown] = useState(false);
//   const [coursesDropdown, setCoursesDropdown] = useState(false);
//   const [moreDropdown, setMoreDropdown] = useState(false);

//   const studentRef = useRef(null);
//   const collegeRef = useRef(null);
//   const othersRef = useRef(null);
//   const affiliatedRef = useRef(null);
//   const coursesRef = useRef(null);
//   const moreRef = useRef(null);

//   const closeAll = () => {
//     setStudentDropdown(false);
//     setCollegeDropdown(false);
//     setOthersDropdown(false);
//     setAffiliatedDropdown(false);
//     setCoursesDropdown(false);
//     setMoreDropdown(false);
//   };

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     closeAll();
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       const refs = [studentRef, collegeRef, othersRef, affiliatedRef, coursesRef, moreRef];
//       const setters = [
//         setStudentDropdown,
//         setCollegeDropdown,
//         setOthersDropdown,
//         setAffiliatedDropdown,
//         setCoursesDropdown,
//         setMoreDropdown,
//       ];
//       refs.forEach((ref, i) => {
//         if (ref.current && !ref.current.contains(e.target)) setters[i](false);
//       });
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm no-print" style={{ fontFamily: "'Roboto', sans-serif" }}>
//       {/* ============ 1. Top identity bar ============ */}
//       <div className="bg-white border-b border-gray-200 px-6 py-5">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap">
//           {/* Emblem + title block */}
//           <Link to="/" className="flex items-center gap-4 shrink-0">
//             <div className="w-[92px] h-[92px] shrink-0 overflow-hidden rounded-full">
//               {/* TODO: replace with your org's emblem/seal */}
//               <img src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg" alt="Emblem" className="w-full h-full object-contain" />
//             </div>
//             <div className="leading-[1.25]" style={{ fontFamily: "'Poppins', sans-serif" }}>
//               <div className="text-[26px] font-bold text-[#1a3c78] uppercase tracking-tight">

//               </div>
//               <div className="text-[26px] font-bold text-[#1a3c78] uppercase tracking-tight">

//               </div>
//               <div className="text-[26px] font-bold text-[#1a3c78] uppercase tracking-tight">

//               </div>
//             </div>
//           </Link>

//           {/* Secondary badge (e.g. state campaign logo) */}
//           <div className="hidden md:flex items-center shrink-0">
//             {/* TODO: replace with your secondary badge/campaign logo */}
//             <img src="https://www.sbtet.telangana.gov.in/assets/img/rising_logo.jpg" alt="Badge" className="w-[84px] h-[84px] object-contain" />
//           </div>

//           {/* Two profile photos with name + role */}
//           <div className="hidden xl:flex items-center gap-9">
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/Secretary.jpg" alt="Chairperson" />
//               <span className="text-[13px] font-bold text-[#1a3c78] mt-2 leading-tight text-center">
//                 Name, IAS
//               </span>
//               <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wide">Role</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/comissioner_2024.jpg" alt="Secretary" />
//               <span className="text-[13px] font-bold text-[#1a3c78] mt-2 leading-tight text-center">Name</span>
//               <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wide">Role</span>
//             </div>
//           </div>

//           {/* Right-side contact/utility block */}
//           <div className="flex flex-col items-end gap-2.5 ml-auto">
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={decrease}
//                 disabled={size === "sm"}
//                 title="Decrease font size"
//                 className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-sm text-xs font-bold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A-
//               </button>
//               <button
//                 onClick={increase}
//                 disabled={size === "lg"}
//                 title="Increase font size"
//                 className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-sm text-xs font-bold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A+
//               </button>
//               <button
//                 onClick={reset}
//                 title="Default font size"
//                 className={`w-7 h-7 flex items-center justify-center rounded-sm text-xs font-bold ${
//                   size === "md" ? "bg-[#35a5f1] text-white" : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"
//                 }`}
//               >
//                 A
//               </button>
//             </div>

//             <div className="flex items-center gap-5 text-[15px] text-[#1a3c78] font-medium mt-1">
//               <span className="flex items-center gap-2">
//                 <i className="fa-solid fa-envelope text-[#1a3c78]" />
//                 support@polyconnect.example
//               </span>
//               <span className="flex items-center gap-2 font-bold">
//                 <i className="fa-solid fa-phone text-[#1a3c78]" />
//                 +91-00000-00000
//               </span>
//             </div>

//             <div className="text-[15px] font-bold text-[#1a3c78]">
//               All Working days: 10:30AM to 05:00PM
//             </div>

//             <div className="flex items-center gap-3.5">
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-7 h-7 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-sm hover:opacity-80"
//               >
//                 <i className="fa-brands fa-facebook-f" />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-7 h-7 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-sm hover:opacity-80"
//               >
//                 <i className="fa-brands fa-twitter" />
//               </a>
//               <a href="#" className="flex items-center gap-2 text-[15px] font-bold text-[#1a3c78] hover:underline">
//                 <i className="fa-solid fa-circle-play" />
//                 Download Mobile App
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ 2. Main nav bar ============ */}
//       <nav className="bg-[#35a5f1] text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
//           <div className="hidden lg:flex items-center">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-4 py-3.5 flex items-center transition-colors ${isActive ? "bg-[#1e8fdb]" : "hover:bg-[#1e8fdb]"}`
//               }
//             >
//               <i className="fa-solid fa-house text-[15px]" />
//             </NavLink>

//             <NavDropdown
//               label="Student Services"
//               isOpen={studentDropdown}
//               dropdownRef={studentRef}
//               onToggle={() => {
//                 setStudentDropdown(!studentDropdown);
//                 setCollegeDropdown(false);
//                 setOthersDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/student/results" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Examination Results (Mid & Sem)</Link>
//               <Link to="/student/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Attendance Summary & 31-Day Sheet</Link>
//               <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Doubt Solver AI (ChatBot)</Link>
//               <Link to="/student/seniors" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Senior Connect (1-on-1 Mentorship)</Link>
//               <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Polytechnic Community Forums</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="College Services"
//               isOpen={collegeDropdown}
//               dropdownRef={collegeRef}
//               onToggle={() => {
//                 setCollegeDropdown(!collegeDropdown);
//                 setStudentDropdown(false);
//                 setOthersDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/hod/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department HOD Dashboard</Link>
//               <Link to="/hod/approvals" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Student Registration Approvals</Link>
//               <Link to="/hod/students" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department Students Roster</Link>
//               <Link to="/hod/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department Attendance Register</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Others Services"
//               isOpen={othersDropdown}
//               dropdownRef={othersRef}
//               onToggle={() => {
//                 setOthersDropdown(!othersDropdown);
//                 setStudentDropdown(false);
//                 setCollegeDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Official Circulars & Timetables</Link>
//               <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">AI Doubt Solver Assistant</Link>
//               <Link to="/admin/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">System Administration Panel</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Affiliated Colleges"
//               isOpen={affiliatedDropdown}
//               dropdownRef={affiliatedRef}
//               onToggle={() => {
//                 setAffiliatedDropdown(!affiliatedDropdown);
//                 closeAll();
//                 setAffiliatedDropdown(!affiliatedDropdown);
//               }}
//             >
//               <Link to="/admin/colleges" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">All Affiliated Colleges</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Courses"
//               isOpen={coursesDropdown}
//               dropdownRef={coursesRef}
//               onToggle={() => {
//                 setCoursesDropdown(!coursesDropdown);
//                 closeAll();
//                 setCoursesDropdown(!coursesDropdown);
//               }}
//             >
//               <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Course List</Link>
//             </NavDropdown>

//             <a
//               href="#contact-us"
//               className="px-3.5 py-3.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 font-nav hover:bg-[#1e8fdb] transition-colors"
//             >
//               <i className="fa-solid fa-pen-to-square text-sm" />
//               Contact-Us
//             </a>

//             <NavDropdown
//               label="More"
//               align="right"
//               isOpen={moreDropdown}
//               dropdownRef={moreRef}
//               onToggle={() => {
//                 setMoreDropdown(!moreDropdown);
//                 setStudentDropdown(false);
//                 setCollegeDropdown(false);
//                 setOthersDropdown(false);
//               }}
//             >
//               <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Statewide Community</Link>
//               <Link to="/register/student" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Student Registration</Link>
//               <Link to="/register/hod" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">HOD Registration</Link>
//             </NavDropdown>
//           </div>

//           <div className="flex items-center gap-2.5 ml-auto">
//             {user ? (
//               <div className="flex items-center gap-2.5">
//                 <span className="text-[13px] font-bold bg-white/15 px-3 py-2 rounded">
//                   {user.fullName || user.username} ({user.role})
//                 </span>
//                 <Link
//                   to={user.role === "STUDENT" ? "/student/dashboard" : user.role === "HOD" ? "/hod/dashboard" : "/admin/dashboard"}
//                   className="bg-white text-[#1a3c78] text-[13px] font-bold px-3.5 py-2 rounded hover:bg-slate-100 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-[#d9534f] hover:bg-red-700 text-white text-[13px] font-bold px-3 py-2 rounded transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-[#1a3c78] hover:bg-[#132d5c] text-white text-[13px] font-bold uppercase tracking-wide px-6 py-3.5 flex items-center gap-2 transition-colors font-nav"
//               >
//                 <i className="fa-solid fa-user" />
//                 Login
//               </Link>
//             )}
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 rounded hover:bg-[#1e8fdb]" aria-label="Toggle menu">
//               <i className="fa-solid fa-bars text-white" />
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="lg:hidden bg-[#1e8fdb] border-t border-white/10 px-4 py-3 space-y-1.5 text-xs font-semibold">
//             <Link to="/" className="block py-1">HOME</Link>
//             <Link to="/student/results" className="block py-1">STUDENT RESULTS</Link>
//             <Link to="/student/attendance" className="block py-1">ATTENDANCE SUMMARY</Link>
//             <Link to="/student/doubts" className="block py-1">DOUBT SOLVER AI</Link>
//             <Link to="/student/seniors" className="block py-1">SENIOR CONNECT</Link>
//             <Link to="/student/community" className="block py-1">COMMUNITY</Link>
//             <Link to="/circulars" className="block py-1">COURSES & CIRCULARS</Link>
//           </div>
//         )}
//       </nav>

//       {/* ============ 3. "What's New" strip ============ */}
//       <div className="px-6 pt-3 pb-2 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <button className="bg-[#6fae2e] hover:bg-[#5f9927] text-white text-[13px] font-bold px-5 py-2 rounded-sm shadow-sm transition-colors">
//             What's New
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }





















































// import { useState, useRef, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTextSize } from "../context/TextSizeContext";

// /* ============================================================
//    IMAGE PLACEHOLDERS — replace these with your real assets.
//    Drop files anywhere under src/images (or /public) and update
//    the paths below. Nothing else in the layout needs to change.
//    ============================================================ */

// /* ------------------------------------------------------------
//    Load Font Awesome (icons) + Google Fonts (typeface) from CDN.
//    Injected once at runtime so no index.html edits are required.
//    ------------------------------------------------------------ */
// function useExternalAssets() {
//   useEffect(() => {
//     const assets = [
//       {
//         id: "fa-cdn",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
//       },
//       {
//         id: "google-font-poppins",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Roboto:wght@400;500;700&display=swap",
//       },
//     ];
//     assets.forEach(({ id, href, rel }) => {
//       if (document.getElementById(id)) return;
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = rel;
//       link.href = href;
//       document.head.appendChild(link);
//     });
//   }, []);
// }

// /* Circular photo w/ graceful fallback if the placeholder is missing */
// function OfficialPhoto({ src, alt }) {
//   const [failed, setFailed] = useState(false);

//   if (!src || failed) {
//     return (
//       <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
//         <i className="fa-solid fa-user text-3xl text-slate-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-slate-100 overflow-hidden shadow-sm">
//       <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
//     </div>
//   );
// }

// /* Nav item with cog icon + dropdown chevron, matching the reference */
// function NavDropdown({ label, isOpen, onToggle, dropdownRef, children, align = "left" }) {
//   return (
//     <div className="relative shrink-0" ref={dropdownRef}>
//       <button
//         onClick={onToggle}
//         className={`px-3 py-3.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap font-nav transition-colors ${
//           isOpen ? "bg-[#1e8fdb]" : "hover:bg-[#1e8fdb]"
//         }`}
//       >
//         <i className="fa-solid fa-gear text-sm shrink-0" />
//         <span className="whitespace-nowrap">{label}</span>
//         <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
//       </button>
//       {isOpen && (
//         <div
//           className={`absolute ${align === "left" ? "left-0" : "right-0"} mt-0.5 w-60 bg-white rounded-sm shadow-lg border border-gray-200 py-1 z-50 text-gov-ink`}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function GovHeader() {
//   useExternalAssets();

//   const { user, logout } = useAuth();
//   const { size, increase, decrease, reset } = useTextSize();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [studentDropdown, setStudentDropdown] = useState(false);
//   const [collegeDropdown, setCollegeDropdown] = useState(false);
//   const [othersDropdown, setOthersDropdown] = useState(false);
//   const [affiliatedDropdown, setAffiliatedDropdown] = useState(false);
//   const [coursesDropdown, setCoursesDropdown] = useState(false);
//   const [moreDropdown, setMoreDropdown] = useState(false);

//   const studentRef = useRef(null);
//   const collegeRef = useRef(null);
//   const othersRef = useRef(null);
//   const affiliatedRef = useRef(null);
//   const coursesRef = useRef(null);
//   const moreRef = useRef(null);

//   const closeAll = () => {
//     setStudentDropdown(false);
//     setCollegeDropdown(false);
//     setOthersDropdown(false);
//     setAffiliatedDropdown(false);
//     setCoursesDropdown(false);
//     setMoreDropdown(false);
//   };

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     closeAll();
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       const refs = [studentRef, collegeRef, othersRef, affiliatedRef, coursesRef, moreRef];
//       const setters = [
//         setStudentDropdown,
//         setCollegeDropdown,
//         setOthersDropdown,
//         setAffiliatedDropdown,
//         setCoursesDropdown,
//         setMoreDropdown,
//       ];
//       refs.forEach((ref, i) => {
//         if (ref.current && !ref.current.contains(e.target)) setters[i](false);
//       });
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm no-print" style={{ fontFamily: "'Montserrat', sans-serif" }}>
//       {/* ============ 1. Top identity bar ============ */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-5 flex-wrap">
//           {/* Emblem — the logo image already contains the org name/text baked in,
//               so no separate heading is rendered alongside it. */}
//           <Link to="/" className="flex items-center shrink-0">
//             <div className="h-[100px] shrink-0 overflow-hidden flex items-center">
//               {/* TODO: replace with your org's full emblem/logo (the image itself carries the title text) */}
//               <img
//                 src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
//                 alt="State Board of Technical Education and Training, Telangana"
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//           </Link>

//           {/* Secondary badge (e.g. state campaign logo) — framed like the reference */}
//           <div className="hidden md:flex items-center shrink-0 border border-gray-200 rounded-sm p-1.5 bg-white">
//             {/* TODO: replace with your secondary badge/campaign logo */}
//             <img
//               src="https://www.sbtet.telangana.gov.in/assets/img/rising_logo.jpg"
//               alt="Badge"
//               className="w-[64px] h-[64px] object-contain"
//             />
//           </div>

//           {/* Two profile photos with name + role */}
//           <div className="hidden xl:flex items-center gap-9">
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/comissioner_2024.jpg" alt="Chairperson" />
//               <span className="text-[12px] font-bold text-[#1a3c78] mt-2 leading-tight text-center max-w-[120px]">
//                 Smt. A. Sridevasena, IAS
//               </span>
//               <span className="text-[12px] font-extrabold text-[#1a3c78] uppercase tracking-wide">CHAIRPERSON</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/Secretary.jpg" alt="Secretary" />
//               <span className="text-[12px] font-bold text-[#1a3c78] mt-2 leading-tight text-center">Er A Pullaiah</span>
//               <span className="text-[12px] font-extrabold text-[#1a3c78] uppercase tracking-wide">SECRETARY</span>
//             </div>
//           </div>

//           {/* Right-side contact/utility block — compact, top-aligned like the reference */}
//           <div className="flex flex-col items-end gap-1.5 ml-auto self-start">
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={decrease}
//                 disabled={size === "sm"}
//                 title="Decrease font size"
//                 className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] font-bold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A-
//               </button>
//               <button
//                 onClick={increase}
//                 disabled={size === "lg"}
//                 title="Increase font size"
//                 className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] font-bold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A+
//               </button>
//               <button
//                 onClick={reset}
//                 title="Default font size"
//                 className={`w-6 h-6 flex items-center justify-center rounded-sm text-[11px] font-bold ${
//                   size === "md" ? "bg-[#35a5f1] text-white" : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"
//                 }`}
//               >
//                 A
//               </button>
//             </div>

//             <div className="flex items-center gap-4 text-[13px] text-[#1a3c78] font-semibold mt-1">
//               <span className="flex items-center gap-1.5">
//                 <i className="fa-solid fa-envelope text-[#1a3c78]" />
//                 sbtet-helpdesk@telangana.gov.in
//               </span>
//               <span className="flex items-center gap-1.5 font-bold">
//                 <i className="fa-solid fa-phone text-[#1a3c78]" />
//                 08031404549
//               </span>
//             </div>

//             <div className="text-[13px] font-bold text-[#1a3c78]">
//               All Working days: 10:30AM to 05:00PM
//             </div>

//             <div className="flex items-center gap-3">
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80"
//               >
//                 <i className="fa-brands fa-facebook-f" />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80"
//               >
//                 <i className="fa-brands fa-twitter" />
//               </a>
//               <a href="#" className="flex items-center gap-1.5 text-[13px] font-bold text-[#1a3c78] hover:underline">
//                 <i className="fa-solid fa-circle-play" />
//                 Download Mobile App
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ 2. Main nav bar ============ */}
//       <nav className="bg-[#35a5f1] text-white shadow-md overflow-x-auto">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between flex-nowrap min-w-max lg:min-w-0">
//           <div className="hidden lg:flex items-center flex-nowrap">
//             {/* Home: no persistent active highlight, matching the reference — hover only */}
//             <NavLink to="/" className="px-4 py-3.5 flex items-center shrink-0 transition-colors hover:bg-[#1e8fdb]">
//               <i className="fa-solid fa-house text-[15px]" />
//             </NavLink>

//             <NavDropdown
//               label="Student Services"
//               isOpen={studentDropdown}
//               dropdownRef={studentRef}
//               onToggle={() => {
//                 setStudentDropdown((prev) => !prev);
//                 setCollegeDropdown(false);
//                 setOthersDropdown(false);
//                 setAffiliatedDropdown(false);
//                 setCoursesDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/student/results" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Examination Results (Mid & Sem)</Link>
//               <Link to="/student/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Attendance Summary & 31-Day Sheet</Link>
//               <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Doubt Solver AI (ChatBot)</Link>
//               <Link to="/student/seniors" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Senior Connect (1-on-1 Mentorship)</Link>
//               <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Polytechnic Community Forums</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="College Services"
//               isOpen={collegeDropdown}
//               dropdownRef={collegeRef}
//               onToggle={() => {
//                 setCollegeDropdown(!collegeDropdown);
//                 setStudentDropdown(false);
//                 setOthersDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/hod/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department HOD Dashboard</Link>
//               <Link to="/hod/approvals" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Student Registration Approvals</Link>
//               <Link to="/hod/students" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department Students Roster</Link>
//               <Link to="/hod/attendance" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Department Attendance Register</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Others Services"
//               isOpen={othersDropdown}
//               dropdownRef={othersRef}
//               onToggle={() => {
//                 setOthersDropdown(!othersDropdown);
//                 setStudentDropdown(false);
//                 setCollegeDropdown(false);
//                 setMoreDropdown(false);
//               }}
//             >
//               <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Official Circulars & Timetables</Link>
//               <Link to="/student/doubts" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">AI Doubt Solver Assistant</Link>
//               <Link to="/admin/dashboard" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">System Administration Panel</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Affiliated Colleges"
//               isOpen={affiliatedDropdown}
//               dropdownRef={affiliatedRef}
//               onToggle={() => {
//                 closeAll();
//                 setAffiliatedDropdown(!affiliatedDropdown);
//               }}
//             >
//               <Link to="/admin/colleges" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">All Affiliated Colleges</Link>
//             </NavDropdown>

//             <NavDropdown
//               label="Courses"
//               isOpen={coursesDropdown}
//               dropdownRef={coursesRef}
//               onToggle={() => {
//                 closeAll();
//                 setCoursesDropdown(!coursesDropdown);
//               }}
//             >
//               <Link to="/circulars" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Course List</Link>
//             </NavDropdown>

//             <a
//               href="#contact-us"
//               className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap shrink-0 font-nav hover:bg-[#1e8fdb] transition-colors"
//             >
//               <i className="fa-solid fa-pen-to-square text-sm shrink-0" />
//               Contact-Us
//             </a>

//             <NavDropdown
//               label="More"
//               align="right"
//               isOpen={moreDropdown}
//               dropdownRef={moreRef}
//               onToggle={() => {
//                 setMoreDropdown(!moreDropdown);
//                 setStudentDropdown(false);
//                 setCollegeDropdown(false);
//                 setOthersDropdown(false);
//               }}
//             >
//               <Link to="/student/community" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Statewide Community</Link>
//               <Link to="/register/student" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">Student Registration</Link>
//               <Link to="/register/hod" className="block px-4 py-2 text-xs font-semibold hover:bg-gov-lightblue hover:text-[#35a5f1]">HOD Registration</Link>
//             </NavDropdown>
//           </div>

//           <div className="flex items-center gap-2.5 ml-auto shrink-0">
//             {user ? (
//               <div className="flex items-center gap-2.5 shrink-0">
//                 <span className="text-[13px] font-bold bg-white/15 px-3 py-2 rounded whitespace-nowrap">
//                   {user.fullName || user.username} ({user.role})
//                 </span>
//                 <Link
//                   to={user.role === "STUDENT" ? "/student/dashboard" : user.role === "HOD" ? "/hod/dashboard" : "/admin/dashboard"}
//                   className="bg-white text-[#1a3c78] text-[13px] font-bold px-3.5 py-2 rounded hover:bg-slate-100 transition-colors whitespace-nowrap"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-[#d9534f] hover:bg-red-700 text-white text-[13px] font-bold px-3 py-2 rounded transition-colors whitespace-nowrap"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-[#1a3c78] hover:bg-[#132d5c] text-white text-[13px] font-bold uppercase tracking-wide px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors font-nav"
//               >
//                 <i className="fa-solid fa-user" />
//                 Login
//               </Link>
//             )}
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 rounded hover:bg-[#1e8fdb]" aria-label="Toggle menu">
//               <i className="fa-solid fa-bars text-white" />
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="lg:hidden bg-[#1e8fdb] border-t border-white/10 px-4 py-3 space-y-1.5 text-xs font-semibold">
//             <Link to="/" className="block py-1">HOME</Link>
//             <Link to="/student/results" className="block py-1">STUDENT RESULTS</Link>
//             <Link to="/student/attendance" className="block py-1">ATTENDANCE SUMMARY</Link>
//             <Link to="/student/doubts" className="block py-1">DOUBT SOLVER AI</Link>
//             <Link to="/student/seniors" className="block py-1">SENIOR CONNECT</Link>
//             <Link to="/student/community" className="block py-1">COMMUNITY</Link>
//             <Link to="/circulars" className="block py-1">COURSES & CIRCULARS</Link>
//           </div>
//         )}
//       </nav>

//       {/* ============ 3. "What's New" strip ============ */}
//       <div className="px-6 pt-3 pb-2 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <button className="bg-[#6fae2e] hover:bg-[#5f9927] text-white text-[13px] font-bold px-5 py-2 rounded-sm shadow-sm transition-colors">
//             What's New
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }














































































//Imp code


// import { useState, useEffect,useRef } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useTextSize } from "../context/TextSizeContext";
// import HomeIcon from "@iconify-react/ion/home";
// import sbtetCommisioner from "../images/sbtet-commisioner.jpg"
// import sbtetSec from "../images/sbtet-sec.jpg"
// import sbtetRising from "../images/sbtet-rising.jpg"
// import sbtetlogo from "../images/sb-1.jpg"
// import WhatsNew from "../WhatsNew";



// const updates = [
//   "Diploma 2nd Sem Results Released",
//   "Hallticket Download for CBT Exams now open",
//   "Attendance 31-Day Sheet updated",
//   "Last date for Fee Payment extended",
//   // add as many updates as you want
// ];





// function useExternalAssets() {
//   useEffect(() => {
//     const assets = [
//       {
//         id: "fa-cdn",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
//       },
//       {
//         id: "google-font-mulish",
//         tag: "link",
//         rel: "stylesheet",
//         href: "https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap",
//       },
//     ];
//     assets.forEach(({ id, href, rel }) => {
//       if (document.getElementById(id)) return;
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = rel;
//       link.href = href;
//       document.head.appendChild(link);
//     });
//   }, []);
// }

// // function OfficialPhoto({ src, alt }) {
// //   const [failed, setFailed] = useState(false);

// //   if (!src || failed) {
// //     return (
// //       <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
// //         <i className="fa-solid fa-user text-3xl text-slate-400" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden shadow-sm">
// //       <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
// //     </div>
// //   );
// // }


// //fixed//

// // function OfficialPhoto({ src, alt }) {
// //   const [failed, setFailed] = useState(false);

// //   if (!src || failed) {
// //     return (
// //       <div
// //         className="w-20 h-20 rounded-full border-2 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm"
// //         style={{ borderColor: "#D2D4D8" }}
// //       >
// //         <i className="fa-solid fa-user text-3xl text-slate-400" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       className="w-20 h-20 rounded-full border-2 bg-slate-100 overflow-hidden shadow-sm"
// //       style={{ borderColor: "#D2D4D8" }}
// //     >
// //       <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
// //     </div>
// //   );
// // }



// function OfficialPhoto({ src, alt }) {
//   const [failed, setFailed] = useState(false);

//   if (!src || failed) {
//     return (
//       <div
//         className="w-[160px] h-[160px] rounded-full border-4 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm"
//         style={{ borderColor: "#D2D4D8" }}
//       >
//         <i className="fa-solid fa-user text-5xl text-slate-400" />
//       </div>
//     );
//   }

//   return (
//     <div
//       className="w-[68px] h-[68px] rounded-full border-2 bg-slate-100 overflow-hidden shadow-sm"
//       style={{ borderColor: "#D2D4D8" }}
//     >
//       <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />
//     </div>
//   );
// }


// export default function GovHeader() {
//   useExternalAssets();

//   const { user, logout } = useAuth();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const { size, increase, decrease, reset } = useTextSize();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const profileRef = useRef(null);


//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);


//   useEffect(() => {
//   function handleClickOutside(e) {
//     if (profileRef.current && !profileRef.current.contains(e.target)) {
//       setProfileOpen(false);
//     }
//   }
//   document.addEventListener("mousedown", handleClickOutside);
//   return () => document.removeEventListener("mousedown", handleClickOutside);
// }, []);

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     // <header
//     //   className="sticky z-50 bg-white shadow-sm no-print [&_*:not(i)]:!font-extralight"
//     //   style={{ fontFamily: "'Mulish', sans-serif" }}
//     // >
//     <header
//   className="z-50  no-print [&_*:not(i):not(.force-bold)]:!font-extralight"
//   style={{ fontFamily: "'Mulish', sans-serif", marginTop: "8px",boxShadow: " 0 2px 2px #333434"}}
// >
//       {/* 1. Top Identity Bar */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 -mt-2">
//         <div className="max-w-7xl mx-auto flex items-start justify-between gap-5 flex-wrap">
//           <Link to="/" className="flex items-center shrink-0">
//             {/* <div className="h-[100px] shrink-0 overflow-hidden flex items-center">
//               <img
//                 src="https://www.sbtet.telangana.gov.in/assets/img/custom/sb-1.jpg"
//                 alt="State Board of Technical Education and Training, Telangana"
//                 className="h-full w-auto object-contain"
//               />
//             </div> */}
//             <div
//   className="h-[80px] shrink-0 overflow-hidden flex items-center"
//   style={{ transform: "translateX(40px)" }}
// >
//   <img
//     src={sbtetlogo}
//     alt="State Board of Technical Education and Training, Telangana"
//     className="h-full w-auto object-contain"
//   />
// </div>

//           </Link>

//           {/* <div className="hidden md:flex items-center shrink-0 border border-gray-200 rounded-sm p-1.5 bg-white">
//             <img
//               src="https://www.sbtet.telangana.gov.in/assets/img/rising_logo.jpg"
//               alt="Badge"
//               className="w-[64px] h-[64px] object-contain"
//             />
//           </div> */}
//           {/* <div
//   className="hidden md:flex items-center shrink-0 border border-gray-200 rounded-sm p-1.5 bg-white"
//   style={{ transform: "translateX(90px)" }}
// > */}
// <div
//   className="hidden md:flex items-center shrink-0 border bg-white"
//   style={{
//     transform: "translateX(90px)",
//     // transform:"translateY(0px)",
//     borderRadius: "10px",
//     borderColor: "#D2D4D8",
//     borderWidth: "1px",
//     padding: "6px",
//   }}
// >
//   <img src={sbtetRising} alt="Badge" className="w-[64px] h-[px] object-contain "/>
// </div>

//           {/* <div className="hidden xl:flex items-center gap-9">
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/comissioner_2024.jpg" alt="Chairperson" />
//               <span className="text-[12px] text-[#1a3c78] mt-2 leading-tight text-center max-w-[120px]">
//                 Smt. A. Sridevasena, IAS
//               </span>
//               <span className="text-[12px] text-[#1a3c78] uppercase tracking-wide">CHAIRPERSON</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <OfficialPhoto src="https://www.sbtet.telangana.gov.in/assets/img/Secretary.jpg" alt="Secretary" />
//               <span className="text-[12px] text-[#1a3c78] mt-2 leading-tight text-center">Er A Pullaiah</span>
//               <span className="text-[12px] text-[#1a3c78] uppercase tracking-wide">SECRETARY</span>
//             </div>
//           </div> */}

// <div className="hidden xl:flex items-start gap-9">
//   <div
//     className="flex flex-col items-center"
//     style={{ transform: "translateX(150px)"}}
//   >
//     <OfficialPhoto src={sbtetCommisioner} alt="Chairperson" />
//     <span className="text-[11px] text-[#1a3c78] mt-2 leading-tight text-center max-w-[120px] force-bold" style={{ fontWeight: "700"  }}>
//       Smt. A. Sridevasena,
//       IAS
//     </span>
//     <span className="text-[11px] text-[#1a3c78] uppercase tracking-wide force-bold" style={{ fontWeight: "700" }}>CHAIRPERSON</span>
//   </div>
//   <div
//     className="flex flex-col items-center"
//     style={{ transform: "translateX(170px)" }}
//   >
//     <OfficialPhoto src={sbtetSec} alt="Secretary" />
//     <span className="text-[11px] text-[#1a3c78] mt-2 leading-tight text-center force-bold" style={{ fontWeight: "700" }}>Er A Pullaiah</span>
//     <span className="text-[11px] text-[#1a3c78] uppercase tracking-wide force-bold" style={{ fontWeight: "700" }}>SECRETARY</span>
//   </div>
// </div>





//           {/* <div className="flex flex-col items-end gap-1.5 ml-auto self-start">
//             <div className="flex items-center gap-1.5">
//               <button
//                 type="button"
//                 onClick={decrease}
//                 disabled={size === "sm"}
//                 title="Decrease font size"
//                 className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A-
//               </button>
//               <button
//                 type="button"
//                 onClick={increase}
//                 disabled={size === "lg"}
//                 title="Increase font size"
//                 className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
//               >
//                 A+
//               </button>
//               <button
//                 type="button"
//                 onClick={reset}
//                 title="Default font size"
//                 className={`w-6 h-6 flex items-center justify-center rounded-sm text-[11px] ${
//                   size === "md" ? "bg-[#35a5f1] text-white" : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"
//                 }`}
//               >
//                 A
//               </button>
//             </div>

//             <div className="flex items-center gap-4 text-[13px] text-[#1a3c78] mt-1">
//               <span className="flex items-center gap-1.5">
//                 <i className="fa-solid fa-envelope text-[#1a3c78]" />
//                 sbtet-helpdesk@telangana.gov.in
//               </span>
//               <span className="flex items-center gap-1.5">
//                 <i className="fa-solid fa-phone text-[#1a3c78]" />
//                 08031404549
//               </span>
//             </div>

//             <div className="text-[13px] text-[#1a3c78]">
//               All Working days: 10:30AM to 05:00PM
//             </div>

//             <div className="flex items-center gap-3">
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80"
//               >
//                 <i className="fa-brands fa-facebook-f" />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80"
//               >
//                 <i className="fa-brands fa-twitter" />
//               </a>
//               <a href="#" className="flex items-center gap-1.5 text-[13px] text-[#1a3c78] hover:underline">
//                 <i className="fa-solid fa-circle-play" />
//                 Download Mobile App
//               </a>
//             </div>
//           </div> */}

// <div className="flex flex-col items-end gap-1.5 ml-auto self-start">
//   <div className="flex items-center gap-1.5">
//     <button type="button" onClick={decrease} disabled={size === "sm"} title="Decrease font size" className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] force-bold !font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30">
//       A-
//     </button>
//     <button type="button" onClick={increase} disabled={size === "lg"} title="Increase font size" className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[11px] force-bold !font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30">
//       A+
//     </button>
//     <button type="button" onClick={reset} title="Default font size" className={`w-6 h-6 flex items-center justify-center rounded-sm text-[11px] !font-semibold ${size === "md" ? "bg-[#35a5f1] text-white" : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"}`}>
//       A
//     </button>
//   </div>

//   <div className="flex items-center gap-4 text-[13px] force-bold !font-semibold text-[#1a3c78] mt-1">
//     <span className="flex items-center gap-1.5 force-bold">
//       <i className="fa-solid fa-envelope text-[#1a3c78]" />
//       sbtet-helpdesk@telangana.gov.in
//     </span>
//     <span className="flex items-center gap-1.5 force-bold">
//       <i className="fa-solid fa-phone text-[#1a3c78]" />
//       08031404549
//     </span>
//   </div>

//   <div className="flex items-center gap-3">
//     <span className="text-[13px] force-bold !font-semibold text-[#1a3c78]">
//       All Working days: 10:30AM to 05:00PM
//     </span>
//     <a href="#" aria-label="Facebook" className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80">
//       <i className="fa-brands fa-facebook-f" />
//     </a>
//     <a href="#" aria-label="Twitter" className="w-6 h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-xs hover:opacity-80">
//       <i className="fa-brands fa-twitter" />
//     </a>
//   </div>

//   <a href="#" className="flex items-center gap-1.5 text-[13px] force-bold !font-semibold text-[#1a3c78] hover:underline">
//     <i className="fa-solid fa-circle-play" />
//     Download Mobile App
//   </a>
// </div>












//         </div>
//       </div>

//       {/* 2. Main Navigation Bar */}
//       <nav className=" bg-[#35a5f1] text-white shadow-md relative" >

//         {/* <div className="max-w-7xl mx-auto px-4 flex items-center justify-between  flex-nowrap"> */}
// {/* <div className="w-full pl-[130px] pr-4 flex items-center justify-start flex-nowrap"> */}
// <div className="w-full pl-32 pr-24 flex items-center justify-start flex-nowrap">
//           {/* <div className="hidden lg:flex items-center  flex-nowrap"> */}
//           {/* <div className="hidden lg:flex items-center flex-nowrap flex-1 min-w-0 overflow-x-auto"> */}
//           <div className="hidden lg:flex items-center flex-nowrap flex-1 min-w-0">
//             <NavLink to="/" className="px-4 py-3.5 flex items-center shrink-0">
//               <HomeIcon height="1.2rem" />
//             </NavLink>

//             {/* 1. STUDENT SERVICES MEGA MENU */}
//             <div className="group static force-bold">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap "
//               >
//                 <i className="fa-solid fa-gear text-sm shrink-0" />
//                 <span className="whitespace-nowrap  force-bold !font-[400]">Student Services</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans" >

//                     <li><Link to="/halltickets" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Halltickets</Link></li>
//                                         <li><Link to="/Results/consolidatedResults" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Consolidated Results</Link></li>
//           <li><Link to="/student/results" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Examination Results (Mid & Sem)</Link></li>
//                       <li><Link to="/student/attendance" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Attendance Summary & 31-Day Sheet</Link></li>
//                       <li><Link to="/student/doubts" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Doubt Solver AI (ChatBot)</Link></li>
//                       <li><Link to="/student/seniors" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Senior Connect (1-on-1 Mentorship)</Link></li>
//                       <li><Link to="/student/community" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Polytechnic Community Forums</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Apply for CBT\ Offline Exam</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Fee Payment</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Reschedule CBT Exam\ View Application</a></li>
//                       <li><a href="/halltickets" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Hallticket Download</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CBT Practice</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Results</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Photo Copy & Revaluation</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">ISB ONLINE SKILLING PROGRAMMES</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Student Enrolment</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. COLLEGE SERVICES MEGA MENU */}
//             <div className="group static">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap"
//               >
//                 <i className="fa-solid fa-gear text-sm shrink-0" />
//                 <span className="whitespace-nowrap force-bold !font-[400]">College Services</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/hod/dashboard" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department HOD Dashboard</Link></li>
//                       <li><Link to="/hod/approvals" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Student Registration Approvals</Link></li>
//                       <li><Link to="/hod/students" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department Students Roster</Link></li>
//                       <li><Link to="/hod/attendance" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department Attendance Register</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">College/ Institute Login</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Exams Portal</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Affiliation Portal</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 3. OTHERS SERVICES MEGA MENU */}
//             <div className="group static">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap"
//               >
//                 <i className="fa-solid fa-gear text-sm shrink-0" />
//                 <span className="whitespace-nowrap force-bold !font-[400]">Others Services</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">INSTITUTIONS</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/circulars" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Official Circulars & Timetables</Link></li>
//                       <li><Link to="/admin/dashboard" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">System Administration Panel</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">STAFF</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Digital Evaluation</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">POLYCET</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/student/doubts" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">AI Doubt Solver Assistant</Link></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Apply for Polycet</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 4. AFFILIATED COLLEGES MEGA MENU */}
//             <div className="group static">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap"
//               >
//                 <i className="fa-solid fa-gear text-sm shrink-0" />
//                 <span className="whitespace-nowrap force-bold !font-[400]">Affiliated Colleges</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/admin/colleges" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">All Affiliated Polytechnic Colleges</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
//                     <ul className="space-y-1 divide-y divide-gray-100">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Typewriting & Shorthand Institutions</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Portal</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Affiliated Colleges</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 5. COURSES MEGA MENU */}
//             <div className="group static">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap"
//               >
//                 <i className="fa-solid fa-gear text-sm shrink-0" />
//                 <span className="whitespace-nowrap force-bold !font-[400]">Courses</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/circulars" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Diploma Courses List</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700 font-sans">Typewriting & Shorthand</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Courses</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <a
//               href="#contact-us"
//               className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap  force-bold !font-[400]"
//             >
//               <i className="fa-solid fa-phone-volume text-sm shrink-0" />
//               Contact-Us
//             </a>

//             {/* 6. MORE MEGA MENU */}
//             <div className="group static">
//               <button
//                 type="button"
//                 className="px-3 py-3.5 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap"
//               >
//                 <i className="fa-solid fa-circle-info text-sm shrink-0" />
//                 <span className="whitespace-nowrap force-bold !font-[400]">More</span>
//   <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0 group-hover:text-[#999999]" />
//               </button>

//               <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
//                 <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">MORE</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><Link to="/student/community" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Statewide Polytechnic Community</Link></li>
//                       <li><Link to="/register/student" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Student Registration</Link></li>
//                       <li><Link to="/register/hod" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">HOD Registration</Link></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">PORTAL</div>
//                     <ul className="space-y-1 divide-y divide-gray-100  font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Site Map</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Tenders & Downloads</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Latest News Notifications</a></li>
//                     </ul>
//                   </div>
//                   <div>
//                     <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">RTI</div>
//                     <ul className="space-y-1 divide-y divide-gray-100 font-sans">
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Full details of Right to Information Act</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">About Right to Information</a></li>
//                       <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Obligations of Public Authority</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Login / Account Section */}
//           {/* <div className="flex items-center gap-2.5 ml-auto shrink-0"> */}
//           {/* <div className="flex items-center gap-2.5 ml-auto shrink-0 pr-10"> */}



// {/* <div className="flex items-center gap-2.5 ml-auto mr-32 shrink-0"> */}
// <div className="flex items-center gap-2.5 ml-auto shrink-0">

// {user ? (
//   <div className="relative shrink-0" ref={profileRef}>
//     <button
//       type="button"
//       onClick={() => setProfileOpen((prev) => !prev)}
//       title={user.fullName || user.username}
//       className="w-9 h-9 rounded-full bg-white text-[#1a3c78] flex items-center justify-center text-[14px] font-semibold hover:opacity-90 transition-opacity"
//     >
//       {(user.fullName || user.username || "?").trim().charAt(0).toUpperCase()}
//     </button>

//     {profileOpen && (
//       <div className="absolute right-0 top-full mt-2 w-56 bg-white text-slate-800 rounded-md shadow-2xl border border-gray-200 z-50 overflow-hidden">
//         <div className="px-4 py-3 border-b border-gray-100">
//           <div className="text-[13px] font-semibold truncate">{user.fullName || user.username}</div>
//           <div className="text-[11px] text-slate-500 uppercase tracking-wide">{user.role}</div>
//         </div>
//         <Link
//           to={user.role === "STUDENT" ? "/student/dashboard" : user.role === "HOD" ? "/hod/dashboard" : "/admin/dashboard"}
//           onClick={() => setProfileOpen(false)}
//           className="block px-4 py-2.5 text-[13px] hover:bg-slate-100 transition-colors"
//         >
//           Dashboard
//         </Link>
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="w-full text-left px-4 py-2.5 text-[13px] text-[#d9534f] hover:bg-red-50 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// ) : (
//               // <Link
//               //   to="/login"
//               //   className="bg-[#1a3c78] hover:bg-[#132d5c] text-white text-[13px] uppercase tracking-wide px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors"
//               // >
//               //   <i className="fa-solid fa-user" />
//               //   Login
//               // </Link>
//               <Link
//   to="/login"
//   className="bg-[#2d8cd5] hover:bg-[#1e78c2] text-white text-[13px] uppercase tracking-wide px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors  force-bold !font-[400]"
// > 
//   <i className="fa-solid fa-user" />
//   Login
// </Link>
//             )}
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-1.5 rounded hover:bg-[#1e8fdb]"
//               aria-label="Toggle menu"
//             >
//               <i className="fa-solid fa-bars text-white" />
//             </button>
//           </div>
//         </div> 

//         {mobileMenuOpen && (
//           <div className="lg:hidden bg-[#1e8fdb] border-t border-white/10 px-4 py-3 space-y-1.5 text-xs">
//             <Link to="/" className="block py-1">HOME</Link>
//             <Link to="/student/results" className="block py-1">STUDENT RESULTS</Link>
//             <Link to="/student/attendance" className="block py-1">ATTENDANCE SUMMARY</Link>
//             <Link to="/student/doubts" className="block py-1">DOUBT SOLVER AI</Link>
//             <Link to="/student/seniors" className="block py-1">SENIOR CONNECT</Link>
//             <Link to="/student/community" className="block py-1">COMMUNITY</Link>
//             <Link to="/circulars" className="block py-1">COURSES & CIRCULARS</Link>
//           </div>
//         )}






//       </nav>

//       {/* 3. "What's New" Strip */}
//       {/* <div className="px-6 pt-3 pb-2 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <button type="button" className="bg-[#6fae2e] hover:bg-[#5f9927] text-white text-[13px] px-5 py-2 rounded-sm shadow-sm transition-colors">
//             What's New
//           </button>
//         </div>
//       </div> */}
//             {/* 3. "What's New" Strip — Home page only */}
//       {/* {location.pathname === "/" && (
//         <div className="px-6 pt-3 pb-2 bg-white">
//           <div className="max-w-7xl mx-auto">
//             <button type="button" className="bg-[#6fae2e] hover:bg-[#5f9927] text-white text-[13px] px-5 py-2 rounded-sm shadow-sm transition-colors">
//               What's New
//             </button>
//           </div>
//         </div>
//       )} */}


// {/* 3. Latest Updates Ticker — Home page only */}
// {/* {location.pathname === "/" && (
//   <div className="bg-white border-t border-gray-100 overflow-hidden"> */}









// {/* not in Nav Header */}



//   {/* {location.pathname === "/" && (
// <div className="overflow-hidden" style={{ marginTop: "4px", marginLeft: "35px" }}>
//     <div className="max-w-7xl mx-auto flex items-center">
//     {/* <div className="flex items-center"> */}
//       {/* <span className="shrink-0 bg-[#5AA628] text-white text-[13px] px-4 py-2 uppercase tracking-wide z-10">
//                       What's New

//       </span> */}

// {/* 
// <h2 className="force-bold"
//   style={{
//     border: "2px solid #5aa628",
//     background: "#5aa628",
//     padding: "8px 20px",
//     margin: "2px 10px 6px 0",
//     color: "#fff",
//     fontFamily: "'Mulish', sans-serif",
//     fontSize: "12px",
//     fontWeight: "400",
//     lineHeight: "normal",
//    width:"116px",
//    height: "34px",
//     boxSizing: "border-box",
//     display: "flex",
//     alignItems: "center",
//     float: "left",
//   }}
// >
//   What's New
// </h2>

//       <div className="relative flex-1 min-w-0 overflow-hidden py-2">
//         <div className="flex whitespace-nowrap marquee-track">
//           {/* Duplicate the list twice for a seamless loop */}
//            {/* {[...updates, ...updates].map((item, idx) => (
//             <span key={idx} className="flex items-center gap-2 mx-8 shrink-0">
//               <img
//                 src="https://www.sbtet.telangana.gov.in/contents/img/gif.gif"
//                 // src="https://tgecet.nic.in/images/new.gif"
//                 alt="new"
//                 className="w-5 h-5 shrink-0"
//               />
//               <span className="text-[13px] text-[#1a3c78] force-bold">{item}</span>
//             </span>
//           ))}
//         </div>
//       </div>  
//     </div>
//  <style>{`
//       .marquee-track {
//         width: max-content;
//         animation: marquee-scroll 25s linear infinite;
//       }
//       .marquee-track:hover {
//         animation-play-state: paused;
//       }
//       @keyframes marquee-scroll {
//         0%   { transform: translateX(0); }
//         100% { transform: translateX(-50%); }
//       }
//     `}</style> 
//   </div>
// )} */} 



//       {/* {location.pathname === "/" && <WhatsNew />} */}


//     </header>
//   );
// }





























































































































































import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTextSize } from "../context/TextSizeContext";
import HomeIcon from "@iconify-react/ion/home";
import sbtetCommisioner from "../images/sbtet-commisioner.jpg";
import sbtetSec from "../images/sbtet-sec.jpg";
import sbtetRising from "../images/sbtet-rising.jpg";
import sbtetlogo from "../images/sb-1.jpg";
import WhatsNew from "../WhatsNew";

function useExternalAssets() {
  useEffect(() => {
    const assets = [
      {
        id: "fa-cdn",
        tag: "link",
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      },
      {
        id: "google-font-mulish",
        tag: "link",
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap",
      },
    ];
    assets.forEach(({ id, href, rel }) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
}

function OfficialPhoto({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm"
        style={{ borderColor: "#D2D4D8" }}
      >
        <i className="fa-solid fa-user text-2xl text-slate-400" />
      </div>
    );
  }

  return (
    <div
      className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 bg-slate-100 overflow-hidden shadow-sm flex-shrink-0"
      style={{ borderColor: "#D2D4D8" }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function GovHeader() {
  useExternalAssets();

  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const { size, increase, decrease, reset } = useTextSize();
  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef(null);

  // Mobile Drawer State & Accordion States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null); // 'student' | 'college' | 'others' | 'colleges' | 'courses' | 'more'

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      className="z-50 no-print [&_*:not(i):not(.force-bold)]:!font-extralight"
      style={{
        fontFamily: "'Mulish', sans-serif",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* 1. Top Identity Bar (Responsive for Mobile & Desktop) */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4">

          {/* Top Row on Mobile / Left Section: Logo Section */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/" className="flex items-center justify-center shrink-0">
              <div className="h-[60px] sm:h-[75px] md:h-[85px] shrink-0 overflow-hidden flex items-center">
                <img
                  src={sbtetlogo}
                  alt="State Board of Technical Education and Training, Telangana"
                  className="h-full w-auto object-contain max-w-[260px] sm:max-w-none"
                />
              </div>
            </Link>

            {/* Rising Logo Badge */}
            <div
              className="flex items-center justify-center shrink-0 border bg-white rounded-lg p-1 sm:p-1.5 shadow-2xs"
              style={{ borderColor: "#D2D4D8" }}
            >
              <img
                src={sbtetRising}
                alt="Telangana Rising"
                className="w-[48px] sm:w-[58px] md:w-[64px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Dignitaries Photos (Side by Side on Mobile & Desktop) */}
          <div className="flex items-start justify-center gap-5 sm:gap-9 my-1">
            {/* Chairperson */}
            <div className="flex flex-col items-center text-center">
              <OfficialPhoto src={sbtetCommisioner} alt="Chairperson" />
              <span
                className="text-[10px] sm:text-[11px] text-[#1a3c78] mt-1 leading-tight max-w-[120px] force-bold"
                style={{ fontWeight: "700" }}
              >
                Smt. A. Sridevasena, IAS
              </span>
              <span
                className="text-[9px] sm:text-[10px] text-[#1a3c78] uppercase tracking-wide force-bold"
                style={{ fontWeight: "700" }}
              >
                CHAIRPERSON
              </span>
            </div>

            {/* Secretary */}
            <div className="flex flex-col items-center text-center">
              <OfficialPhoto src={sbtetSec} alt="Secretary" />
              <span
                className="text-[10px] sm:text-[11px] text-[#1a3c78] mt-1 leading-tight max-w-[120px] force-bold"
                style={{ fontWeight: "700" }}
              >
                Er A Pullaiah
              </span>
              <span
                className="text-[9px] sm:text-[10px] text-[#1a3c78] uppercase tracking-wide force-bold"
                style={{ fontWeight: "700" }}
              >
                SECRETARY
              </span>
            </div>
          </div>

          {/* Font Controls, Contacts & Socials */}
          <div className="flex flex-col items-center xl:items-end gap-1 text-center xl:text-right">
            {/* Text Resizing Controls */}
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={decrease}
                disabled={size === "sm"}
                title="Decrease font size"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] sm:text-[11px] force-bold !font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
              >
                A-
              </button>
              <button
                type="button"
                onClick={increase}
                disabled={size === "lg"}
                title="Increase font size"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] sm:text-[11px] force-bold !font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30"
              >
                A+
              </button>
              <button
                type="button"
                onClick={reset}
                title="Default font size"
                className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-sm text-[10px] sm:text-[11px] !font-semibold ${size === "md"
                  ? "bg-[#35a5f1] text-white"
                  : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"
                  }`}
              >
                A
              </button>
            </div>

            {/* Email & Phone */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12.5px] force-bold !font-semibold text-[#1a3c78] mt-0.5">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-envelope text-[#1a3c78]" />
                sbtet-helpdesk@telangana.gov.in
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-phone text-[#1a3c78]" />
                08031404549
              </span>
            </div>

            {/* Timings & Social Icons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12px]">
              <span className="force-bold !font-semibold text-[#1a3c78]">
                All Working days: 10:30AM to 05:00PM
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-[10px] sm:text-xs hover:opacity-80 transition-opacity"
                >
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a3c78] text-white flex items-center justify-center text-[10px] sm:text-xs hover:opacity-80 transition-opacity"
                >
                  <i className="fa-brands fa-twitter" />
                </a>
              </div>
            </div>

            {/* Mobile App Download Link */}
            <a
              href="#"
              className="flex items-center justify-center gap-1 text-[11px] sm:text-[12px] force-bold !font-semibold text-[#1a3c78] hover:underline"
            >
              <i className="fa-solid fa-circle-play text-[#1a3c78]" />
              Download Mobile App
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-[#35a5f1] text-white shadow-md relative">
        {/* <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between"> */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">

          {/* Mobile Home Icon (Visible on mobile on the left) */}
          <NavLink
            to="/"
            className="xl:hidden p-2.5 flex items-center text-white hover:bg-[#2888c9] transition-colors"
            aria-label="Home"
          >
            <i className="fa-solid fa-house text-lg text-white" />
          </NavLink>

          {/* Desktop Nav Items (Exact Layout matching reference image) */}
          <div className="hidden xl:flex items-center flex-nowrap force-bold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-3 flex items-center justify-center text-white hover:bg-[ transition-colors shrink-0 ${isActive ? "bg-[]" : ""
                }`
                
              }
                style={{ marginLeft: "-10px" }}

//               className={({ isActive }) =>
//   `pl-0 pr-3 py-3 flex items-center justify-center text-white hover:bg-[#2888c9] transition-colors shrink-0 ${isActive ? "bg-[#2888c9]" : ""}`
// }
              aria-label="Home"
            >
              <i className="fa-solid fa-house-chimney" />
            </NavLink>

            {/* 1. STUDENT SERVICES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-gear text-[14px] shrink-0" style={{fontSize: "18px"}}/>
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>STUDENT SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/halltickets" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Halltickets</Link></li>
                      <li><Link to="/Results/consolidatedResults" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Consolidated Results</Link></li>
                      <li><Link to="/student/results" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900"> Results</Link></li>
                      <li><Link to="/student/attendance" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Attendance Summary & 31-Day Sheet</Link></li>
                      <li><Link to="/student/doubts" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Doubt Solver AI (ChatBot)</Link></li>
                      <li><Link to="/student/seniors" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Senior Connect (1-on-1 Mentorship)</Link></li>
                      <li><Link to="/student/community" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Polytechnic Community Forums</Link></li>
                      <li><Link to="/Fee/exam" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Fee Payment & Download Receipt</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Apply for CBT\ Offline Exam</a></li>
                      <li><Link to="/Fee/exam" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Fee Payment</Link></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Reschedule CBT Exam\ View Application</a></li>
                      <li><Link to="/halltickets" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Hallticket Download</Link></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CBT Practice</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Results</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Photo Copy & Revaluation</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">ISB ONLINE SKILLING PROGRAMMES</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Student Enrolment</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. COLLEGE SERVICES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-gear text-[13px] shrink-0" style={{fontSize: "18px"}} />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>COLLEGE SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/hod/dashboard" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department HOD Dashboard</Link></li>
                      <li><Link to="/hod/approvals" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Student Registration Approvals</Link></li>
                      <li><Link to="/hod/students" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department Students Roster</Link></li>
                      <li><Link to="/hod/attendance" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Department Attendance Register</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/login" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">College/ Institute Login</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Exams Portal</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Affiliation Portal</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. OTHERS SERVICES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-gear text-[13px] shrink-0" style={{fontSize: "18px"}} />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>OTHERS SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">INSTITUTIONS</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/circulars" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Official Circulars & Timetables</Link></li>
                      <li><Link to="/admin/dashboard" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">System Administration Panel</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">STAFF</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Digital Evaluation</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">POLYCET</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/student/doubts" className="block py-1.5 px-2 hover:bg-slate-100 font-medium text-slate-900">AI Doubt Solver Assistant</Link></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Apply for Polycet</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. AFFILIATED COLLEGES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-gear text-[13px] shrink-0" style={{fontSize: "18px"}} />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>AFFILIATED COLLEGES</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/admin/colleges" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">All Affiliated Polytechnic Colleges</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
                    <ul className="space-y-1 divide-y divide-gray-100">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Typewriting & Shorthand Institutions</a></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Portal</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Affiliated Colleges</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. COURSES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-gear text-[13px] shrink-0" style={{fontSize: "18px"}} />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>COURSES</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/courses" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Diploma Courses List</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">TW & SH</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/courses" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700 font-sans">Typewriting & Shorthand</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">CCIC</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/courses" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">CCIC Courses</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT-US */}
            <a
              href="#contact-us"
              className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
              style={{ fontWeight: 700 }}
            >
              <i className="fa-solid fa-square-phone text-[14px] shrink-0" style={{fontSize: "18px"}} />
              <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }} >CONTACT-US</span>
            </a>

            {/* 6. MORE MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3 py-3 text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 whitespace-nowrap hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-circle-info text-[14px] shrink-0" style={{fontSize: "18px"}} />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>MORE</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 shrink-0" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">MORE</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/student/community" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Statewide Polytechnic Community</Link></li>
                      <li><Link to="/register/student" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Student Registration</Link></li>
                      <li><Link to="/register/hod" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">HOD Registration</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">PORTAL</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Site Map</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Tenders & Downloads</a></li>
                      <li><Link to="/circulars" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Latest News Notifications</Link></li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">RTI</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Full details of Right to Information Act</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">About Right to Information</a></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Obligations of Public Authority</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. LOGIN BUTTON (Directly following MORE with darker blue background tile) */}
            {user ? (
              <div className="relative shrink-0" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  title={user.fullName || user.username}
                  className="bg-[#2888c9] hover:bg-[#1e78c2] text-white text-[12px] font-bold uppercase tracking-wider px-4 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
                  style={{ fontWeight: 700 }}
                >
                  <i className="fa-solid fa-user text-[13px] shrink-0" />
                  <span className="force-bold truncate max-w-[120px]">
                    {(user.fullName || user.username || "USER").toUpperCase()}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white text-slate-800 rounded-xs shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-[13px] font-semibold truncate">{user.fullName || user.username}</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wide">{user.role}</div>
                    </div>
                    <Link
                      to={
                        user.role === "STUDENT"
                          ? "/student/dashboard"
                          : user.role === "HOD"
                            ? "/hod/dashboard"
                            : "/admin/dashboard"
                      }
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2.5 text-[13px] hover:bg-slate-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-[#d9534f] hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#2888c9] hover:bg-[#1e78c2] text-white text-[12px] font-bold uppercase tracking-wider px-4 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                style={{ fontWeight: 700 }}
              >
                <i className="fa-solid fa-user text-[13px] shrink-0" />
                <span className="force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "400",color: "white" }}>LOGIN</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button (Shows on mobile / tablet) */}
          <div className="xl:hidden flex items-center ml-auto py-1.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded hover:bg-[#2888c9]/50 transition-colors flex flex-col justify-center items-center gap-[4px] cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <span className="block w-[22px] h-[2.5px] bg-black rounded-[1px]" />
              <span className="block w-[22px] h-[2.5px] bg-black rounded-[1px]" />
              <span className="block w-[22px] h-[2.5px] bg-black rounded-[1px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Slide-Over Drawer Navigation (Exact Match to Image 1) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer Container */}
          <div className="relative w-[280px] sm:w-[320px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-left duration-200" style={{ fontFamily: "'Mulish', sans-serif", fontWeight: "200" }}>

            {/* Top Bar with Home Icon and Close 'X' button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#35a5f1] hover:opacity-80 transition-opacity flex items-center p-1"
                aria-label="Home"
              >
                <i className="fa-solid fa-house text-lg text-[#35a5f1]" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 flex items-center justify-center text-lg"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-lg text-slate-500 hover:text-slate-800" />
              </button>
            </div>

            {/* Drawer Menu List (Exact styling from Image 1) */}
            <div className="flex-1 divide-y divide-gray-100 text-[12px]">

              {/* 1. STUDENT SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("student")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      STUDENT SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "student" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "student" && (
                  <div className="bg-white border-t border-gray-100">
                    {/* DIPLOMA BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/attendance" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>View Attendance</Link>
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Time Table</Link>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Exam fee payment</Link>
                      <Link to="/halltickets" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Hall Ticket download</Link>
                      <Link to="/student/results" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Results</Link>
                      <Link to="/Results/consolidatedResults" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Consolidated Result</Link>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Download Fee Reciept</Link>
                      <Link to="/student/doubts" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Doubt Solver AI (ChatBot)</Link>
                      <Link to="/student/seniors" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold"style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Senior Connect (Mentorship)</Link>
                    </div>

                    {/* TW & SH BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold"style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Apply for CBT\ Offline Exam</a>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Fee Payment</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Reschedule CBT Exam\ View Application</a>
                      <Link to="/halltickets" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Hallticket Download</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CBT Practice</a>
                    </div>

                    {/* CCIC BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold"style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Results</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Photo Copy &amp; Revaluation</a>
                    </div>

                    {/* ISB ONLINE SKILLING PROGRAMMES BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      ISB ONLINE SKILLING PROGRAMMES
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Student Enrolment</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. COLLEGE SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("college")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      COLLEGE SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "college" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "college" && (
                  <div className="bg-white border-t border-gray-100">
                    {/* DIPLOMA BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Affiliation Login</Link>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>College Login</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Polycet Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>QPGD Portal</a>
                      <Link to="/hod/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Department HOD Dashboard</Link>
                      <Link to="/hod/approvals" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Student Registration Approvals</Link>
                      <Link to="/hod/students" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Department Students Roster</Link>
                      <Link to="/hod/attendance" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Department Attendance Register</Link>
                    </div>

                    {/* TW & SH BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>College/ Institute Login</Link>
                    </div>

                    {/* CCIC BANNER */}
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Exams Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Affiliation Portal</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. OTHERS SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("others")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      OTHERS SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "others" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "others" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      INSTITUTIONS
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Official Circulars &amp; Timetables</Link>
                      <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>System Administration Panel</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      STAFF
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Digital Evaluation</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      POLYCET
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/doubts" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>AI Doubt Solver Assistant</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Apply for Polycet</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. AFFILIATED COLLEGES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("colleges")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      AFFILIATED COLLEGES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "colleges" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "colleges" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/admin/colleges" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>All Affiliated Polytechnic Colleges</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Typewriting &amp; Shorthand Institutions</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Affiliated Colleges</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. COURSES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("courses")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      COURSES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "courses" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "courses" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Diploma Courses List</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Typewriting &amp; Shorthand</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>CCIC Courses</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. CONTACT-US Link */}
              <a
                href="#contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors force-bold"
              >
                <i className="fa-solid fa-phone text-slate-800 text-[13px] w-4 text-center shrink-0" />
                <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                  CONTACT-US
                </span>
              </a>

              {/* 7. MORE */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("more")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-info text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] sm:text-[12px] uppercase text-slate-800 tracking-wide force-bold" style={{ fontWeight: 600 }}>
                      MORE
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${openSubMenu === "more" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openSubMenu === "more" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider force-bold" style={{ fontWeight: 700 }}>
                      MORE
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/community" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Statewide Polytechnic Community</Link>
                      <Link to="/register/student" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Student Registration</Link>
                      <Link to="/register/hod" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>HOD Registration</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      PORTAL
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Site Map</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Tenders &amp; Downloads</a>
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Latest News Notifications</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1 force-bold" style={{ fontWeight: 700 }}>
                      RTI
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Full details of Right to Information Act</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>About Right to Information</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}>Obligations of Public Authority</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 8. LOGIN / USER SECTION (Matches Image 1 solid blue banner) */}
              <div>
                {user ? (
                  <div className="bg-[#35a5f1] text-white">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/20">
                      <div className="flex items-center gap-3 min-w-0">
                        <i className="fa-solid fa-user text-white text-[13px] w-4 text-center shrink-0" />
                        <span className="font-bold text-[11.5px] sm:text-[12px] uppercase text-white tracking-wide truncate force-bold" style={{ fontWeight: 700 }}>
                          {user.fullName || user.username} ({user.role})
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-white/20 text-center text-xs font-bold">
                      <Link
                        to={
                          user.role === "STUDENT"
                            ? "/student/dashboard"
                            : user.role === "HOD"
                              ? "/hod/dashboard"
                              : "/admin/dashboard"
                        }
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 hover:bg-white/15 transition-colors uppercase tracking-wider text-white flex items-center justify-center gap-1.5"
                      >
                        <i className="fa-solid fa-gauge-high text-xs" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="py-2.5 hover:bg-rose-600 transition-colors uppercase tracking-wider text-white flex items-center justify-center gap-1.5"
                      >
                        <i className="fa-solid fa-right-from-bracket text-xs" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-[#35a5f1] hover:bg-[#2888c9] text-white transition-colors force-bold" style={{ fontFamily: "'Muli',sans-serif",fontSize: "12px", fontWeight: "300",color: "black" }}
                  >
                    <i className="fa-solid fa-user text-white text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12px] sm:text-[13px] uppercase tracking-wide text-white force-bold" style={{ fontWeight: 600 }}>
                      LOGIN
                    </span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
