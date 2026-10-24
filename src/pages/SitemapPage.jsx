import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SitemapPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Sitemap | State Board of Technical Education and Training Telangana";
  }, []);

  // Exact 31 items in identical sequence matching SBTET Portal
  // In SBTET, active route items (Latest News, Site Map, Time Tables, Role of Govt) render in dark color
  const sitemapItems = [
    { title: "About Right To Information", path: "/rti/about", isDark: false },
    { title: "About SBTET", path: "#", isDark: false },
    { title: "APIO/PIO/AA of CIET", path: "#", isDark: false },
    { title: "College Affiliation", path: "/admin/colleges", isDark: false },
    { title: "College Services", path: "/hod/dashboard", isDark: false },
    { title: "Coming Soon", path: "#", isDark: false },
    { title: "Contact Us", path: "/contact-us", isDark: false },
    { title: "Course", path: "/courses", isDark: false },
    { title: "Disclaimer", path: "#", isDark: false },
    { title: "Downloads", path: "/circulars", isDark: false },
    { title: "Events", path: "#", isDark: false },
    { title: "Examinations", path: "/halltickets", isDark: false },
    { title: "FAQ's", path: "#", isDark: false },
    { title: "Full Details Of Right To Information Act", path: "/rti/full-details", isDark: false },
    { title: "Government Orders", path: "/circulars", isDark: false },
    { title: "Hierarchy", path: "#", isDark: false },
    { title: "Home", path: "/", isDark: false },
    { title: "How to Request For Information", path: "#", isDark: false },
    { title: "Latest News", path: "/circulars", isDark: true },
    { title: "Notifications", path: "/circulars", isDark: false },
    { title: "Obligations of Public Authority", path: "/rti/obligations", isDark: false },
    { title: "Results", path: "/Results/consolidatedResults", isDark: false },
    { title: "RTI", path: "/rti/full-details", isDark: false },
    { title: "RTI Act", path: "#", isDark: false },
    { title: "Sample Page", path: "#", isDark: false },
    { title: "Site Map", path: "/sitemap", isDark: true },
    { title: "Staff", path: "/login", isDark: false },
    { title: "Tenders", path: "/tenders", isDark: false },
    { title: "Time Tables", path: "/circulars", isDark: true },
    { title: "What is the role of Central / State Government", path: "#", isDark: true },
    { title: "WP File download search", path: "/circulars", isDark: false },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-250px)] bg-white sbtet-sitemap-root">
      {/* Explicit Open Sans font definition matching SBTET exactly */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

        .sbtet-sitemap-root {
          font-family: 'Open Sans', Arial, sans-serif !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .sbtet-sitemap-ul {
          margin-left: 20px;
          list-style: none;
          padding: 0;
        }

        .sbtet-sitemap-item {
          line-height: 1.85;
        }

        .sbtet-link-blue {
          font-family: 'Open Sans', Arial, sans-serif !important;
          color: #007bff !important;
          font-size: 15px;
          text-decoration: none;
          cursor: pointer;
        }

        .sbtet-link-blue:hover {
          color: #007bff !important;
          
        }

        .sbtet-link-dark {
          font-family: 'Open Sans', Arial, sans-serif !important;
          color: #212529 !important;
          font-size: 15px;
          text-decoration: none;
          cursor: pointer;
        }

        .sbtet-link-dark:hover {
          color: #000000 !important;
          
        }
      `}</style>

      {/* 1. Header Breadcrumb Bar (100% Full-Width Edge-to-Edge Bar matching SBTET) */}
      <div
        className="w-full bg-[#d8dadc] sm:bg-[#eaedf0] border-b border-[#cbd5e1] h-[34px] sm:h-[36px] flex items-center"
        style={{ boxSizing: "border-box" }}
      >
        <div className="max-w-[1350px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center text-[13px] sm:text-[13.5px]">
          <Link
            to="/"
            className="text-[#212529] font-bold cursor-pointer"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Home
          </Link>
          <span
            className="text-[#4b5563] mx-1.5 font-normal select-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            /
          </span>
          <Link
            to="/sitemap"
            className="text-[#212529] font-bold cursor-pointer"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            More
          </Link>
          <span
            className="text-[#4b5563] mx-1.5 font-normal select-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            /
          </span>
          <span
            className="text-[#6c757d] font-normal select-none"
            style={{ fontFamily: "'Open Sans', Arial, sans-serif" }}
          >
            Sitemap
          </span>
        </div>
      </div>

      {/* 2. Main Content Body - Clean link list with exact Open Sans font & spacing */}
      <div className="max-w-[1350px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-7 pb-20">
        <ul className="sbtet-sitemap-ul">
          {sitemapItems.map((item, index) => {
            const isInternal = item.path !== "#";

            return (
              <li key={index} className="sbtet-sitemap-item">
                {isInternal ? (
                  <Link
                    to={item.path}
                    className={item.isDark ? "sbtet-link-dark" : "sbtet-link-blue"}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={item.isDark ? "sbtet-link-dark" : "sbtet-link-blue"}
                  >
                    {item.title}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
