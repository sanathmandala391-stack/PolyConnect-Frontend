// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/client";

// const STAT_ITEMS = [
//   {
//     label: "Migration",
//     count: "2084",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//       </svg>
//     ),
//   },
//   {
//     label: "Interim",
//     count: "40268",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Bonafied",
//     count: "12468",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Transcript",
//     count: "4276",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Duplicate Memo",
//     count: "6161",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
//       </svg>
//     ),
//   },
//   {
//     label: "Duplicate ODC",
//     count: "31",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Transfer",
//     count: "58950",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//       </svg>
//     ),
//   },
//   {
//     label: "Name Correction",
//     count: "2409",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//       </svg>
//     ),
//   },
// ];

// export default function HomePage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   const [notificationsError, setNotificationsError] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort(
//               (a, b) =>
//                 new Date(b.timeStamp || b.NotificationDate || 0) -
//                 new Date(a.timeStamp || a.NotificationDate || 0)
//             )
//             .slice(0, 6);
//           setNotifications(sorted);
//         }
//       })
//       .catch(() => {
//         if (isMounted) setNotificationsError(true);
//       })
//       .finally(() => {
//         if (isMounted) setLoadingNotifications(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* 1. Main Hero + Notifications Section (Exact Screenshot 2 Layout) */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         {/* Left Hero Graphic Card with Navigation Arrows (7 Cols) */}
//         <div className="lg:col-span-7 gov-card overflow-hidden flex flex-col justify-between relative bg-white border border-gov-border p-6 min-h-[380px]">
//           {/* Left / Right Carousel Arrow Buttons */}
//           <button
//             className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs"
//             aria-label="Previous banner"
//           >
//             &lsaquo;
//           </button>
//           <button
//             className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs"
//             aria-label="Next banner"
//           >
//             &rsaquo;
//           </button>

//           {/* Central Telangana Rising Mascot / Emblem Motif */}
//           <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-6">
//             <div className="relative mb-3">
//               {/* Globe Number 1 Motif matching screenshot */}
//               <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
//                 <svg className="w-full h-full text-gov-navy" viewBox="0 0 100 100" fill="currentColor">
//                   {/* Stylized '1' column */}
//                   <path d="M42,15 L56,15 L56,75 L42,75 Z" fill="#0b3d63" />
//                   {/* Orbiting latitude rings */}
//                   <circle cx="50" cy="50" r="38" fill="none" stroke="#1b75bb" strokeWidth="2" strokeDasharray="3 2" />
//                   <circle cx="50" cy="50" r="28" fill="none" stroke="#00875a" strokeWidth="2" />
//                   {/* Orange flag crest */}
//                   <path d="M32,28 L50,15 L50,30 Z" fill="#e08d21" />
//                 </svg>
//               </div>
//             </div>

//             <h2 className="font-display font-black text-2xl sm:text-3xl text-gov-navy tracking-tight uppercase">
//               TELANGANA RISING
//             </h2>
//             <div className="text-xs sm:text-sm font-black tracking-widest text-[#00875a] uppercase mt-0.5">
//               CURE &ndash; PURE &ndash; RARE
//             </div>
//             <p className="text-xs text-gov-slate max-w-md mx-auto mt-2 leading-relaxed font-sans">
//               State Board of Technical Education & Training &mdash; Unified Polytechnic Student Academic & Examination Gateway
//             </p>
//           </div>
//         </div>

//         {/* Right Notifications Widget (Exact match to Screenshot 2) */}
//         <div className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-gov-border">
//           <div>
//             {/* Header: Exact match to Screenshot 2 */}
//             <div className="bg-white border-b border-gov-border px-4 py-2.5 flex items-center justify-between">
//               <span className="font-sans font-semibold text-xs md:text-sm text-[#1b75bb] flex items-center gap-1.5 uppercase tracking-wide">
//                 <svg className="w-4 h-4 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Notifications
//               </span>
//             </div>

//             {/* List with dashed dividers matching Screenshot 2 */}
//             <div className="p-3 divide-y divide-dashed divide-gov-slate/40 max-h-[320px] overflow-y-auto">
//               {loadingNotifications ? (
//                 <div className="py-12 text-center text-xs text-gov-slate">
//                   <div className="inline-block w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mb-2"></div>
//                   <p>Fetching notifications from server…</p>
//                 </div>
//               ) : notificationsError || notifications.length === 0 ? (
//                 <div className="py-10 text-center text-xs text-gov-slate">
//                   No notifications recorded currently.
//                 </div>
//               ) : (
//                 notifications.map((n, idx) => (
//                   <div key={n.ID || idx} className="py-2.5 first:pt-1 last:pb-1">
//                     <a
//                       href={n.Url || `/circulars`}
//                       target={n.Url ? "_blank" : "_self"}
//                       rel="noreferrer"
//                       className="group flex items-start gap-2 text-xs leading-snug hover:text-gov-blue transition-colors font-sans"
//                     >
//                       <span className="text-slate-500 font-bold shrink-0 text-[11px] mt-0.5">
//                         {n.NotificationDate ? new Date(n.NotificationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-") : "27-07-2026"}
//                       </span>
//                       <span className="text-[#1b75bb] group-hover:underline font-medium text-xs">
//                         {n.Title}
//                       </span>
//                     </a>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Bottom View All Button matching Screenshot 2 */}
//           <div className="p-3 bg-white border-t border-gov-border flex justify-end">
//             <Link
//               to="/circulars"
//               className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-4 py-1.5 rounded-xs shadow-xs transition-colors flex items-center gap-1 font-sans"
//             >
//               View All
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* 2. Statistics Section (Exact match to Screenshot 2 blue ribbon & 8 cards) */}
//       <section className="gov-card overflow-hidden">
//         <div className="bg-[#1b75bb] text-white py-1.5 px-4 text-center font-semibold text-xs tracking-wider font-sans">
//           Current academic year student services statistics
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-y sm:divide-y-0 divide-gov-border bg-white text-center">
//           {STAT_ITEMS.map((item) => (
//             <div key={item.label} className="flex flex-col justify-between">
//               <div className="p-2.5">
//                 <span className="text-[11px] font-bold text-gov-slate block leading-tight mb-2 font-sans">
//                   {item.label}
//                 </span>
//                 <div className="w-7 h-7 mx-auto rounded-full bg-blue-50 text-[#1b75bb] flex items-center justify-center mb-1">
//                   {item.icon}
//                 </div>
//               </div>
//               <div className="bg-[#1b75bb] text-white font-mono font-bold text-sm py-1">
//                 {item.count}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. OUR COURSES Section (Exact match to Screenshot 3) */}
//       <section className="space-y-4 pt-4">
//         <h2 className="font-display font-black text-xl md:text-2xl text-gov-navy uppercase text-center tracking-wide">
//           OUR COURSES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Card 1: Diploma (Blue #1e70bf) */}
//           <Link
//             to="/student/results"
//             className="rounded-xs p-6 bg-[#1e70bf] hover:bg-[#185ea3] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Diploma</h3>
//               <p className="text-xs text-white/80 mt-0.5">3-Year Polytechnic Engineering Programs</p>
//             </div>
//           </Link>

//           {/* Card 2: Type Writing & Shorthand (Cyan #00b4d8) */}
//           <Link
//             to="/circulars"
//             className="rounded-xs p-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Type Writing & Shorthand</h3>
//               <p className="text-xs text-white/80 mt-0.5">TWSH Technical Examinations & Certifications</p>
//             </div>
//           </Link>

//           {/* Card 3: CCIC (Green #00c853) */}
//           <Link
//             to="/circulars"
//             className="rounded-xs p-6 bg-[#00c853] hover:bg-[#00a844] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">CCIC</h3>
//               <p className="text-xs text-white/80 mt-0.5">Certificate Courses In Computers & IT</p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }



























































































//This is okay


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/client";

// const STAT_ITEMS = [
//   {
//     label: "Migration",
//     count: "2084",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//       </svg>
//     ),
//   },
//   {
//     label: "Interim",
//     count: "40268",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Bonafied",
//     count: "12468",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Transcript",
//     count: "4276",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Duplicate Memo",
//     count: "6161",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
//       </svg>
//     ),
//   },
//   {
//     label: "Duplicate ODC",
//     count: "31",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//       </svg>
//     ),
//   },
//   {
//     label: "Transfer",
//     count: "58950",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//       </svg>
//     ),
//   },
//   {
//     label: "Name Correction",
//     count: "2409",
//     icon: (
//       <svg className="w-5 h-5 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//       </svg>
//     ),
//   },
// ];


// // 1. Drop your real banner images in the public folder (e.g. public/images/banners/)
// //    and list them here — title/subtitle are optional per-slide captions.
// const BANNER_SLIDES = [
//   {
//     src: "https://www.sbtet.telangana.gov.in/Slides/tg-logo-min.jpg.Png",
//     alt: "Telangana Rising",
//     // title: "TELANGANA RISING",
//     // subtitle: "CURE – PURE – RARE",
//   },
//   {
//     src: "https://sbtet.telangana.gov.in/Slides/ConstitutionalDay26112024.jpg.Png",
//     alt: "SBTET Diploma Admissions",
//     // title: "DIPLOMA ADMISSIONS 2026-27",
//     // subtitle: "Apply Online Before the Last Date",
//   },
//   {
//     src: "https://sbtet.telangana.gov.in/Slides/upload.jpg.Png",
//     alt: "Examination Results",
//     // title: "EXAMINATION RESULTS",
//     // subtitle: "Mid & Semester Results Now Available",
//   },
//     {
//     src: "https://sbtet.telangana.gov.in/Slides/Welcoming%20CTE.jpeg.Png",
//     alt: "Examination Results",
//     // title: "EXAMINATION RESULTS",
//     // subtitle: "Mid & Semester Results Now Available",
//   },

