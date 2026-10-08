import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ChevronRight, X, Clock, GraduationCap, CheckCircle } from "lucide-react";
import api from "../api/client";
import WhatsNew from "../WhatsNew";
import notificationIcon from "../images/ic.png";
import notificationRowIcon from "../images/row.png";
import sbLogo from "../images/sb.png";
import sbtet1 from "../images/sbtet1.png";
import sbtet2 from "../images/sbtet2.png";
import sbtet3 from "../images/sbtet3.png";
import sbtet4 from "../images/sbtet4.png";
import sbtetDip from "../images/sbtet-diploma.jpg";
import SbtetType from "../images/typewriter.jpg";
import newGif from "../images/new.gif";

// --- Stats Icons ---
const CertificateIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-certificate text-[30px] leading-none ${className}`}></i>
);

const BullhornIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-bullhorn text-[28px] leading-none ${className}`}></i>
);

const NameCorrectionIcon = ({ className = "" }) => (
  <i className={`fa-solid fa-rectangle-list text-[28px] leading-none ${className}`}></i>
);

// --- Course SVGs ---
export function DiplomaIcon({ className = "w-14 h-14 text-white shrink-0" }) {
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
      <rect x="4" y="8" width="38" height="30" rx="3.5" strokeWidth="2.2" />
      <line x1="4" y1="15" x2="42" y2="15" strokeWidth="2" />
      <circle cx="9" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
      <rect x="16" y="18" width="44" height="38" rx="3.5" strokeWidth="2.4" fill="none" />
      <line x1="16" y1="26" x2="60" y2="26" strokeWidth="2.2" />
      <circle cx="22" cy="22" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="27" cy="22" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="32" cy="22" r="1.4" fill="currentColor" stroke="none" />
      <g transform="translate(38 41)">
        <path
          d="M0 -9.5 L0 -7.5 M0 7.5 L0 9.5 M-9.5 0 L-7.5 0 M7.5 0 L9.5 0 M-6.7 -6.7 L-5.3 -5.3 M5.3 5.3 L6.7 6.7 M-6.7 6.7 L-5.3 5.3 M5.3 -5.3 L6.7 -6.7"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="6.2" strokeWidth="2.4" fill="none" />
        <circle cx="0" cy="0" r="2.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function TypeWritingIcon({ className = "w-14 h-14 text-white shrink-0" }) {
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
      <rect x="6" y="8" width="46" height="34" rx="3.5" strokeWidth="2.3" />
      <rect x="11" y="13" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <rect x="21" y="13" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <rect x="31" y="13" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <rect x="41" y="13" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <rect x="11" y="23" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <rect x="41" y="23" width="6" height="6" rx="1.2" strokeWidth="1.8" />
      <circle cx="28" cy="26" r="3.5" strokeWidth="1.6" strokeDasharray="2 1.5" />
      <circle cx="28" cy="26" r="1.2" fill="currentColor" stroke="none" />
      <path
        d="M26 27 v14 c0 1.2 0.8 2.2 2 2.2 c1.2 0 2-1 2-2.2 v-5 h2 c1.2 0 2 0.8 2 2 v3 c0 1.5-1.2 2.8-2.8 2.8 c-1.5 0-2.5-1-2.5-2.2 v-2"
        strokeWidth="2.3"
      />
      <path
        d="M22 41 c-1.5 1.5-2 3.5-2 5.5 c0 4 3.5 7.5 7.5 7.5 c4.5 0 8.5-3.5 8.5-8 v-5"
        strokeWidth="2.2"
      />
      <circle cx="28" cy="55" r="2.5" strokeWidth="1.8" />
      <circle cx="28" cy="55" r="5" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function CcicIcon({ className = "w-14 h-14 text-white shrink-0" }) {
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
      <path d="M7 24 h7 v24 h-7" strokeWidth="2.2" />
      <circle cx="7" cy="24" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="48" r="2.2" fill="currentColor" stroke="none" />
      <line x1="14" y1="36" x2="19" y2="36" strokeWidth="2" />
      <path d="M57 24 h-7 v24 h7" strokeWidth="2.2" />
      <circle cx="57" cy="24" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="57" cy="48" r="2.2" fill="currentColor" stroke="none" />
      <line x1="50" y1="36" x2="45" y2="36" strokeWidth="2" />
      <g transform="translate(32 40)">
        <path
          d="M0 -11.5 L0 -9 M0 9 L0 11.5 M-11.5 0 L-9 0 M9 0 L11.5 0 M-8.1 -8.1 L-6.4 -6.4 M6.4 6.4 L8.1 8.1 M-8.1 8.1 L-6.4 6.4 M6.4 -6.4 L8.1 -8.1"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="8.2" strokeWidth="2.4" fill="none" />
        <circle cx="0" cy="0" r="4.2" strokeWidth="2" fill="none" />
      </g>
      <path
        d="M26 12 C26 7.5 38 7.5 38 12 C38 15 35 17 34 20 L34 32 L30 32 L30 20 C29 17 26 15 26 12 Z"
        strokeWidth="2.3"
        fill="none"
      />
      <path d="M29 8.5 L35 8.5 L35 12.5 L29 12.5 Z" strokeWidth="1.8" fill="none" />
      <line x1="32" y1="32" x2="32" y2="48" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// --- Courses Data ---
const COURSES_DATA = [
  {
    id: "diploma",
    title: "Diploma",
    subtitle: "3-Year Polytechnic Engineering Programs",
    badge: "Polytechnic / Technical",
    bgColor: "bg-[#2370db]",
    hoverColor: "hover:bg-[#1d63c4]",
    icon: DiplomaIcon,
    bgImage: sbtetDip,
    description:
      "Comprehensive 3-year technical diploma engineering programs designed to build high-level practical engineering expertise across cutting-edge technical disciplines.",
    duration: "3 Years (6 Semesters / Industrial Training)",
    eligibility: "SSC (10th Class) Pass with POLYCET Rank",
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
    bgImage: SbtetType,
    description:
      "State Board recognized Typewriting (English, Telugu, Hindi, Urdu) and Shorthand examinations certifying typing speeds, secretarial accuracy, and government job qualification standards.",
    duration: "Graded Certification (Lower, Higher, High Speed)",
    eligibility: "Matriculation (10th) or equivalent",
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
    hoverColor: "hover:bg-[#2EA893]",
    icon: CcicIcon,
    bgImage: null,
    description:
      "Craft Courses and Certificate Courses in Computers & IT (CCIC) empowering students and professionals with hands-on software development, hardware networking, and modern digital competencies.",
    duration: "3 Months to 1 Year Modular Diplomas",
    eligibility: "Intermediate (10+2) or SSC (10th)",
    programs: [
      "Certificate Course in Computer Applications (CCCA)",
      "Hardware, Networking & Cybersecurity Maintenance",
      "Full-Stack Web Technologies & Python Programming",
      "Financial Accounting with Tally & GST Automation",
      "AutoCAD & 3D Industrial Modeling",
    ],
  },
];

// --- Stats Items matching Images 3 & 4 ---
const STAT_ITEMS = [
  { label: "Migration", count: "2110", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Interim", count: "40869", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Bonafied", count: "12621", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Transcript", count: "4309", suffix: "Transcript Issued", icon: BullhornIcon },
  { label: "Duplicate Memo", count: "6223", suffix: "Memo Issued", icon: BullhornIcon },
  { label: "Duplicate ODC", count: "31", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Transfer", count: "59882", suffix: "Certificate Issued", icon: CertificateIcon },
  { label: "Name Correction", count: "2422", suffix: "Performed", icon: NameCorrectionIcon },
];

function StatCard({ label, count, suffix, icon: Icon }) {
  return (
    <div
      className="group border border-[#bcdffb] bg-white flex flex-col justify-between overflow-hidden text-center cursor-pointer transition-shadow duration-200 hover:shadow-md w-full h-[140px]"
      style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      <div className="relative bg-white px-1 pt-4 pb-3 flex-1 flex flex-col items-center justify-between overflow-hidden">
        <span className="block text-[13px] font-semibold text-[#2fa6f6] tracking-tight whitespace-nowrap mb-1 transition-all duration-300 ease-in-out group-hover:translate-y-4 group-hover:opacity-0">
          {label}
        </span>
        <div className="text-[#2fa6f6] my-auto flex items-center justify-center h-9 transition-all duration-300 ease-in-out group-hover:translate-y-8 group-hover:opacity-0">
          <Icon />
        </div>
        <div className="absolute inset-0 bg-[#2fa6f6] -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out flex items-center justify-center px-1 text-center overflow-hidden z-10 pointer-events-none">
          <span className="text-white font-semibold text-[16px] tracking-tight leading-tight select-none -translate-y-2 group-hover:translate-y-2 transition-transform duration-300 ease-in-out">
            {label}
          </span>
        </div>
      </div>

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
}

function StatsRibbon() {
  return (
    <section className="w-full bg-white py-2" id="stats-ribbon-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3 lg:gap-3.5">
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

// Banner Slides
const BANNER_SLIDES = [
  { src: sbtet1, alt: "SBTET Banner 1" },
  { src: sbtet2, alt: "SBTET Banner 2" },
  { src: sbtet3, alt: "SBTET Banner 3" },
  { src: sbtet4, alt: "SBTET Banner 4" },
];

const EXTENDED_SLIDES = [...BANNER_SLIDES, BANNER_SLIDES[0]];
const SLIDE_INTERVAL_MS = 3000;
const NEW_GIF_URL = "https://tgpolycet.nic.in/images/new.gif";

// Quick Links and External Links Lists
const QUICK_LINKS = [
  { label: "Diploma Results", url: "/student/results", internal: true },
  { label: "POLYCET- Results", url: "https://tgpolycet.nic.in/", internal: false },
  { label: "Polycet", url: "https://polycet.sbtet.telangana.gov.in/", internal: false },
  { label: "College Websites", url: "https://dtets.cgg.gov.in/", internal: false },
  { label: "Exams Portal", url: "https://exams.sbtet.telangana.gov.in/", internal: false },
];

const EXTERNAL_LINKS = [
  { label: "http://www.nitttrc.ac.in/", url: "http://www.nitttrc.ac.in/", internal: false },
  { label: "https://dtets.cgg.gov.in/", url: "https://dtets.cgg.gov.in/", internal: false },
  { label: "http://mhrdnats.gov.in/", url: "http://mhrdnats.gov.in/", internal: false },
  { label: "https://www.aicte-india.org/", url: "https://www.aicte-india.org/", internal: false },
];

function parseNotificationDate(val) {
  if (!val) return null;
  if (typeof val === "number") return new Date(val);
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  const str = String(val).trim();
  if (!str) return null;

  const aspMatch = str.match(/\/Date\((\d+)\)\//);
  if (aspMatch) {
    const d = new Date(parseInt(aspMatch[1], 10));
    return isNaN(d.getTime()) ? null : d;
  }

  const ddmmyyyy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(.*)$/);
  if (ddmmyyyy) {
    const day = parseInt(ddmmyyyy[1], 10);
    const month = parseInt(ddmmyyyy[2], 10) - 1;
    const year = parseInt(ddmmyyyy[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  const d = new Date(str);
  if (!isNaN(d.getTime())) return d;
  return null;
}

function isRecentNotification(itemOrDate, daysThreshold = 7) {
  if (!itemOrDate) return false;
  let candidates = [];
  if (typeof itemOrDate === "object" && !(itemOrDate instanceof Date)) {
    if (itemOrDate.timeStamp) candidates.push(itemOrDate.timeStamp);
    if (itemOrDate.timestamp) candidates.push(itemOrDate.timestamp);
    if (itemOrDate.NotificationDate) candidates.push(itemOrDate.NotificationDate);
    if (itemOrDate.date) candidates.push(itemOrDate.date);
    if (itemOrDate.createdAt) candidates.push(itemOrDate.createdAt);
    if (itemOrDate.created_at) candidates.push(itemOrDate.created_at);
  } else {
    candidates.push(itemOrDate);
  }

  const validTimestamps = candidates
    .map((c) => parseNotificationDate(c))
    .filter((d) => d !== null && !isNaN(d.getTime()))
    .map((d) => d.getTime());

  if (validTimestamps.length === 0) return false;

  const newestTime = Math.max(...validTimestamps);
  const now = Date.now();
  const diffMs = now - newestTime;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= -1 && diffDays <= daysThreshold;
}

export default function HomePage() {
  const [notifications, setNotifications] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_cache_circulars");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 6);
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

  // Link box active tab
  const [activeLinkTab, setActiveLinkTab] = useState("quick"); // 'quick' | 'external'

  // Course Details Modal
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Carousel States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/sbtet/circulars")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a, b) =>
              new Date(b.timeStamp || b.NotificationDate || 0).getTime() -
              new Date(a.timeStamp || a.NotificationDate || 0).getTime()
          );
          try {
            localStorage.setItem("pc_cache_circulars", JSON.stringify(sorted));
          } catch {
            // storage full
          }
          setNotifications(sorted.slice(0, 6));
        }
      })
      .catch(() => {
        if (isMounted && notifications.length === 0) setNotificationsError(true);
      })
      .finally(() => {
        if (isMounted) setLoadingNotifications(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-play timer
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

  // Tab visibility listener
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

  return (
    <div className="space-y-2 sm:space-y-2.5">
      {/* 1. What's New Ticker (Exact match to Image 2) */}
      <WhatsNew />

      {/* 2. Top Hero Section: Split 50% Banner + 50% Notifications (Exact match to Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        {/* Left: Carousel Slider */}
        <div
          className="overflow-hidden relative bg-white h-[220px] sm:h-[300px] md:h-[340px] border border-[#cbd5e1] shadow-2xs flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={goToPrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-9 h-10 sm:h-12 bg-[#4fc3f7] hover:bg-[#29b6f6] text-white text-lg sm:text-xl font-bold flex items-center justify-center cursor-pointer shadow-sm transition-colors"
            aria-label="Previous banner"
          >
            &lsaquo;
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={goToNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-9 h-10 sm:h-12 bg-[#4fc3f7] hover:bg-[#29b6f6] text-white text-lg sm:text-xl font-bold flex items-center justify-center cursor-pointer shadow-sm transition-colors"
            aria-label="Next banner"
          >
            &rsaquo;
          </button>

          {/* Viewport */}
          <div className="relative w-full h-full overflow-hidden">
            <div
              className={`flex w-full h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
                }`}
              style={{
                transform: `translate3d(-${Math.min(currentIndex, BANNER_SLIDES.length) * 100}%, 0, 0)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {EXTENDED_SLIDES.map((slide, index) => (
                <div key={`${slide.src}-${index}`} className="w-full h-full shrink-0 flex items-center justify-center bg-white">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="block w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top Notifications Card (Exact match to Image 3) */}
        <div
          className="bg-white border border-[#cbd5e1] flex flex-col justify-between overflow-hidden h-[280px] sm:h-[320px] md:h-[340px] shadow-2xs select-none"
          style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
        >
          <div className="overflow-y-auto no-scrollbar flex-1">
            {/* Header */}
            <div className="px-4 py-2 border-b border-[#cbd5e1] flex items-center gap-2 bg-white sticky top-0 z-10">
              <img
                src={notificationIcon}
                alt="Notifications"
                className="w-[18px] h-[18px] shrink-0 object-contain"
              />
              <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal m-0 p-0">
                Notifications
              </h2>
            </div>

            {/* List */}
            <div className="px-3 sm:px-4 pt-2 pb-1">
              {loadingNotifications ? (
                <div className="py-8 text-center text-xs text-gov-slate">
                  <div className="inline-block w-6 h-6 border-2 border-[#2196f3] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p>Fetching notifications from server…</p>
                </div>
              ) : notificationsError || notifications.length === 0 ? (
                <div className="py-8 text-center text-xs text-gov-slate">
                  No notifications recorded currently.
                </div>
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
                            className="w-[20px] h-[15px]"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </span>

                        <div className="text-[12.5px] leading-[22px] font-normal tracking-[0.01em]">
                          <span className="text-[#222222] font-normal mr-2 inline-block">
                            {n.NotificationDate
                              ? new Date(n.NotificationDate)
                                .toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                                .replace(/\//g, "-")
                              : n.date || ""}
                          </span>
                          <span className="text-[#2196f3] font-normal">
                            {n.Title || n.title}
                            {isRecentNotification(n) && (
                              <img
                                src={newGif || NEW_GIF_URL}
                                alt="New"
                                className="inline-block h-[12px] w-auto align-middle ml-1.5"
                                onError={(e) => {
                                  if (e.currentTarget.src !== NEW_GIF_URL) {
                                    e.currentTarget.src = NEW_GIF_URL;
                                  } else {
                                    e.currentTarget.style.display = "none";
                                  }
                                }}
                              />
                            )}
                          </span>
                        </div>
                      </a>

                      {idx < notifications.length - 1 && (
                        <div className="mt-2 border-b-[1.2px] border-dotted border-[#cbd5e1]" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* View All Button */}
          <div className="flex justify-end mt-auto border-t border-[#f1f5f9]">
            <Link
              to="/circulars"
              className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-[14px] font-normal px-6 py-1.5 rounded-none transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Stats Section Header Strip (Exact match to Images 3 & 4) */}
      <div className="bg-[#35a5f1] py-2 px-4 mt-2 shadow-2xs">
        <p className="text-center text-white text-[12.5px] font-normal tracking-wide m-0">
          Current academic year student services statistics
        </p>
      </div>

      {/* 4. Stats Ribbon: 8 Cards (Exact match to Images 3 & 4) */}
      <StatsRibbon />

      {/* 5. 3-Box Section: Quick Links | SBTET Facebook | Latest News (Exact Same Dimensions to Image 4) */}
      <section className="w-full my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {/* BOX 1 (LEFT): Quick Links & External Links Tabbed Card */}
          <div
            className="bg-white border border-[#c8d1db] flex flex-col justify-start overflow-hidden h-[280px] sm:h-[320px] md:h-[330px] shadow-2xs"
            style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
          >
            {/* Tabs Header */}
            <div className="flex items-stretch border-b border-[#cbd5e1] bg-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setActiveLinkTab("quick")}
                className={`flex-1 py-2 px-4 text-[13.5px] transition-colors cursor-pointer border-none text-center ${activeLinkTab === "quick"
                  ? "bg-[#2196f3] text-white font-semibold"
                  : "bg-[#e9ecef] text-[#475569] font-medium hover:bg-[#dee2e6]"
                  }`}
              >
                Quick Links
              </button>
              <button
                type="button"
                onClick={() => setActiveLinkTab("external")}
                className={`flex-1 py-2 px-4 text-[13.5px] transition-colors cursor-pointer border-none text-center ${activeLinkTab === "external"
                  ? "bg-[#2196f3] text-white font-semibold"
                  : "bg-[#e9ecef] text-[#475569] font-medium hover:bg-[#dee2e6]"
                  }`}
              >
                External Links
              </button>
            </div>

            {/* Links List Content */}
            <div
              className="p-4 flex-1 overflow-y-auto no-scrollbar"
              style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
            >
              {activeLinkTab === "quick" ? (
                <ul className="list-none m-0 p-0 space-y-3.5">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                      {link.internal ? (
                        <Link
                          to={link.url}
                          className="flex items-center text-[16px] text-[#337ab7] hover:text-[#23527c] no-underline group cursor-pointer"
                        >
                          <i className="fa fa-arrow-circle-right text-[#286090] group-hover:text-[#23527c] text-[18px] shrink-0 leading-none mr-2.5">&nbsp;</i>
                          <span className="group-hover:underline leading-normal">{link.label}</span>
                        </Link>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[16px] text-[#337ab7] hover:text-[#23527c] no-underline group cursor-pointer"
                        >
                          <i className="fa fa-arrow-circle-right text-[#286090] group-hover:text-[#23527c] text-[18px] shrink-0 leading-none mr-2.5">&nbsp;</i>
                          <span className="group-hover:underline leading-normal">{link.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-none m-0 p-0 space-y-3.5">
                  {EXTERNAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[15px] text-[#337ab7] hover:text-[#23527c] no-underline group cursor-pointer"
                      >
                        <i className="fa fa-arrow-circle-right text-[#286090] group-hover:text-[#23527c] text-[18px] shrink-0 leading-none mr-2.5">&nbsp;</i>
                        <span className="group-hover:underline leading-snug">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* BOX 2 (MIDDLE): SBTET Telangana Facebook Social Widget Card */}
          <div
            className="bg-white border border-[#c8d1db] flex flex-col justify-between overflow-hidden h-[280px] sm:h-[320px] md:h-[330px] shadow-2xs"
            style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
          >
            {/* Facebook Header */}
            <div className="p-3 border-b border-[#e2e8f0] flex items-center gap-3 bg-white">
              <img
                src={sbLogo}
                alt="SBTET Emblem"
                className="w-11 h-11 object-contain rounded-full border border-gray-200 p-0.5 shadow-2xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[14.5px] font-bold text-[#1c2b36] tracking-tight leading-tight m-0 truncate">
                  SBTET, Telangana
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <a
                    href="https://www.facebook.com/profile.php?id=100076925755314&ref=embed_page#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-[#e4e6eb] text-[#1877f2] font-semibold text-[11px] px-2 py-0.5 rounded border border-[#ced0d4] no-underline transition-colors"
                  >
                    <i className="fa-brands fa-facebook text-[#1877f2] text-xs"></i>
                    <span>Follow Page</span>
                  </a>
                  <span className="text-[11.5px] text-[#65676b] font-normal">
                    3.2K followers
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Feed Center */}
            <div className="flex-1 bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-center">
              <div className="w-6 h-6 border-2 border-[#cbd5e1] border-t-[#1877f2] rounded-full animate-spin mb-2"></div>
              <p className="text-[11.5px] text-gray-500 font-normal m-0 max-w-[200px]">
                Connecting to SBTET official social stream...
              </p>
            </div>

            {/* Facebook Bottom Banner */}
            <a
              href="https://www.facebook.com/profile.php?id=100076925755314&ref=embed_page#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f0f2f5] hover:bg-[#e4e6eb] border-t border-[#e2e8f0] py-2 px-4 flex items-center justify-between text-[#1c2b36] hover:text-[#1877f2] text-[12.5px] font-medium no-underline transition-colors"
            >
              <span className="flex items-center gap-2">
                <i className="fa-brands fa-facebook text-[#1877f2] text-sm"></i>
                Find us on Facebook
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </a>
          </div>

          {/* BOX 3 (RIGHT): Latest News Card with View All Button */}
          <div
            className="bg-white border border-[#c8d1db] flex flex-col justify-between overflow-hidden h-[280px] sm:h-[320px] md:h-[330px] shadow-2xs"
            style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
          >
            <div className="overflow-y-auto no-scrollbar flex-1">
              {/* Header */}
              <div className="px-4 py-2 border-b border-[#cbd5e1] flex items-center gap-2 bg-white sticky top-0 z-10">
                <img
                  src={notificationIcon}
                  alt="Latest News"
                  className="w-[18px] h-[18px] shrink-0 object-contain"
                />
                <h2 className="text-[15px] font-normal text-[#2196f3] tracking-normal m-0 p-0">
                  Latest News
                </h2>
              </div>

              {/* List */}
              <div className="px-3 sm:px-4 pt-2 pb-1">
                {loadingNotifications ? (
                  <div className="py-8 text-center text-xs text-gov-slate">
                    <div className="inline-block w-6 h-6 border-2 border-[#2196f3] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p>Fetching news from server…</p>
                  </div>
                ) : notificationsError || notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gov-slate">
                    No latest circulars recorded currently.
                  </div>
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
                              className="w-[20px] h-[15px]"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </span>

                          <div className="text-[12.5px] leading-[22px] font-normal tracking-[0.01em]">
                            <span className="text-[#222222] font-normal mr-2 inline-block">
                              {n.NotificationDate
                                ? new Date(n.NotificationDate)
                                  .toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })
                                  .replace(/\//g, "-")
                                : n.date || ""}
                            </span>
                            <span className="text-[#2196f3] font-normal">
                              {n.Title || n.title}
                              {isRecentNotification(n) && (
                                <img
                                  src={newGif || NEW_GIF_URL}
                                  alt="New"
                                  className="inline-block h-[12px] w-auto align-middle ml-1.5"
                                  onError={(e) => {
                                    if (e.currentTarget.src !== NEW_GIF_URL) {
                                      e.currentTarget.src = NEW_GIF_URL;
                                    } else {
                                      e.currentTarget.style.display = "none";
                                    }
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        </a>

                        {idx < notifications.length - 1 && (
                          <div className="mt-2 border-b-[1.2px] border-dotted border-[#cbd5e1]" />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* View All Button */}
            <div className="flex justify-end mt-auto border-t border-[#f1f5f9]">
              <Link
                to="/circulars"
                className="bg-[#2196f3] hover:bg-[#1e88e5] text-white text-[14px] font-normal px-6 py-1.5 rounded-none transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Courses Section */}
      <section id="our-courses-section" className="w-full my-6">
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

        {/* 3 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* CARD 1: Diploma */}
          <div
            id="course-card-diploma"
            onClick={() => setSelectedCourse(COURSES_DATA[0])}
            className="group relative bg-[#2370db] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(35,112,219,0.28)] transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url(${sbtetDip})` }}
            />
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

          {/* CARD 2: Type Writing & Shorthand */}
          <div
            id="course-card-twsh"
            onClick={() => setSelectedCourse(COURSES_DATA[1])}
            className="group relative bg-[#00b4d8] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(0,180,216,0.28)] transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url(${SbtetType})` }}
            />
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

          {/* CARD 3: CCIC */}
          <div
            id="course-card-ccic"
            onClick={() => setSelectedCourse(COURSES_DATA[2])}
            className="group relative bg-[#00c853] hover:bg-[#2EA893] text-white rounded-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_20px_rgba(46,168,147,0.28)] transition-all duration-300 cursor-pointer min-h-[120px] sm:min-h-[140px] md:min-h-[150px] lg:h-[154px] flex items-center px-5 sm:px-7 py-4 sm:py-5 select-none overflow-hidden"
            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
          >
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedCourse.bgColor} p-6 text-white relative`}>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                {selectedCourse.badge}
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{selectedCourse.title}</h3>
              <p className="text-white/90 text-sm mt-1">{selectedCourse.subtitle}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
              <p className="text-gray-700 text-sm leading-relaxed">{selectedCourse.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#2196f3]" />
                    Duration
                  </div>
                  <p className="text-gray-800 text-xs font-medium mt-1">{selectedCourse.duration}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5 text-[#00c853]" />
                    Eligibility
                  </div>
                  <p className="text-gray-800 text-xs font-medium mt-1">{selectedCourse.eligibility}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Specializations &amp; Key Modules
                </h4>
                <ul className="space-y-1.5 list-none p-0 m-0">
                  {selectedCourse.programs.map((prog, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
