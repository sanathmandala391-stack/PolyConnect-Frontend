import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTextSize } from "../context/TextSizeContext";
import sbtetCommisioner from "../images/sbtet-commisioner.jpg";
import sbtetSec from "../images/sbtet-sec.jpg";
import sbtetRising from "../images/sbtet-rising.jpg";
import sbtetlogo from "../images/sb-1.jpg";

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
        className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 bg-slate-100 flex items-center justify-center overflow-hidden shadow-xs"
        style={{ borderColor: "#D2D4D8" }}
      >
        <i className="fa-solid fa-user text-2xl text-slate-400" />
      </div>
    );
  }

  return (
    <div
      className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 bg-slate-100 overflow-hidden shadow-xs shrink-0"
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
      className="z-50 no-print w-full"
      style={{
        fontFamily: "'Mulish', 'Muli', Arial, sans-serif",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* 1. Top Identity & Contact Bar (Responsive for Mobile & Desktop) */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4">

          {/* Logo Section */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/" className="flex items-center justify-center shrink-0">
              <div className="h-[55px] sm:h-[70px] md:h-[80px] shrink-0 overflow-hidden flex items-center">
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
                className="w-[44px] sm:w-[54px] md:w-[60px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Dignitaries Photos */}
          <div className="flex items-start justify-center gap-6 sm:gap-9 my-1">
            {/* Chairperson */}
            <div className="flex flex-col items-center text-center">
              <OfficialPhoto src={sbtetCommisioner} alt="Chairperson" />
              <span
                className="text-[10.5px] sm:text-[11.5px] text-[#1a3c78] mt-1 leading-tight font-bold"
              >
                Smt. A. Sridevasena, IAS
              </span>
              <span
                className="text-[9px] sm:text-[9.5px] text-[#1a3c78] uppercase tracking-wide font-bold"
              >
                CHAIRPERSON
              </span>
            </div>

            {/* Secretary */}
            <div className="flex flex-col items-center text-center">
              <OfficialPhoto src={sbtetSec} alt="Secretary" />
              <span
                className="text-[10.5px] sm:text-[11.5px] text-[#1a3c78] mt-1 leading-tight font-bold"
              >
                Er A Pullaiah
              </span>
              <span
                className="text-[9px] sm:text-[9.5px] text-[#1a3c78] uppercase tracking-wide font-bold"
              >
                SECRETARY
              </span>
            </div>
          </div>

          {/* Contacts, Accessibility, & Mobile App */}
          <div className="flex flex-col items-center xl:items-end gap-1 text-center xl:text-right">
            {/* Text Resizing Controls */}
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={decrease}
                disabled={size === "sm"}
                title="Decrease font size"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-100 rounded-xs text-[10px] sm:text-[11px] font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
              >
                A-
              </button>
              <button
                type="button"
                onClick={increase}
                disabled={size === "lg"}
                title="Increase font size"
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-100 rounded-xs text-[10px] sm:text-[11px] font-semibold text-[#1a3c78] hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
              >
                A+
              </button>
              <button
                type="button"
                onClick={reset}
                title="Default font size"
                className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-xs text-[10px] sm:text-[11px] font-semibold cursor-pointer ${
                  size === "md"
                    ? "bg-[#35a5f1] text-white"
                    : "bg-gray-100 text-[#1a3c78] hover:bg-gray-200"
                }`}
              >
                A
              </button>
            </div>

            {/* Email & Phone */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12.5px] font-semibold text-[#1a3c78] mt-0.5">
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
              <span className="font-semibold text-[#1a3c78]">
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
              className="flex items-center justify-center gap-1 text-[11px] sm:text-[12px] font-semibold text-[#1a3c78] hover:underline cursor-pointer"
            >
              <i className="fa-solid fa-circle-play text-[#1a3c78]" />
              Download Mobile App
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Blue Navigation Bar */}
      <nav
        className="bg-[#35a5f1] text-white shadow-md relative w-full"
        style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, fontSize: "10px" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between min-h-[44px]">

          {/* Mobile Home Icon (Visible on mobile on the left) */}
          <NavLink
            to="/"
            className="xl:hidden p-2.5 flex items-center text-white hover:bg-[] transition-colors"
            aria-label="Home"
          >
            <i className="fa-solid fa-house text-lg text-white" />
          </NavLink>

          {/* Desktop Nav Items */}
          <div
            className="hidden xl:flex items-center flex-nowrap"
            style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, fontSize: "18px" }}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-3 flex items-center justify-center text-white hover:bg-[#2888c9] transition-colors shrink-0 ${
                  isActive ? "bg-[]" : ""
                }`
              }
              aria-label="Home"
            >
              <i className="fa-solid fa-house-chimney text-base" />
            </NavLink>

            {/* 1. STUDENT SERVICES MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-gear text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>STUDENT SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
              </button>

              <div className="hidden group-hover:block absolute top-full left-0 right-0 w-full bg-white text-slate-800 shadow-2xl border-t border-gray-200 z-50 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 text-[12px]">
                  <div>
                    <div className="bg-[#35a5f1] text-white font-semibold px-3 py-1.5 uppercase text-xs mb-2">DIPLOMA</div>
                    <ul className="space-y-1 divide-y divide-gray-100 font-sans">
                      <li><Link to="/halltickets" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Halltickets</Link></li>
                      <li><Link to="/Results/consolidatedResults" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Consolidated Results</Link></li>
                      <li><Link to="/student/results" className="block py-1.5 px-2 hover:bg-slate-100 hover:text-[#35a5f1] font-medium text-slate-900">Results</Link></li>
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
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Apply for CBT / Offline Exam</a></li>
                      <li><Link to="/Fee/exam" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Fee Payment</Link></li>
                      <li><a href="#" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Reschedule CBT Exam / View Application</a></li>
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
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-gear text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>COLLEGE SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
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
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-gear text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>OTHERS SERVICES</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
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
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-gear text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>AFFILIATED COLLEGES</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
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
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-gear text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>COURSES</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
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
                      <li><Link to="/courses" className="block py-1.5 px-2 hover:bg-slate-100 text-slate-700">Typewriting & Shorthand</Link></li>
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
              className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
              style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
            >
              <i className="fa-solid fa-square-phone text-[16px] shrink-0 text-white" />
              <span style={{ color: "#ffffff", fontWeight: 400 }}>CONTACT-US</span>
            </a>

            {/* 6. MORE MEGA MENU */}
            <div className="group static">
              <button
                type="button"
                className="px-3.5 py-3 text-[13px] uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap text-white hover:bg-[] transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-circle-info text-[16px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>MORE</span>
                <i className="fa-solid fa-chevron-down text-[11px] ml-0.5 shrink-0 text-white" />
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

            {/* 7. LOGIN BUTTON */}
            {user ? (
              <div className="relative shrink-0" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  title={user.fullName || user.username}
                  className="bg-[#2888c9] hover:bg-[#1e78c2] text-white text-[14px] uppercase tracking-wide px-4 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
                  style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
                >
                  <i className="fa-solid fa-user text-[15px] shrink-0 text-white" />
                  <span className="truncate max-w-[120px]" style={{ color: "#ffffff", fontWeight: 400 }}>
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
                className="bg-[#2888c9] hover:bg-[#1e78c2] text-white text-[14px] uppercase tracking-wide px-4 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
                style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 400, color: "#ffffff" }}
              >
                <i className="fa-solid fa-user text-[15px] shrink-0 text-white" />
                <span style={{ color: "#ffffff", fontWeight: 400 }}>LOGIN</span>
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
              <span className="block w-[22px] h-[2.5px] bg-white rounded-[1px]" />
              <span className="block w-[22px] h-[2.5px] bg-white rounded-[1px]" />
              <span className="block w-[22px] h-[2.5px] bg-white rounded-[1px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Slide-Over Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Drawer Container */}
          <div
            className="relative w-[280px] sm:w-[320px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-left duration-200"
            style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 500 }}
          >

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
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 flex items-center justify-center text-lg cursor-pointer"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-lg text-slate-500 hover:text-slate-800" />
              </button>
            </div>

            {/* Drawer Menu List */}
            <div className="flex-1 divide-y divide-gray-100 text-[12.5px]">

              {/* 1. STUDENT SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("student")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      STUDENT SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "student" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "student" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/attendance" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">View Attendance</Link>
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Time Table</Link>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Exam fee payment</Link>
                      <Link to="/halltickets" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Hall Ticket download</Link>
                      <Link to="/student/results" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Results</Link>
                      <Link to="/Results/consolidatedResults" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Consolidated Result</Link>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium">Download Fee Receipt</Link>
                      <Link to="/student/doubts" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Doubt Solver AI (ChatBot)</Link>
                      <Link to="/student/seniors" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Senior Connect (Mentorship)</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Apply for CBT / Offline Exam</a>
                      <Link to="/Fee/exam" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Fee Payment</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Reschedule CBT Exam / View Application</a>
                      <Link to="/halltickets" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Hallticket Download</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CBT Practice</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Results</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Photo Copy &amp; Revaluation</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      ISB ONLINE SKILLING PROGRAMMES
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Student Enrolment</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. COLLEGE SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("college")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      COLLEGE SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "college" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "college" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Affiliation Login</Link>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">College Login</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Polycet Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">QPGD Portal</a>
                      <Link to="/hod/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium">Department HOD Dashboard</Link>
                      <Link to="/hod/approvals" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium">Student Registration Approvals</Link>
                      <Link to="/hod/students" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium">Department Students Roster</Link>
                      <Link to="/hod/attendance" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors font-medium">Department Attendance Register</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">College/ Institute Login</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Exams Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Affiliation Portal</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. OTHERS SERVICES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("others")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      OTHERS SERVICES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "others" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "others" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      INSTITUTIONS
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Official Circulars &amp; Timetables</Link>
                      <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">System Administration Panel</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      STAFF
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Digital Evaluation</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      POLYCET
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/doubts" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">AI Doubt Solver Assistant</Link>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Apply for Polycet</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. AFFILIATED COLLEGES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("colleges")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      AFFILIATED COLLEGES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "colleges" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "colleges" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/admin/colleges" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">All Affiliated Polytechnic Colleges</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Typewriting &amp; Shorthand Institutions</a>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Portal</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Affiliated Colleges</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. COURSES */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("courses")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-gear text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      COURSES
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "courses" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "courses" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      DIPLOMA
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Diploma Courses List</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      TW &amp; SH
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Typewriting &amp; Shorthand</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      CCIC
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">CCIC Courses</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. CONTACT-US Link */}
              <a
                href="#contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors"
              >
                <i className="fa-solid fa-phone text-slate-800 text-[13px] w-4 text-center shrink-0" />
                <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                  CONTACT-US
                </span>
              </a>

              {/* 7. MORE */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSubMenu("more")}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-info text-slate-800 text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12.5px] uppercase text-slate-800 tracking-wide">
                      MORE
                    </span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down text-slate-400 text-[10px] transition-transform duration-200 ${
                      openSubMenu === "more" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubMenu === "more" && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider">
                      MORE
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <Link to="/student/community" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Statewide Polytechnic Community</Link>
                      <Link to="/register/student" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Student Registration</Link>
                      <Link to="/register/hod" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">HOD Registration</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      PORTAL
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Site Map</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Tenders &amp; Downloads</a>
                      <Link to="/circulars" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Latest News Notifications</Link>
                    </div>

                    <div className="bg-[#35a5f1] text-white font-bold uppercase text-[11px] px-4 py-1.5 tracking-wider mt-1">
                      RTI
                    </div>
                    <div className="divide-y divide-gray-100 text-xs">
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Full details of Right to Information Act</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">About Right to Information</a>
                      <a href="#" onClick={() => setMobileMenuOpen(false)} className="block px-5 py-2 text-slate-700 hover:text-[#35a5f1] hover:bg-sky-50 transition-colors">Obligations of Public Authority</a>
                    </div>
                  </div>
                )}
              </div>

              {/* 8. LOGIN / USER SECTION */}
              <div>
                {user ? (
                  <div className="bg-[#35a5f1] text-white">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/20">
                      <div className="flex items-center gap-3 min-w-0">
                        <i className="fa-solid fa-user text-white text-[13px] w-4 text-center shrink-0" />
                        <span className="font-bold text-[11.5px] uppercase text-white tracking-wide truncate">
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
                        className="py-2.5 hover:bg-rose-600 transition-colors uppercase tracking-wider text-white flex items-center justify-center gap-1.5 cursor-pointer"
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
                    className="w-full flex items-center gap-3 px-4 py-3 bg-[#35a5f1] hover:bg-[#2888c9] text-white transition-colors"
                  >
                    <i className="fa-solid fa-user text-white text-[13px] w-4 text-center shrink-0" />
                    <span className="font-bold text-[12px] uppercase tracking-wide text-white">
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