// ];

// const SLIDE_INTERVAL_MS = 2500;

// export default function HomePage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   const [notificationsError, setNotificationsError] = useState(false);

//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort(
//               (a, b) =>
//                 new Date(b.timeStamp || b.NotificationDate || 0) -
//                 new Date(a.timeStamp || a.NotificationDate || 0)
//             )
//             .slice(0, 6);
//           setNotifications(sorted);
//         }
//       })
//       .catch(() => {
//         if (isMounted) setNotificationsError(true);
//       })
//       .finally(() => {
//         if (isMounted) setLoadingNotifications(false);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Auto-advance the banner carousel; pauses while the user is hovering it.
//   useEffect(() => {
//     if (isPaused || BANNER_SLIDES.length <= 1) return;
//     const id = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//     }, SLIDE_INTERVAL_MS);
//     return () => clearInterval(id);
//   }, [isPaused]);

//   function goToPrevSlide() {
//     setActiveSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
//   }

//   function goToNextSlide() {
//     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   }

//   return (
//     <div className="space-y-6">
//       {/* 1. Main Hero + Notifications Section (Exact Screenshot 2 Layout) */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         {/* Left Hero Banner Carousel Card with Navigation Arrows (7 Cols) */}
//         <div
//           className="lg:col-span-7 gov-card overflow-hidden relative bg-white border border-gov-border min-h-[380px]"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           {/* Left / Right Carousel Arrow Buttons — now wired to change slides */}
//           <button
//             onClick={goToPrevSlide}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs"
//             aria-label="Previous banner"
//           >
//             &lsaquo;
//           </button>
//           <button
//             onClick={goToNextSlide}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs"
//             aria-label="Next banner"
//           >
//             &rsaquo;
//           </button>

//           {/* Sliding Banner Images */}
//           <div className="relative w-full h-full min-h-[380px]">
//             {BANNER_SLIDES.map((slide, idx) => (
//               <div
//                 key={slide.src}
//                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//                   idx === activeSlide ? "opacity-100 z-[1]" : "opacity-0 pointer-events-none"
//                 }`}
//               >
//                 <img
//                   src={slide.src}
//                   alt={slide.alt}
//                   className="absolute inset-0 w-full h-full object-cover"
//                   onError={(e) => {
//                     e.currentTarget.style.display = "none";
//                   }}
//                 />

//                 {/* Caption strip — only the bottom of the photo darkens, the image itself stays crisp */}
//                 {(slide.title || slide.subtitle) && (
//                   <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-10 pb-4 px-5 text-center">
//                     {slide.title && (
//                       <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-tight uppercase drop-shadow">
//                         {slide.title}
//                       </h2>
//                     )}
//                     {slide.subtitle && (
//                       <div className="text-[11px] sm:text-xs font-bold tracking-widest text-emerald-300 uppercase mt-0.5">
//                         {slide.subtitle}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Dot Indicators */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
//             {BANNER_SLIDES.map((slide, idx) => (
//               <button
//                 key={slide.src}
//                 onClick={() => setActiveSlide(idx)}
//                 aria-label={`Go to slide ${idx + 1}`}
//                 className={`h-1.5 rounded-full transition-all ${
//                   idx === activeSlide ? "w-5 bg-[#1b75bb]" : "w-1.5 bg-gov-border hover:bg-gov-slate"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right Notifications Widget (Exact match to Screenshot 2) */}
//         <div className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-gov-border">
//           <div>
//             {/* Header: Exact match to Screenshot 2 */}
//             <div className="bg-white border-b border-gov-border px-4 py-2.5 flex items-center justify-between">
//               <span className="font-sans font-semibold text-xs md:text-sm text-[#1b75bb] flex items-center gap-1.5 uppercase tracking-wide">
//                 <svg className="w-4 h-4 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Notifications
//               </span>
//             </div>

//             {/* List with dashed dividers matching Screenshot 2 */}
//             <div className="p-3 divide-y divide-dashed divide-gov-slate/40 max-h-[320px] overflow-y-auto">
//               {loadingNotifications ? (
//                 <div className="py-12 text-center text-xs text-gov-slate">
//                   <div className="inline-block w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mb-2"></div>
//                   <p>Fetching notifications from server…</p>
//                 </div>
//               ) : notificationsError || notifications.length === 0 ? (
//                 <div className="py-10 text-center text-xs text-gov-slate">
//                   No notifications recorded currently.
//                 </div>
//               ) : (
//                 notifications.map((n, idx) => (
//                   <div key={n.ID || idx} className="py-2.5 first:pt-1 last:pb-1">
//                     <a
//                       href={n.Url || `/circulars`}
//                       target={n.Url ? "_blank" : "_self"}
//                       rel="noreferrer"
//                       className="group flex items-start gap-2 text-xs leading-snug hover:text-gov-blue transition-colors font-sans"
//                     >
//                       <span className="text-slate-500 font-bold shrink-0 text-[11px] mt-0.5">
//                         {n.NotificationDate ? new Date(n.NotificationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-") : "27-07-2026"}
//                       </span>
//                       <span className="text-[#1b75bb] group-hover:underline font-medium text-xs">
//                         {n.Title}
//                       </span>
//                     </a>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Bottom View All Button matching Screenshot 2 */}
//           <div className="p-3 bg-white border-t border-gov-border flex justify-end">
//             <Link
//               to="/circulars"
//               className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-4 py-1.5 rounded-xs shadow-xs transition-colors flex items-center gap-1 font-sans"
//             >
//               View All
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* 2. Statistics Section (Exact match to Screenshot 2 blue ribbon & 8 cards) */}
//       <section className="gov-card overflow-hidden">
//         <div className="bg-[#1b75bb] text-white py-1.5 px-4 text-center font-semibold text-xs tracking-wider font-sans">
//           Current academic year student services statistics
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-y sm:divide-y-0 divide-gov-border bg-white text-center">
//           {STAT_ITEMS.map((item) => (
//             <div key={item.label} className="flex flex-col justify-between">
//               <div className="p-2.5">
//                 {/* <span className="text-[11px] font-bold text-gov-slate block leading-tight mb-2 font-sans">
//                   {item.label}
//                 </span> */}
//                 <span className="text-[11px] font-bold text-gov-slate block leading-tight mb-2 font-sans uppercase tracking-wide">
//   {item.label}
// </span>
//                 <div className="w-7 h-7 mx-auto rounded-full bg-blue-50 text-[#1b75bb] flex items-center justify-center mb-1">
//                   {item.icon}
//                 </div>
//               </div>
//               {/* <div className="bg-[#1b75bb] text-white font-mono font-bold text-sm py-1">
//                 {item.count}
//               </div> */}
//               <div className="bg-[#1b75bb] text-white font-mono font-bold text-sm py-1 tracking-wider">
//   {item.count}
// </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. OUR COURSES Section (Exact match to Screenshot 3) */}
//       <section className="space-y-4 pt-4">
//         <h2 className="font-display font-black text-xl md:text-2xl text-gov-navy uppercase text-center tracking-wide">
//           OUR COURSES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Card 1: Diploma (Blue #1e70bf) */}
//           <Link
//             to="/student/results"
//             className="rounded-xs p-6 bg-[#1e70bf] hover:bg-[#185ea3] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Diploma</h3>
//               <p className="text-xs text-white/80 mt-0.5">3-Year Polytechnic Engineering Programs</p>
//             </div>
//           </Link>

//           {/* Card 2: Type Writing & Shorthand (Cyan #00b4d8) */}
//           <Link
//             to="/circulars"
//             className="rounded-xs p-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Type Writing & Shorthand</h3>
//               <p className="text-xs text-white/80 mt-0.5">TWSH Technical Examinations & Certifications</p>
//             </div>
//           </Link>

//           {/* Card 3: CCIC (Green #00c853) */}
//           <Link
//             to="/circulars"
//             className="rounded-xs p-6 bg-[#00c853] hover:bg-[#00a844] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5"
//           >
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">CCIC</h3>
//               <p className="text-xs text-white/80 mt-0.5">Certificate Courses In Computers & IT</p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }



















































































































































































































// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Award, Megaphone, ClipboardList } from "lucide-react";
// import api from "../api/client";
// import notificationIcon from "../images/ic.png"
// import notificationRowIcon from "../images/row.png"

// // --- Stats data ---
// const STAT_ITEMS = [
//   { label: "Migration", count: "2086", suffix: "Certificate Issued", icon: Award },
//   { label: "Interim", count: "40278", suffix: "Certificate Issued", icon: Award },
//   { label: "Bonafied", count: "12468", suffix: "Certificate Issued", icon: Award },
//   { label: "Transcript", count: "4279", suffix: "Transcript Issued", icon: Megaphone },
//   { label: "Duplicate Memo", count: "6164", suffix: "Memo Issued", icon: Megaphone },
//   { label: "Duplicate ODC", count: "31", suffix: "Certificate Issued", icon: Award },
//   { label: "Transfer", count: "58973", suffix: "Certificate Issued", icon: Award },
//   { label: "Name Correction", count: "2411", suffix: "Performed", icon: ClipboardList },
// ];

// function StatCard({ label, count, suffix, icon: Icon }) {
//   return (
//     <div className="group border border-blue-200 first:border-l last:border-r overflow-hidden">
//       <div className="bg-white group-hover:bg-[#1b75bb] transition-colors duration-200 px-3 pt-4 pb-3 text-center">
//         <span className="block text-xs font-bold text-[#1b75bb] group-hover:text-white transition-colors duration-200 mb-3">
//           {label}
//         </span>
//         <Icon
//           className="w-7 h-7 mx-auto text-[#1b75bb] group-hover:text-white transition-colors duration-200"
//           strokeWidth={1.75}
//         />
//       </div>
//       <div className="bg-[#1b75bb] text-white text-center py-3">
//         <div className="font-bold text-2xl leading-tight">{count}</div>
//         <div className="text-[11px] font-medium mt-0.5">{suffix}</div>
//       </div>
//     </div>
//   );
// }

// function StatsRibbon() {
//   return (
//     <section className="gov-card overflow-hidden">
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-white">
//         {STAT_ITEMS.map((item) => (
//           <StatCard key={item.label} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // --- Banner slides ---
// const BANNER_SLIDES = [
//   { src: "https://www.sbtet.telangana.gov.in/Slides/tg-logo-min.jpg.Png", alt: "Banner 1" },
//   { src: "https://sbtet.telangana.gov.in/Slides/ConstitutionalDay26112024.jpg.Png", alt: "Banner 2" },
//   { src: "https://sbtet.telangana.gov.in/Slides/upload.jpg.Png", alt: "Banner 3" },
//   { src: "https://sbtet.telangana.gov.in/Slides/Welcoming%20CTE.jpeg.Png", alt: "Banner 4" },
// ];

// const SLIDE_INTERVAL_MS = 2000;

// export default function HomePage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   const [notificationsError, setNotificationsError] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort((a, b) => new Date(b.timeStamp || b.NotificationDate || 0) - new Date(a.timeStamp || a.NotificationDate || 0))
//             .slice(0, 5);
//           setNotifications(sorted);
//         }
//       })
//       .catch(() => { if (isMounted) setNotificationsError(true); })
//       .finally(() => { if (isMounted) setLoadingNotifications(false); });
//     return () => { isMounted = false; };
//   }, []);

//   useEffect(() => {
//     if (isPaused || BANNER_SLIDES.length <= 1) return;
//     const id = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//     }, SLIDE_INTERVAL_MS);
//     return () => clearInterval(id);
//   }, [isPaused]);

//   function goToPrevSlide() {
//     setActiveSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
//   }
//   function goToNextSlide() {
//     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   }

//   return (
//     <div className="space-y-6">
//       {/* 1. Hero banner + notifications */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         {/* <div
//           className="lg:col-span-7 gov-card overflow-hidden relative bg-white border border-gov-border min-h-[380px]"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         > */}
// <div
//   className="lg:col-span-6 gov-card overflow-hidden relative bg-white h-[320px] border-0"
//   onMouseEnter={() => setIsPaused(true)}
//   onMouseLeave={() => setIsPaused(false)}
// >
//           <button onClick={goToPrevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs" aria-label="Previous banner">&lsaquo;</button>
//           <button onClick={goToNextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs" aria-label="Next banner">&rsaquo;</button>
// {/* 
//           <div className="relative w-full h-full min-h-[380px]"> */}
//           {/* <div className="relative w-full h-full">
//             {BANNER_SLIDES.map((slide, idx) => (
//               <div key={slide.src} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeSlide ? "opacity-100 z-[1]" : "opacity-0 pointer-events-none"}`}>
//                 <img src={slide.src} alt={slide.alt} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
//               </div>
//             ))}
//           </div> */}
// <div className="relative w-full h-full overflow-hidden">
//   <div
//     className="flex h-full transition-transform duration-700 ease-in-out"
//     style={{ transform: `translateX(-${activeSlide * 100}%)` }}
//   >
//     {BANNER_SLIDES.map((slide) => (
//       <div key={slide.src} className="w-full h-full shrink-0">
//         <img
//           src={slide.src}
//           alt={slide.alt}
//           className="w-full h-full object-cover"
//           onError={(e) => { e.currentTarget.style.display = "none"; }}
//         />
//       </div>
//     ))}
//   </div>
// </div>







//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
//             {BANNER_SLIDES.map((slide, idx) => (
//               <button key={slide.src} onClick={() => setActiveSlide(idx)} aria-label={`Go to slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === activeSlide ? "w-5 bg-[#1b75bb]" : "w-1.5 bg-gov-border hover:bg-gov-slate"}`} />
//             ))}
//           </div>
//         </div>

//         {/* <div className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-gov-border"> */}
//         {/* <div
//   className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-gov-border"
//   style={{ fontFamily: "'Mulish', sans-serif" }}
// >
//           <div>
//             <div className="bg-white border-b border-gov-border px-4 py-2.5 flex items-center justify-between">
//               <span className="font-sans font-semibold text-xs md:text-sm text-[#1b75bb] flex items-center gap-1.5 uppercase tracking-wide">
//                 <svg className="w-4 h-4 text-[#1b75bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Notifications
//               </span>
//             </div>

//             <div className="p-3 divide-y divide-dashed divide-gov-slate/40 max-h-[320px] overflow-y-auto">
//               {loadingNotifications ? (
//                 <div className="py-12 text-center text-xs text-gov-slate">
//                   <div className="inline-block w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mb-2"></div>
//                   <p>Fetching notifications from server…</p>
//                 </div>
//               ) : notificationsError || notifications.length === 0 ? (
//                 <div className="py-10 text-center text-xs text-gov-slate">No notifications recorded currently.</div>
//               ) : (
//                 notifications.map((n, idx) => (
//                   <div key={n.ID || idx} className="py-2.5 first:pt-1 last:pb-1">
//                     <a href={n.Url || `/circulars`} target={n.Url ? "_blank" : "_self"} rel="noreferrer" className="group flex items-start gap-2 text-xs leading-snug hover:text-gov-blue transition-colors font-sans">
//                       <span className="text-slate-500 font-bold shrink-0 text-[11px] mt-0.5">
//                         {n.NotificationDate ? new Date(n.NotificationDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-") : ""}
//                       </span>
//                       <span className="text-[#1b75bb] group-hover:underline font-medium text-xs">{n.Title}</span>
//                     </a>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           <div className="p-3 bg-white border-t border-gov-border flex justify-end">
//             <Link to="/circulars" className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-4 py-1.5 rounded-xs shadow-xs transition-colors flex items-center gap-1 font-sans">
//               View All
//             </Link>
//           </div>
//         </div> */}


//         {/*New code for Notifications */}

      
//         {/* <div
//   className="lg:col-span-6 gov-card flex flex-col justify-between overflow-hidden border border-gov-border"
//   style={{ fontFamily: "'Mulish', sans-serif" }}
// >  */}
//   {/* <div
//   className="lg:col-span-6 gov-card flex flex-col justify-between overflow-hidden border border-gov-border"
//   style={{ fontFamily: "'Mulish', sans-serif" }}
// > */}


// <div className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-gov-border h-[320px]">

//   <div>
//     {/* <div className="bg-white border-b border-gov-border px-4 py-1.5 flex items-center justify-between"> */}
//     <div className="bg-white border-b border-gov-border px-4 py-1 flex items-center justify-between">
//       {/* <span className="font-sans font-medium text-sm md:text-base text-[#1b75bb] flex items-center gap-1.5">
       
//         <i className="fa-solid fa-list text-[#1b75bb] text-sm"></i>
//         Notifications
//       </span> */}
//  {/* <span className="font-sans font-medium text-[11px] text-[#1b75bb] flex items-center gap-1.5">
//   <i className="fa-solid fa-list text-[#1b75bb] text-[11px]"></i>
//   Notifications
// </span> */}
// {/* <span className="font-sans font-medium text-[11px] text-[#007BFF] flex items-center gap-1.5">
//   <i className="fa-solid fa-list text-[#007BFF] text-xs"></i>
//   Notifications
// </span> */}
// {/* <span className="font-sans font-medium text-xs md:text-sm text-[#007BFF] flex items-center gap-1.5">
//   <img src={notificationIcon} alt="Notifications" className="w-4 h-4" />
//   Notifications
// </span> */}
// <span className="font-['Mulish'] text-[12px] font-normal text-[#007BFF] flex items-center gap-1.5">
//   <img src={notificationIcon} alt="Notifications" className="w-4 h-4" />
//   Notifications
// </span>
//     </div>

//     {/* <div className="p-3 divide-y divide-gray-200 max-h-[320px] overflow-y-auto"> */}
// {/* <div className="p-3 divide-y divide-dashed divide-gray-300"> */}
// {/* <div className="p-3 divide-y divide-gray-200"> */}
// <div className="px-3 py-1.5 divide-y divide-gray-200">
//       {loadingNotifications ? (
//         <div className="py-12 text-center text-xs text-gov-slate">
//           <div className="inline-block w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mb-2"></div>
//           <p>Fetching notifications from server…</p>
//         </div>
//       ) : notificationsError || notifications.length === 0 ? (
//         <div className="py-10 text-center text-xs text-gov-slate">No notifications recorded currently.</div>
//       ) : (
//         notifications.map((n, idx) => (
//         //  <div key={n.ID || idx} className="py-3 first:pt-1 last:pb-1">
//         <div key={n.ID || idx} className="py-1.5 first:pt-1 last:pb-1">
//   <a
//     href={n.Url || "/circulars"}
//     target={n.Url ? "_blank" : "_self"}
//     rel={n.Url ? "noopener noreferrer" : undefined}
//     className="group flex items-start gap-2 text-xs leading-snug hover:text-gov-blue transition-colors"
//   >
//     {/* <svg
//       className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM9 12h6m-6 4h4"
//       />
//     </svg> */}
//     <img
//   src={notificationRowIcon}
//   alt=""
//   className="w-6 h-4 shrink-0 mt-0.5"
// />
// {/* 
//     <span className="text-black font-bold shrink-0 text-[11px] mt-0.5">
//       {n.NotificationDate
//         ? new Date(n.NotificationDate)
//             .toLocaleDateString("en-GB", {
//               day: "2-digit",
//               month: "2-digit",
//               year: "numeric",
//             })
//             .replace(/\//g, "-")
//         : ""}
//     </span> */}

//     {/* <span className="text-[#1b75bb] group-hover:underline font-medium text-xs">
//       {n.Title}
//     </span> */}


// <span>
//   <span className="text-black font-semibold text-xs">
//     {n.NotificationDate
//       ? new Date(n.NotificationDate)
//           .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
//           .replace(/\//g, "-")
//       : ""}
//   </span>{" "}
//   <span className="text-[#007BFF] text-xs">{n.Title}</span>
// </span>




//   </a>
// </div>
//         ))
//       )}
//     </div>
//   </div>








//   {/* <div className="p-3 bg-white border-t border-gov-border flex justify-end"> */}
//   <div className="px-3 py-1.5 bg-white border-t border-gov-border flex justify-end">
//     {/* <Link
//       to="/circulars"
//       className="bg-[#1b75bb] hover:bg-[#13578c] text-white text-xs font-bold px-5 py-2 rounded-xs shadow-xs transition-colors flex items-center gap-1 font-sans"
//     >
//       View All
//     </Link> */}

// {/* <Link
//   to="/circulars"
//   className="bg-[#35a5f1] hover:bg-[#1e8fdb] text-white text-sm font-medium px-5 py-2.5 rounded-sm shadow-sm transition-colors"
// >View All</Link> */}

// <Link
//   to="/circulars"
//   className="bg-[#35a5f1] hover:bg-[#1e8fdb] text-white text-xs font-medium px-4 py-1.5 rounded-sm shadow-sm transition-colors"
// >View All</Link>

//   </div>
// </div>
//       </div>

//       {/* 2. Stats ribbon — hover-flip cards */}
//       <StatsRibbon />

//       {/* 3. Courses section */}
//       <section className="space-y-4 pt-4">
//         <h2 className="font-display font-black text-xl md:text-2xl text-gov-navy uppercase text-center tracking-wide">
//           OUR COURSES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link to="/student/results" className="rounded-xs p-6 bg-[#1e70bf] hover:bg-[#185ea3] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Diploma</h3>
//               <p className="text-xs text-white/80 mt-0.5">3-Year Polytechnic Engineering Programs</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Type Writing & Shorthand</h3>
//               <p className="text-xs text-white/80 mt-0.5">TWSH Technical Examinations & Certifications</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00c853] hover:bg-[#00a844] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">CCIC</h3>
//               <p className="text-xs text-white/80 mt-0.5">Certificate Courses In Computers & IT</p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

































































































// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Award, Megaphone, ClipboardList } from "lucide-react";
// import api from "../api/client";
// import notificationIcon from "../images/ic.png";
// import notificationRowIcon from "../images/row.png";

// // --- Stats data ---
// const STAT_ITEMS = [
//   { label: "Migration", count: "2086", suffix: "Certificate Issued", icon: Award },
//   { label: "Interim", count: "40278", suffix: "Certificate Issued", icon: Award },
//   { label: "Bonafied", count: "12468", suffix: "Certificate Issued", icon: Award },
//   { label: "Transcript", count: "4279", suffix: "Transcript Issued", icon: Megaphone },
//   { label: "Duplicate Memo", count: "6164", suffix: "Memo Issued", icon: Megaphone },
//   { label: "Duplicate ODC", count: "31", suffix: "Certificate Issued", icon: Award },
//   { label: "Transfer", count: "58973", suffix: "Certificate Issued", icon: Award },
//   { label: "Name Correction", count: "2411", suffix: "Performed", icon: ClipboardList },
// ];

// function StatCard({ label, count, suffix, icon: Icon }) {
//   return (
//     <div className="group border border-blue-200 first:border-l last:border-r overflow-hidden">
//       <div className="bg-white group-hover:bg-[#1b75bb] transition-colors duration-200 px-3 pt-4 pb-3 text-center">
//         <span className="block text-xs font-bold text-[#1b75bb] group-hover:text-white transition-colors duration-200 mb-3">
//           {label}
//         </span>
//         <Icon
//           className="w-7 h-7 mx-auto text-[#1b75bb] group-hover:text-white transition-colors duration-200"
//           strokeWidth={1.75}
//         />
//       </div>
//       <div className="bg-[#1b75bb] text-white text-center py-3">
//         <div className="font-bold text-2xl leading-tight">{count}</div>
//         <div className="text-[11px] font-medium mt-0.5">{suffix}</div>
//       </div>
//     </div>
//   );
// }

// function StatsRibbon() {
//   return (
//     <section className="gov-card overflow-hidden">
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-white">
//         {STAT_ITEMS.map((item) => (
//           <StatCard key={item.label} {...item} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // --- Banner slides ---
// const BANNER_SLIDES = [
//   { src: "https://www.sbtet.telangana.gov.in/Slides/tg-logo-min.jpg.Png", alt: "Banner 1" },
//   { src: "https://sbtet.telangana.gov.in/Slides/ConstitutionalDay26112024.jpg.Png", alt: "Banner 2" },
//   { src: "https://sbtet.telangana.gov.in/Slides/upload.jpg.Png", alt: "Banner 3" },
//   { src: "https://sbtet.telangana.gov.in/Slides/Welcoming%20CTE.jpeg.Png", alt: "Banner 4" },
// ];

// const SLIDE_INTERVAL_MS = 2000;

// export default function HomePage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   const [notificationsError, setNotificationsError] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort((a, b) => new Date(b.timeStamp || b.NotificationDate || 0) - new Date(a.timeStamp || a.NotificationDate || 0))
//             .slice(0, 5);
//           setNotifications(sorted);
//         }
//       })
//       .catch(() => { if (isMounted) setNotificationsError(true); })
//       .finally(() => { if (isMounted) setLoadingNotifications(false); });
//     return () => { isMounted = false; };
//   }, []);

//   useEffect(() => {
//     if (isPaused || BANNER_SLIDES.length <= 1) return;
//     const id = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//     }, SLIDE_INTERVAL_MS);
//     return () => clearInterval(id);
//   }, [isPaused]);

//   function goToPrevSlide() {
//     setActiveSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
//   }
//   function goToNextSlide() {
//     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   }

//   return (
//     <div className="space-y-6">
//       {/* 1. Hero banner + notifications */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         <div
//           className="lg:col-span-6 gov-card overflow-hidden relative bg-white h-[320px] border-0"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <button onClick={goToPrevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs" aria-label="Previous banner">&lsaquo;</button>
//           <button onClick={goToNextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-sky-300 hover:bg-sky-400 text-white font-bold flex items-center justify-center rounded-xs shadow-xs" aria-label="Next banner">&rsaquo;</button>

//           <div className="relative w-full h-full overflow-hidden">
//             <div
//               className="flex h-full transition-transform duration-700 ease-in-out"
//               style={{ transform: `translateX(-${activeSlide * 100}%)` }}
//             >
//               {BANNER_SLIDES.map((slide) => (
//                 <div key={slide.src} className="w-full h-full shrink-0">
//                   <img
//                     src={slide.src}
//                     alt={slide.alt}
//                     className="w-full h-full object-cover"
//                     onError={(e) => { e.currentTarget.style.display = "none"; }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
//             {BANNER_SLIDES.map((slide, idx) => (
//               <button key={slide.src} onClick={() => setActiveSlide(idx)} aria-label={`Go to slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === activeSlide ? "w-5 bg-[#1b75bb]" : "w-1.5 bg-gov-border hover:bg-gov-slate"}`} />
//             ))}
//           </div>
//         </div>

//         {/* Notifications */}
//        <div
//   className="lg:col-span-5 gov-card flex flex-col justify-between overflow-hidden border border-[#c8d1db] h-[320px]"
//   style={{ fontFamily: "'Mulish', sans-serif" }}
// >
//   <div className="overflow-y-auto">
//     {/* Header */}
//     <div className="px-4 py-2.5 border-b border-[#cbd5e1] flex items-center gap-2">
//       <img src={notificationIcon} alt="Notifications" className="w-[18px] h-[18px] shrink-0" />
//       <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal">
//         Notifications
//       </h2>
//     </div>

//     {/* List */}
//     <div className="px-4 pt-2 pb-0">
//       {loadingNotifications ? (
//         <div className="py-8 text-center text-xs text-gov-slate">
//           <div className="inline-block w-6 h-6 border-2 border-gov-blue border-t-transparent rounded-full animate-spin mb-2"></div>
//           <p>Fetching notifications from server…</p>
//         </div>
//       ) : notificationsError || notifications.length === 0 ? (
//         <div className="py-8 text-center text-xs text-gov-slate">No notifications recorded currently.</div>
//       ) : (
//         <ul className="list-none m-0 p-0">
//           {notifications.map((n, idx) => (
//             <li key={n.ID || idx} className="py-2">
              
//              <a href={n.Url || "/circulars"} target={n.Url ? "_blank" : "_self"} rel={n.Url ? "noopener noreferrer" : undefined} className="flex items-start gap-2 no-underline">
//   <span className="mt-[2px] shrink-0 inline-flex items-center justify-center">
//     <img src={notificationRowIcon} alt="" className="w-[16px] h-[13px]" />
//   </span>
//   <div className="text-[12.5px] leading-[19px] tracking-[0.01em]">
//     <span className="text-[#222222] font-semibold mr-1.5 inline-block">
//       {n.NotificationDate
//         ? new Date(n.NotificationDate)
//             .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
//             .replace(/\//g, "-")
//         : ""}
//     </span>
//     <span className="text-[#0084ff] hover:underline">{n.Title}</span>
//   </div>
// </a>

//               {idx < notifications.length - 1 && (
//                 <div className="mt-2 border-b-[1.2px] border-dotted border-[#9ca3af]" />
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   </div>

//   {/* View All */}
//   <div className="flex justify-end px-4 py-2">
//     <Link
//       to="/circulars"
//       className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-[13px] font-normal px-6 py-2 rounded-none transition-colors"
//     >
//       View All
//     </Link>
//   </div>
// </div>
//       </div>

//       {/* 2. Stats ribbon — hover-flip cards */}
//       <StatsRibbon />

//       {/* 3. Courses section */}
//       <section className="space-y-4 pt-4">
//         <h2 className="font-display font-black text-xl md:text-2xl text-gov-navy uppercase text-center tracking-wide">
//           OUR COURSES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link to="/student/results" className="rounded-xs p-6 bg-[#1e70bf] hover:bg-[#185ea3] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Diploma</h3>
//               <p className="text-xs text-white/80 mt-0.5">3-Year Polytechnic Engineering Programs</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Type Writing & Shorthand</h3>
//               <p className="text-xs text-white/80 mt-0.5">TWSH Technical Examinations & Certifications</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00c853] hover:bg-[#00a844] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">CCIC</h3>
//               <p className="text-xs text-white/80 mt-0.5">Certificate Courses In Computers & IT</p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }






























































































// import { useEffect, useState,useRef } from "react";
// import { Link } from "react-router-dom";
// import { Award, Megaphone, ClipboardList } from "lucide-react";
// import api from "../api/client";
// import notificationIcon from "../images/ic.png";
// import notificationRowIcon from "../images/row.png";

// // --- Stats data ---
// const STAT_ITEMS = [
//   {
//     label: "Migration",
//     count: "2086",
//     suffix: "Certificate Issued",
//     icon: Award,
//   },
//   {
//     label: "Interim",
//     count: "40278",
//     suffix: "Certificate Issued",
//     icon: Award,
//   },
//   {
//     label: "Bonafied",
//     count: "12468",
//     suffix: "Certificate Issued",
//     icon: Award,
//   },
//   {
//     label: "Transcript",
//     count: "4279",
//     suffix: "Transcript Issued",
//     icon: Megaphone,
//   },
//   {
//     label: "Duplicate Memo",
//     count: "6164",
//     suffix: "Memo Issued",
//     icon: Megaphone,
//   },
//   {
//     label: "Duplicate ODC",
//     count: "31",
//     suffix: "Certificate Issued",
//     icon: Award,
//   },
//   {
//     label: "Transfer",
//     count: "58973",
//     suffix: "Certificate Issued",
//     icon: Award,
//   },
//   {
//     label: "Name Correction",
//     count: "2411",
//     suffix: "Performed",
//     icon: ClipboardList,
//   },
// ];

// // --- Stat Card ---
// function StatCard({ label, count, suffix, icon: Icon }) {
//   return (
//     <div className="group border border-blue-200 first:border-l last:border-r overflow-hidden">
//       <div className="bg-white group-hover:bg-[#1b75bb] transition-colors duration-200 px-3 pt-4 pb-3 text-center">
//         <span className="block text-xs font-bold text-[#1b75bb] group-hover:text-white transition-colors duration-200 mb-3">
//           {label}
//         </span>

//         <Icon
//           className="w-7 h-7 mx-auto text-[#1b75bb] group-hover:text-white transition-colors duration-200"
//           strokeWidth={1.75}
//         />
//       </div>

//       <div className="bg-[#1b75bb] text-white text-center py-3">
//         <div className="font-bold text-2xl leading-tight">
//           {count}
//         </div>

//         <div className="text-[11px] font-medium mt-0.5">
//           {suffix}
//         </div>
//       </div>
//     </div>
//   );
// }
// function StatsRibbon() {
//   return (
//     <section className="gov-card overflow-hidden">
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-white">
//         {STAT_ITEMS.map((item) => (
//           <StatCard
//             key={item.label}
//             label={item.label}
//             count={item.count}
//             suffix={item.suffix}
//             icon={item.icon}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// // --- Banner slides ---
// const BANNER_SLIDES = [
//   { src: "https://www.sbtet.telangana.gov.in/Slides/tg-logo-min.jpg.Png", alt: "Banner 1" },
//   { src: "https://sbtet.telangana.gov.in/Slides/Welcoming%20CTE.jpeg.Png", alt: "Banner 2" },
//   { src: "https://sbtet.telangana.gov.in/Slides/ConstitutionalDay26112024.jpg.Png", alt: "Banner 3" },
//   { src: "https://sbtet.telangana.gov.in/Slides/upload.jpg.Png", alt: "Banner 4" },
// ];

// const SLIDE_INTERVAL_MS = 2000;

// export default function HomePage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);
//   const [notificationsError, setNotificationsError] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isWrapping, setIsWrapping] = useState(false);
//   const [enableTransition, setEnableTransition] = useState(true);
//   const prevSlideRef = useRef(0);

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/sbtet/circulars")
//       .then((res) => {
//         if (!isMounted) return;
//         if (Array.isArray(res.data)) {
//           const sorted = [...res.data]
//             .sort((a, b) => new Date(b.timeStamp || b.NotificationDate || 0).getTime() - new Date(a.timeStamp || a.NotificationDate || 0).getTime())
//             .slice(0, 5);
//           setNotifications(sorted);
//         }
//       })
//       .catch(() => { if (isMounted) setNotificationsError(true); })
//       .finally(() => { if (isMounted) setLoadingNotifications(false); });
//     return () => { isMounted = false; };
//   }, []);

//   // useEffect(() => {
//   //   if (isPaused || BANNER_SLIDES.length <= 1) return;
//   //   const id = setInterval(() => {
//   //     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   //   }, SLIDE_INTERVAL_MS);
//   //   return () => clearInterval(id);
//   // }, [isPaused]);
//  useEffect(() => {
//   if (isPaused || BANNER_SLIDES.length <= 1) return;
//   const id = setInterval(() => {
//     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   }, SLIDE_INTERVAL_MS);
//   return () => clearInterval(id);
// }, [isPaused]);

// useEffect(() => {
//   const isWrap = prevSlideRef.current === BANNER_SLIDES.length - 1 && activeSlide === 0;
//   if (isWrap) {
//     setEnableTransition(false);
//     const timer = setTimeout(() => setEnableTransition(true), 50);
//     prevSlideRef.current = activeSlide;
//     return () => clearTimeout(timer);
//   }
//   prevSlideRef.current = activeSlide;
// }, [activeSlide]);

//   function goToPrevSlide() {
//     setActiveSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
//   }
//   function goToNextSlide() {
//     setActiveSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
//   }

//   return (
//     <div className="space-y-6">
//       {/* 1. Hero banner + notifications */}
//       <div>
//         {/* What's New Tab */}
//         {/* <div className="mb-1">
//           <span className="inline-block bg-[#558b2f] text-white text-sm font-medium px-4 py-1.5 rounded-none">
//             What's New
//           </span>
//         </div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//           {/* Banner Slider */}
//           <div
//             className="lg:col-span-6 overflow-hidden relative bg-white h-[340px] border border-gray-200"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             <button
//               onClick={goToPrevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-12 bg-[#4fc3f7] hover:bg-[#29b6f6] text-white text-xl font-bold flex items-center justify-center cursor-pointer shadow-xs transition-colors"
//               aria-label="Previous banner"
//             >
//               &lsaquo;
//             </button>
//             <button
//               onClick={goToNextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-12 bg-[#4fc3f7] hover:bg-[#29b6f6] text-white text-xl font-bold flex items-center justify-center cursor-pointer shadow-xs transition-colors"
//               aria-label="Next banner"
//             >
//               &rsaquo;
//             </button>

//             <div className="relative w-full h-full overflow-hidden">
//               {/* <div
//                 className="flex h-full transition-transform duration-700 ease-in-out"
//                 style={{ transform: `translateX(-${activeSlide * 100}%)` }}
//               > */}
//               {/* <div
//   className={`flex h-full ${isWrapping ? "" : "transition-transform duration-700 ease-in-out"}`}
//   style={{ transform: `translateX(-${activeSlide * 100}%)` }}
// > */}
// <div
//   className={`flex h-full ${enableTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
//   style={{ transform: `translateX(-${activeSlide * 100}%)` }}
// >
//                 {BANNER_SLIDES.map((slide) => (
//                   <div key={slide.src} className="w-full h-full shrink-0">
//                     <img
//                       src={slide.src}
//                       alt={slide.alt}
//                       className="w-full h-full object-cover"
//                       onError={(e) => { e.currentTarget.style.display = "none"; }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
//               {BANNER_SLIDES.map((slide, idx) => (
//                 <button
//                   key={slide.src}
//                   onClick={() => setActiveSlide(idx)}
//                   aria-label={`Go to slide ${idx + 1}`}
//                   className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === activeSlide ? "w-5 bg-[#1b75bb]" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
//                 />
//               ))}
//             </div> */}
//           </div>

//           {/* Notifications Card */}
//           <div
//             className="lg:col-span-6 bg-white flex flex-col justify-between overflow-hidden border border-[#c8d1db] h-[340px] select-none"
//             style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
//           >
//             <div className="overflow-y-auto flex-1">
//               {/* Header */}
//               {/* <div className="px-4 py-2.5 border-b border-[#cbd5e1] flex items-center gap-2"> */}
//               {/* <div className="px-4 py-2 border-b border-[#cbd5e1] flex items-center" style={{ gap: "16px" }}>
//                 {/* <img
//                   src={notificationIcon}
//                   alt="Notifications"
//                   className="w-[18px] h-[18px] shrink-0"
//                   onError={(e) => { e.currentTarget.style.display = "none"; }}
//                 /> */}

// {/* <img
//   src={notificationIcon}
//   alt="Notifications"
//   className="w-[18px] h-[18px] shrink-0"
//   style={{ border: "1px solid red" }}
//   onError={(e) => { e.currentTarget.style.display = "none"; }}
// />

//                 <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal m-0 p-0">
//                   Notifications
//                 </h2>
//               </div>  */}

//               <div className="px-4 py-2 border-b border-[#cbd5e1] flex items-center" style={{ gap: "16px" }}>
//   <img
//     src={notificationIcon}
//     alt="Notifications"
//     className="w-[18px] h-[18px] shrink-0"
//     style={{ objectFit: "contain" }}
//   />
//   <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal m-0 p-0" style={{ marginLeft: "-6px" }}>
//     Notifications
//   </h2>
// </div>

//               {/* List */}
//               {/* <div className="px-4 pt-2.5 pb-0"> */}
//               <div className="px-4 pt-1 pb-0" style={{marginTop: "15px", marginLeft: "10px"}}>
//                 {loadingNotifications ? (
//                   <div className="py-8 text-center text-xs text-gov-slate">
//                     <div className="inline-block w-6 h-6 border-2 border-[#2196f3] border-t-transparent rounded-full animate-spin mb-2"></div>
//                     <p>Fetching notifications from server…</p>
//                   </div>
//                 ) : notificationsError || notifications.length === 0 ? (
//                   <div className="py-8 text-center text-xs text-gov-slate">No notifications recorded currently.</div>
//                 ) : (
//                   <ul className="list-none m-0 p-0">
//                     {notifications.map((n, idx) => (
//                       // <li key={n.ID || n.id || idx} className="py-2.5">
//                       <li key={n.ID || idx} className="py-1">
//                         <a
//                           href={n.Url || n.link || "/circulars"}
//                           target={n.Url ? "_blank" : "_self"}
//                           rel={n.Url ? "noopener noreferrer" : undefined}
//                           className="flex items-start gap-2 no-underline group"
//                         >
//                           <span className="mt-[3px] shrink-0 inline-flex items-center justify-center">
//                             <img
//                               src={notificationRowIcon}
//                               alt=""
//                               className="w-[22px] h-[16px]"
//                               onError={(e) => { e.currentTarget.style.display = "none"; }}
//                             />
//                           </span>
                          
//                           {/* Same Font Size and Same Weight for Date and Title */}
//                           <div className="text-[12.5px] leading-[22px] font-normal tracking-[0.01em]">
//                             <span className="text-[#222222] font-normal mr-2 inline-block">
//                               {n.NotificationDate
//                                 ? new Date(n.NotificationDate)
//                                     .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
//                                     .replace(/\//g, "-")
//                                 : (n.date || "")}
//                             </span>
//                             <span className="text-[#0084ff] group-hover:underline font-normal">
//                               {n.Title || n.title}
//                             </span>
//                           </div>
//                         </a>

//                         {/* Crisp Dotted Line Divider */}
//                         {idx < notifications.length - 1 && (
//                           <div className="mt-2.5 border-b-[1.2px] border-dotted border-[#4b5563]" />
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             {/* View All Button */}
//             <div className="flex justify-end mt-auto">
//               <Link
//                 to="/circulars"
//                 className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-[15px] font-normal px-7 py-2 rounded-none transition-colors"
//               >
//                 View All
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. Stats ribbon — hover-flip cards */}
//       <StatsRibbon />

//       {/* 3. Courses section */}
//       <section className="space-y-4 pt-4">
//         <h2 className="font-display font-black text-xl md:text-2xl text-gov-navy uppercase text-center tracking-wide">
//           OUR COURSES
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link to="/student/results" className="rounded-xs p-6 bg-[#1e70bf] hover:bg-[#185ea3] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Diploma</h3>
//               <p className="text-xs text-white/80 mt-0.5">3-Year Polytechnic Engineering Programs</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">Type Writing & Shorthand</h3>
//               <p className="text-xs text-white/80 mt-0.5">TWSH Technical Examinations & Certifications</p>
//             </div>
//           </Link>

//           <Link to="/circulars" className="rounded-xs p-6 bg-[#00c853] hover:bg-[#00a844] text-white flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-0.5">
//             <div className="w-14 h-14 rounded-xs border-2 border-white/40 p-2 flex items-center justify-center shrink-0">
//               <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="font-display font-bold text-lg text-white">CCIC</h3>
//               <p className="text-xs text-white/80 mt-0.5">Certificate Courses In Computers & IT</p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }












































import { useEffect, useState, useRef } from "react";
import { ExternalLink,CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Award, Megaphone, ClipboardList } from "lucide-react";
import api from "../api/client";
import notificationIcon from "../images/ic.png";
import notificationRowIcon from "../images/row.png";
import sbtet1 from "../images/sbtet1.png"
import sbtet2 from "../images/sbtet2.png"
import sbtet3 from "../images/sbtet3.png"
import sbtet4 from "../images/sbtet4.png"
import sbtetDip from "../images/sbtet-diploma.jpg"
import  sbtetShort from "../images/sbtet-shothand.jpg"
import SbtetType from "../images/typewriter.jpg"


// --- Stats data ---
const CertificateIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-certificate text-[30px] leading-none ${className}`}></i>
);

const BullhornIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-bullhorn text-[28px] leading-none ${className}`}></i>
);

const NameCorrectionIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-rectangle-list text-[28px] leading-none ${className}`}></i>
);
//courses section//

import React from "react";

// ==========================================
// 1. DIPLOMA ICON
// ==========================================

export function DiplomaIcon({
  className = "w-14 h-14 text-white shrink-0",
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Back Window */}
      <rect
        x="4"
        y="8"
        width="38"
        height="30"
        rx="3.5"
        strokeWidth="2.2"
      />

      <line
        x1="4"
        y1="15"
        x2="42"
        y2="15"
        strokeWidth="2"
      />

      <circle
        cx="9"
        cy="11.5"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="14"
        cy="11.5"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="19"
        cy="11.5"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />

      {/* Front Window */}
      <rect
        x="16"
        y="18"
        width="44"
        height="38"
        rx="3.5"
        strokeWidth="2.4"
        fill="none"
      />

      <line
        x1="16"
        y1="26"
        x2="60"
        y2="26"
        strokeWidth="2.2"
      />

      <circle
        cx="22"
        cy="22"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="27"
        cy="22"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="32"
        cy="22"
        r="1.4"
        fill="currentColor"
        stroke="none"
      />

      {/* Gear */}
      <g transform="translate(38 41)">
        {/* Gear Teeth */}
        <path
          d="
            M0 -9.5 L0 -7.5
            M0 7.5 L0 9.5
            M-9.5 0 L-7.5 0
            M7.5 0 L9.5 0
            M-6.7 -6.7 L-5.3 -5.3
            M5.3 5.3 L6.7 6.7
            M-6.7 6.7 L-5.3 5.3
            M5.3 -5.3 L6.7 -6.7
          "
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Gear Ring */}
        <circle
          cx="0"
          cy="0"
          r="6.2"
          strokeWidth="2.4"
          fill="none"
        />

        {/* Gear Center */}
        <circle
          cx="0"
          cy="0"
          r="2.2"
          fill="currentColor"
          stroke="none"
        />
      </g>
    </svg>
  );
}

// ==========================================
// 2. TYPE WRITING & SHORTHAND ICON
// ==========================================

export function TypeWritingIcon({
  className = "w-14 h-14 text-white shrink-0",
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Screen Container */}
      <rect
        x="6"
        y="8"
        width="46"
        height="34"
        rx="3.5"
        strokeWidth="2.3"
      />

      {/* Screen Grid */}
      <rect
        x="11"
        y="13"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      <rect
        x="21"
        y="13"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      <rect
        x="31"
        y="13"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      <rect
        x="41"
        y="13"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      <rect
        x="11"
        y="23"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      <rect
        x="41"
        y="23"
        width="6"
        height="6"
        rx="1.2"
        strokeWidth="1.8"
      />

      {/* Touch Target */}
      <circle
        cx="28"
        cy="26"
        r="3.5"
        strokeWidth="1.6"
        strokeDasharray="2 1.5"
      />

      <circle
        cx="28"
        cy="26"
        r="1.2"
        fill="currentColor"
        stroke="none"
      />

      {/* Finger Touch */}
      <path
        d="
          M26 27
          v14
          c0 1.2 0.8 2.2 2 2.2
          c1.2 0 2-1 2-2.2
          v-5
          h2
          c1.2 0 2 0.8 2 2
          v3
          c0 1.5-1.2 2.8-2.8 2.8
          c-1.5 0-2.5-1-2.5-2.2
          v-2
        "
        strokeWidth="2.3"
      />

      <path
        d="
          M22 41
          c-1.5 1.5-2 3.5-2 5.5
          c0 4 3.5 7.5 7.5 7.5
          c4.5 0 8.5-3.5 8.5-8
          v-5
        "
        strokeWidth="2.2"
      />

      {/* Touch Circles */}
      <circle
        cx="28"
        cy="55"
        r="2.5"
        strokeWidth="1.8"
      />

      <circle
        cx="28"
        cy="55"
        r="5"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

// ==========================================
// 3. CCIC ICON
// ==========================================

export function CcicIcon({
  className = "w-14 h-14 text-white shrink-0",
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left Circuit Branch */}
      <path
        d="M7 24 h7 v24 h-7"
        strokeWidth="2.2"
      />

      <circle
        cx="7"
        cy="24"
        r="2.2"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="7"
        cy="48"
        r="2.2"
        fill="currentColor"
        stroke="none"
      />

      <line
        x1="14"
        y1="36"
        x2="19"
        y2="36"
        strokeWidth="2"
      />

      {/* Right Circuit Branch */}
      <path
        d="M57 24 h-7 v24 h7"
        strokeWidth="2.2"
      />

      <circle
        cx="57"
        cy="24"
        r="2.2"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="57"
        cy="48"
        r="2.2"
        fill="currentColor"
        stroke="none"
      />

      <line
        x1="50"
        y1="36"
        x2="45"
        y2="36"
        strokeWidth="2"
      />

      {/* Central Gear */}
      <g transform="translate(32 40)">
        {/* Gear Teeth */}
        <path
          d="
            M0 -11.5 L0 -9
            M0 9 L0 11.5
            M-11.5 0 L-9 0
            M9 0 L11.5 0
            M-8.1 -8.1 L-6.4 -6.4
            M6.4 6.4 L8.1 8.1
            M-8.1 8.1 L-6.4 6.4
            M6.4 -6.4 L8.1 -8.1
          "
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Outer Gear Ring */}
        <circle
          cx="0"
          cy="0"
          r="8.2"
          strokeWidth="2.4"
          fill="none"
        />

        {/* Inner Hub */}
        <circle
          cx="0"
          cy="0"
          r="4.2"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Wrench Head */}
      <path
        d="
          M26 12
          C26 7.5 38 7.5 38 12
          C38 15 35 17 34 20
          L34 32
          L30 32
          L30 20
          C29 17 26 15 26 12
          Z
        "
        strokeWidth="2.3"
        fill="none"
      />

      {/* Wrench Jaw */}
      <path
        d="M29 8.5 L35 8.5 L35 12.5 L29 12.5 Z"
        strokeWidth="1.8"
        fill="none"
      />

      {/* Wrench Shaft */}
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="48"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ==========================================
// COURSE TYPE
// ==========================================

// export interface CourseItem {
//   id: string;
//   title: string;
//   subtitle: string;
//   badge: string;
//   bgColor: string;
//   hoverColor: string;
//   icon: React.ComponentType<{ className?: string }>;
//   description: string;
//   duration: string;
//   eligibility: string;
//   programs: string[];
// }

// ==========================================
// COURSES DATA
// ========================================
 const COURSES_DATA= [
  {
    id: "diploma",
    title: "Diploma",
    subtitle: "3-Year Polytechnic Engineering Programs",
    badge: "Polytechnic / Technical",

    bgColor: "bg-[#2370db]",
    hoverColor: "hover:bg-[#1d63c4]",

    icon: DiplomaIcon,

    description:
      "Comprehensive 3-year technical diploma engineering programs designed to build high-level practical engineering expertise across cutting-edge technical disciplines.",

    duration:
      "3 Years (6 Semesters / Industrial Training)",

    eligibility:
      "SSC (10th Class) Pass with POLYCET Rank",

    programs: [
      "Computer Engineering & Artificial Intelligence",
      "Electronics & Communication Engineering (ECE)",
      "Electrical & Electronics Engineering (EEE)",
      "Mechanical & Automobile Engineering",
      "Civil & Architectural Engineering",
      "Information Technology (IT) & Cloud Systems",
    ],
  },

  {
    id: "twsh",
    title: "Type Writing & Shorthand",
    subtitle: "TWSH Technical Examinations & Certifications",
    badge: "Commercial & Secretarial",

    bgColor: "bg-[#00b4d8]",
    hoverColor: "hover:bg-[#009ec0]",

    icon: TypeWritingIcon,

    description:
      "State Board recognized Typewriting (English, Telugu, Hindi, Urdu) and Shorthand examinations certifying typing speeds, secretarial accuracy, and government job qualification standards.",

    duration:
      "Graded Certification (Lower, Higher, High Speed)",

    eligibility:
      "Matriculation (10th) or equivalent",

    programs: [
      "Typewriting English (Junior, Lower 30 WPM, Higher 45 WPM, High Speed)",
      "Typewriting Telugu / Hindi / Urdu",
      "Shorthand English (80 WPM, 100 WPM, 120 WPM, 150 WPM, 180 WPM)",
      "Shorthand Telugu & Regional Languages",
      "Secretarial Practice & Office Automation",
    ],
  },

  {
    id: "ccic",
    title: "CCIC",
    subtitle: "Certificate Courses In Computers & IT",
    badge: "IT & Skill Development",

    bgColor: "bg-[#00c853]",
    hoverColor: "hover:bg-[#00b049]",

    icon: CcicIcon,

    description:
      "Craft Courses and Certificate Courses in Computers & IT (CCIC) empowering students and professionals with hands-on software development, hardware networking, and modern digital competencies.",

    duration:
      "3 Months to 1 Year Modular Diplomas",

    eligibility:
      "Intermediate (10+2) or SSC (10th)",

    programs: [
      "Certificate Course in Computer Applications (CCCA)",
      "Hardware, Networking & Cybersecurity Maintenance",
      "Full-Stack Web Technologies & Python Programming",
      "Financial Accounting with Tally & GST Automation",
      "AutoCAD & 3D Industrial Modeling",
    ],
  },
];


//end code for courses section//











// --- Stats items with exact counts and icons matching video & image ---
const STAT_ITEMS = [
  { label: "Migration", count: "2086", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Interim", count: "40304", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Bonafied", count: "12475", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Transcript", count: "4280", suffix: "Transcript Issued", icon: BullhornIcon },
  { label: "Duplicate Memo", count: "6164", suffix: "Memo Issued", icon: BullhornIcon },
  { label: "Duplicate ODC", count: "31", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Transfer", count: "58996", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Name Correction", count: "2411", suffix: "Performed", icon: NameCorrectionIcon },
];

/**
 * Individual Stat Card with exact SBTET blue branding, typography, and hover effect
 */
// interface StatCardProps {
//   label: string;
//   count: string;
//   suffix: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

const StatCard = ({
  label,
  count,
  suffix,
  icon: Icon,
}) => {
  return (
    <div
      className="group border border-[#bcdffb] bg-white flex flex-col justify-between overflow-hidden text-center cursor-pointer transition-shadow duration-200 hover:shadow-md w-full h-[140px]"
      style={{
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div className="relative bg-white px-1 pt-4 pb-3 flex-1 flex flex-col items-center justify-between overflow-hidden">
        {/* Label moves down and fades */}
        <span className="block text-[13px] font-semibold text-[#2fa6f6] tracking-tight whitespace-nowrap mb-1 transition-all duration-300 ease-in-out group-hover:translate-y-4 group-hover:opacity-0">
          {label}
        </span>

        {/* Icon moves down and fades */}
        <div className="text-[#2fa6f6] my-auto flex items-center justify-center h-9 transition-all duration-300 ease-in-out group-hover:translate-y-8 group-hover:opacity-0">
          <Icon />
        </div>

        {/* Blue overlay slides down */}
        <div className="absolute inset-0 bg-[#2fa6f6] -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out flex items-center justify-center px-1 text-center overflow-hidden z-10 pointer-events-none">
          <span className="text-white font-semibold text-[16px] tracking-tight leading-tight select-none -translate-y-2 group-hover:translate-y-2 transition-transform duration-300 ease-in-out">
            {label}
          </span>
        </div>
      </div>

      {/* Bottom half: Solid bright blue block (#2fa6f6) with white count & suffix */}
      <div className="bg-[#2fa6f6] text-white text-center py-2.5 px-1 select-none">
        <div className="font-bold text-[24px] sm:text-[25px] leading-tight tracking-tight">
          {count}
        </div>
        <div className="text-[11.5px] font-normal mt-0.5 leading-tight text-white whitespace-nowrap">
          {suffix}
        </div>
      </div>
    </div>
  );
};

/**
 * Stats Ribbon Component - exact layout matching video
 */
function StatsRibbon() {
  return (
    <section className="w-full bg-white py-2" id="stats-ribbon-section">
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3 lg:gap-3.5">
        {STAT_ITEMS.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            count={item.count}
            suffix={item.suffix}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}




// --- Original slides ---
// const BANNER_SLIDES = [
//   { src: "https://www.sbtet.telangana.gov.in/Slides/tg-logo-min.jpg.Png", alt: "Banner 1" },
//   { src: "https://sbtet.telangana.gov.in/Slides/Welcoming%20CTE.jpeg.Png", alt: "Banner 2" },
//   { src: "https://sbtet.telangana.gov.in/Slides/ConstitutionalDay26112024.jpg.Png", alt: "Banner 3" },
//   { src: "https://sbtet.telangana.gov.in/Slides/upload.jpg.Png", alt: "Banner 4" },
// ];


const BANNER_SLIDES = [
  {
    src: sbtet1,
    alt: "Banner 1",
  },
  {
    src: sbtet2,
    alt: "Banner 2",
  },
  {
    src: sbtet3,
    alt: "Banner 3",
  },
  {
    src: sbtet4,
    alt: "Banner 4",
  },
];

// Append first slide to end for seamless looping
const EXTENDED_SLIDES = [...BANNER_SLIDES, BANNER_SLIDES[0]];

const SLIDE_INTERVAL_MS = 3000;

export default function HomePage() {
  const [notifications, setNotifications] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_cache_circulars");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
    } catch {
      // Ignore parse error
    }
    return [];
  });
  const [loadingNotifications, setLoadingNotifications] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_cache_circulars");
      return !cached;
    } catch {
      return true;
    }
  });
  const [notificationsError, setNotificationsError] = useState(false);
  
  // Carousel States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);


const NEW_GIF_URL = "https://tgpolycet.nic.in/images/new.gif";

function isRecentNotification(dateValue) {
  if (!dateValue) return false;
  const notifDate = new Date(dateValue);
  if (isNaN(notifDate.getTime())) return false;

  const diffMs = Date.now() - notifDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 5;
}

  useEffect(() => {
    let isMounted = true;
    api
      .get("/sbtet/circulars")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          const sorted = [...res.data]
            .sort((a, b) => new Date(b.timeStamp || b.NotificationDate || 0).getTime() - new Date(a.timeStamp || a.NotificationDate || 0).getTime());
          try {
            localStorage.setItem("pc_cache_circulars", JSON.stringify(sorted));
          } catch {
            // Storage quota or disabled
          }
          setNotifications(sorted.slice(0, 5));
        }
      })
      .catch(() => {
        if (isMounted && notifications.length === 0) setNotificationsError(true);
      })
      .finally(() => { if (isMounted) setLoadingNotifications(false); });
    return () => { isMounted = false; };
  }, []);

  // Auto-play timer
  // useEffect(() => {
  //   if (isPaused) return;
  //   const interval = setInterval(() => {
  //     goToNextSlide();
  //   }, SLIDE_INTERVAL_MS);

  //   return () => clearInterval(interval);
  // }, [currentIndex, isPaused]);
  // Auto-play timer with bounds safety
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= BANNER_SLIDES.length) {
          return 1;
        }
        return prev + 1;
      });
      setIsTransitioning(true);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Tab visibility listener: pause when tab is hidden, reset when active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        setCurrentIndex((prev) => (prev >= BANNER_SLIDES.length ? 0 : prev));
        setIsTransitioning(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Safety watchdog: If currentIndex ever exceeds BANNER_SLIDES.length, instantly reset to 0
  useEffect(() => {
    if (currentIndex > BANNER_SLIDES.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex >= BANNER_SLIDES.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  function goToNextSlide() {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= BANNER_SLIDES.length ? 1 : prev + 1));
  }

  function goToPrevSlide() {
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(BANNER_SLIDES.length - 1);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function goToSlide(index) {
    setIsTransitioning(true);
    setCurrentIndex(index);
  }

  return (
    <div className="space-y-5 sm:space-y-6 mt-0 sm:-mt-4">
      {/* Hero Banner + Notifications */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Slider */}
          <div
            className="lg:col-span-6 overflow-hidden relative bg-white h-[220px] sm:h-[280px] md:h-[340px] border border-gray-200"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Previous */}
            <button
              type="button"
              onClick={goToPrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                         w-8 sm:w-9 h-10 sm:h-12 bg-[#4fc3f7] hover:bg-[#29b6f6]
                         text-white text-lg sm:text-xl font-bold
                         flex items-center justify-center
                         cursor-pointer shadow-sm transition-colors"
              aria-label="Previous banner"
            >
              &lsaquo;
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={goToNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                         w-8 sm:w-9 h-10 sm:h-12 bg-[#4fc3f7] hover:bg-[#29b6f6]
                         text-white text-lg sm:text-xl font-bold
                         flex items-center justify-center
                         cursor-pointer shadow-sm transition-colors"
              aria-label="Next banner"
            >
              &rsaquo;
            </button>

            {/* Slider viewport */}
            <div className="relative w-full h-full overflow-hidden">
              <div
                className={`flex w-full h-full ${
                  isTransitioning
                    ? "transition-transform duration-700 ease-in-out"
                    : ""
                }`}
                style={{
                  transform: `translate3d(-${Math.min(currentIndex, BANNER_SLIDES.length) * 100}%, 0, 0)`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {EXTENDED_SLIDES.map((slide, index) => (
                  <div
                    key={`${slide.src}-${index}`}
                    className="w-full h-full shrink-0"
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="block w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>

              {/* Slide Indicator Dots */}
              {/* <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {BANNER_SLIDES.map((_, idx) => {
                  const isActive = (currentIndex % BANNER_SLIDES.length) === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "w-6 bg-[#35a5f1]"
                          : "w-2 bg-white/70 hover:bg-white"
                      }`}
                    />
                  );
                })}
              </div> */}
            </div>
          </div>

          {/* Notifications Card */}
          <div
            className="lg:col-span-6 bg-white flex flex-col justify-between overflow-hidden border border-[#c8d1db] min-h-[280px] sm:h-[340px] select-none"
            style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
          >
            <div className="overflow-y-auto flex-1">
              {/* Header */}
              <div className="px-4 py-2 border-b border-[#cbd5e1] flex items-center gap-2">
                <img
                  src={notificationIcon}
                  alt="Notifications"
                  className="w-[18px] h-[18px] shrink-0"
                  style={{ objectFit: "contain" }}
                />
                <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal m-0 p-0">
                  Notifications
                </h2>
              </div>

              {/* List */}
              <div className="px-3 sm:px-4 pt-2 pb-0">
                {loadingNotifications ? (
                  <div className="py-8 text-center text-xs text-gov-slate">
                    <div className="inline-block w-6 h-6 border-2 border-[#2196f3] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p>Fetching notifications from server…</p>
                  </div>
                ) : notificationsError || notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gov-slate">No notifications recorded currently.</div>
                ) : (
                  <ul className="list-none m-0 p-0">
                    {notifications.map((n, idx) => (
                      <li key={n.ID || idx} className="py-1">
                        <a
                          href={n.Url || n.link || "/circulars"}
                          target={n.Url ? "_blank" : "_self"}
                          rel={n.Url ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-2 no-underline group"
                        >
                          <span className="mt-[3px] shrink-0 inline-flex items-center justify-center">
                            <img
                              src={notificationRowIcon}
                              alt=""
                              className="w-[22px] h-[16px]"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          </span>

                          {/* <div className="text-[12.5px] leading-[22px] font-normal tracking-[0.01em]">
                            <span className="text-[#222222] font-normal mr-2 inline-block">
                              {n.NotificationDate
                                ? new Date(n.NotificationDate)
                                    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
                                    .replace(/\//g, "-")
                                : (n.date || "")}
                            </span>
                            <span className="text-[#0084ff] group-hover:underline font-normal">
                              {n.Title || n.title}
                            </span>
                          </div> */}
<div className="text-[12.5px] leading-[22px] font-normal tracking-[0.01em]">
  <span className="text-[#222222] font-normal mr-2 inline-block">
    {n.NotificationDate
      ? new Date(n.NotificationDate)
          .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
          .replace(/\//g, "-")
      : (n.date || "")}
  </span>
  <span className="text-[#0084ff] group-hover:underline font-normal">
    {n.Title || n.title}
    {isRecentNotification(n.NotificationDate || n.date) && (
      <img
        src={NEW_GIF_URL}
        alt="New"
        className="inline-block h-[12px] w-auto align-middle ml-1.5"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    )}
  </span>
</div>

                        </a>

                        {idx < notifications.length - 1 && (
                          <div className="mt-2.5 border-b-[1.2px] border-dotted border-[#4b5563]" />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* View All Button */}
            <div className="flex justify-end mt-auto">
              <Link
                to="/circulars"
                className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-[15px] font-normal px-7 py-2 rounded-none transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Header Strip */}
      <div className="bg-[#35a5f1] py-2.5 px-4 mt-2">
        <p className="text-center text-white text-[12px] font-normal m-0">
          Current academic year student services statistics
        </p>
      </div>

      {/* Stats Ribbon */}
      <StatsRibbon />

      {/* Courses Section */}
      <section id="our-courses-section" className="w-full my-4">
        {/* Exact Centered Title with Deep Navy Palette */}
        <div className="text-center mb-5 sm:mb-7">
          <h2
            className="uppercase text-[#001c44] select-none"
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "1px",
              lineHeight: "1.2",
              margin: 0,
            }}
          >
            OUR COURSES
          </h2>
        </div>

        {/* 3 Course Cards Grid with Responsive Breakpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          
          {/* CARD 1: Diploma (Royal Blue #2370db) */}
          <div
            id="course-card-diploma"
            onClick={() => setSelectedCourse(COURSES_DATA[0])}
            className="group relative bg-[#2370db] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(35,112,219,0.28)] transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url(${sbtetDip})` }}
            />
            {/* Tint overlay */}
            <div className="absolute inset-0 bg-[#2370db]/70 group-hover:bg-[#1d63c4]/70 transition-colors duration-300" />

            <div className="relative flex items-center gap-4 sm:gap-5 w-full z-10">
              <div className="shrink-0">
                <DiplomaIcon className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[19px] sm:text-[23px] font-bold text-white tracking-tight leading-tight m-0">
                  Diploma
                </h3>
              </div>
            </div>
          </div>

          {/* CARD 2: Type Writing & Shorthand (Cyan / Turquoise #00b4d8) */}
          <div
            id="course-card-twsh"
            onClick={() => setSelectedCourse(COURSES_DATA[1])}
            className="group relative bg-[#00b4d8] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(0,180,216,0.28)] transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url(${SbtetType})` }}
            />
            {/* Tint overlay */}
            <div className="absolute inset-0 bg-[#00b4d8]/70 group-hover:bg-[#009ec0]/70 transition-colors duration-300" />

            <div className="relative flex items-center gap-4 sm:gap-5 w-full z-10">
              <div className="shrink-0">
                <TypeWritingIcon className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] sm:text-[21px] font-bold text-white tracking-tight leading-snug m-0">
                  Type Writing &amp; Shorthand
                </h3>
              </div>
            </div>
          </div>

          {/* CARD 3: CCIC (Vibrant Green #00c853) */}
          <div
            id="course-card-ccic"
            onClick={() => setSelectedCourse(COURSES_DATA[2])}
            className="group relative bg-[#00c853] hover:bg-[#2EA893] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(46,168,147,0.28)] transition-all duration-300 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: "sbtet" }}
            />
            
            {/* Hover tint overlay */}
            <div className="absolute inset-0 bg-[#00c853]/0 group-hover:bg-[#2EA893]/80 transition-colors duration-300" />

            {/* Locked Content Container */}
            <div className="relative flex items-center gap-4 sm:gap-5 w-full z-10">
              <div className="shrink-0">
                <CcicIcon className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[19px] sm:text-[23px] font-bold text-white tracking-tight leading-tight m-0">
                  CCIC
                </h3>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
 

